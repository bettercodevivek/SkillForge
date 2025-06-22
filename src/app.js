const express = require('express');

const cookieParser = require('cookie-parser');

const rateLimit = require('express-rate-limit');

const cors = require('cors');

const helmet = require('helmet');

const morgan = require('morgan');


const app = express();

// Middlewares

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

app.use(cors({origin:'http://localhost:3000',credentials:true}));

app.use(helmet());

app.use(morgan("dev"));


const limiter = rateLimit({
    windowMS:5*60*1000,
    max:100
});

app.use(limiter);

app.get('/',(req,res)=>{
res.status(200).send("SkillForge Backend is live !");
})

module.exports = app;