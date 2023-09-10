import mongoose from "mongoose";

//Esquema de carritos
const CartsSchema = new mongoose.Schema({
  buyer: {
    type: String,
    required: true,
    index: true,
  },
  ageBuyer: {type: Number },
  genderBuyer: {type: String},
  date: {type: String },
  city: { type: String },
  promotionCode: { type: String },
  products: [ 
    {
        type: mongoose.Schema.Types.ObjectId,
        quantity: {type: Number},
        ref:'productosapples',
        default:[]        
    }
  ]
});

export const CartModel = mongoose.model("carts", CartsSchema);
