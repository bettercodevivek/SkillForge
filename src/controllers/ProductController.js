const Product = require('../models/Product');


// Handler function for creating new products 

const CreateProduct = async(req,res) => {
    try{
       const {name,description,price,category} = req.body;

       if(!name || !description || !price || !category){
        return res.status(400).json({error:"Fill all the necessary details !"})
       }

       const imagePath = req.file ? req.file.path : null;

       const product = new Product({
        name,
        description,
        category,
        price,
        image:imagePath,
        createdBy:req.user.userId
       });

       await product.save();

       res.status(200).json({message:"Product created successfully !",product});


    }
    catch(err){
        res.status(500).json({error:"Internal Server Error (in creating product)"})
    }
}


const GetAllProducts = async(req,res) => {
    try{
       const products = await Product.find();
       res.status(200).json({
        message:"All products fetched successfully !",
        products
       })
    }
    catch(err){
       res.status(500).json({error:"Internal Server Error !"});
    }
}


const UpdateProduct = async(req,res) => {
    try{

        const Prod_id = req.params.id;

       const {name,description,price,category} = req.body;
       
       const UpdatedProduct = await Product.findByIdAndUpdate(Prod_id,{
        name,
        description,
        category,
        price
       },{new:true});

       res.status(200).json({
        message:"Product Updated Successfully !",
        product:UpdatedProduct
       })

    }
    catch(err){
       res.status(500).json({error:"Internal Server Error !"})
    }
}


const DeleteProduct = async(req,res) => {
    try{
       const Prod_id = req.params.id;

       const DeletedProduct = await Product.findByIdAndDelete(Prod_id);

       if(!DeletedProduct){
        return res.status(404).json({error:"Product Not Found !"})
       }

       res.status(200).json({
        message:"Product deleted successfully !",
        product:DeleteProduct
       })
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error !"})
    }
}

module.exports = {CreateProduct,GetAllProducts,UpdateProduct,DeleteProduct};