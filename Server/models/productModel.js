//product schema
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,   
        required: true
    },
    sizes:{
        type: Array,
        required: true
    },
    bestSeller: {
        type: Boolean,  
        default: false
    },  

    stock: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }, 
    


})

const ProductModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default ProductModel;
