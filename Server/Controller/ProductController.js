//manage products
import {v2 as cloudinary} from 'cloudinary';
import ProductModel from "../models/productModel.js";
import { success } from 'zod';

const addProduct = async (req, res) => {

  try {
    const { name, description, price , category,subCategory,sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files['image1'][0];
    const image2 = req.files.image2 && req.files['image2'][0];
    const image3 = req.files.image3 && req.files['image3'][0];
    const image4 = req.files.image4 && req.files['image4'][0];


    const images =[image1, image2, image3, image4].filter((item) => item !== undefined);


    const imageUrls = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image'
        });
        return result.secure_url;
      })
    );
    console.log("req.files:", req.files);
console.log("req.body:", req.body);



    const productData ={
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        bestseller:bestseller==="true"? true : false,
        images: imageUrls,
        date:Date.now()
    }
   

    

    const newProduct = new ProductModel(productData);
    await newProduct.save();

console.log('Product Data:', productData);
    res.json({
        success: true,
        message: 'Product added successfully',
    })


  } catch (error) {
    console.log('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', success: false });
  }



}



const listProducts = async (req,res)=>{

    try{
        const products = await ProductModel.find({});
        res.json({
            success: true,
            message: 'Products listed successfully',
            products
        });


    }
    catch(error){
        console.log('Error listing products:', error);
        res.status(500).json({ message: 'Error listing products', success: false });
    }

}

const removeProduct = async (req, res) => {
    try {

        const product = await ProductModel.findByIdAndDelete(req.body.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({
            success: true,
            message: 'Product removed successfully',
        });

    } catch (error) {
        console.log('Error removing product:', error);
        res.status(500).json({ message: 'Error removing product', success: false });
    }


}


const Singleproduct = async(req,res)=>{

    try{
        const {productId} = req.body;
        const singleProduct = await ProductModel.findById(productId);
       if (!singleProduct) {
           return res.status(404).json({ success: false, message: 'Product not found' });
       }
       res.json({
           success: true,
           message: 'Product retrieved successfully',
           product: singleProduct
       });
    }
    catch(error){
        console.log('Error retrieving product:', error);
        res.status(500).json({ message: 'Error retrieving product', success: false });
    }

}

export { addProduct, listProducts, removeProduct, Singleproduct };