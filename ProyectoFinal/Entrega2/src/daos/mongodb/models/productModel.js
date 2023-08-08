import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, index: true, required: true },
    description: { type: String },
    code: { type: String, unique: true},
    price: { type: Number, required: true },
    status: { type: Boolean, required: false },
    stock: { type: Number, required: true },
    category: { type: String },
    thumbnails: [
        { type: String },
        { type: String }
    ]        
});

//ProductSchema.pre('find', function(){
//    this.populate('products')
//})

export const ProductModel = mongoose.model('productosapples', ProductSchema);