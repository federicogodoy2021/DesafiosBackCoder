import mongoose from "mongoose";

const CartsSchema = new mongoose.Schema({
  buyer: {
    type: String,
    required: true,
    index: true,
  },
  products: [ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'productosapples',
        default:[]
    }
    //,
    //{
    //quantity: { type: Number}
    //}
  ]
});

export const CartModel = mongoose.model("carts", CartsSchema);
