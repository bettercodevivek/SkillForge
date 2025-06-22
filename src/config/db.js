require('dotenv').config();

const mongoose = require('mongoose');

const ConnectDB = async() => {
    try{
      await mongoose.connect(process.env.MONGOOSE_URL);
      console.log('Connection with DB established successfully !')
    }
    catch(err){
       console.log('Error occurred while connecting to DB : ',err.message);
       process.exit(1);
    }
}

module.exports = ConnectDB;