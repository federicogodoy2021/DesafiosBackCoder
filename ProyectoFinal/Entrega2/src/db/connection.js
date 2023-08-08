import mongoose from "mongoose";
//String Atlas
//'mongodb+srv://fede:fedepass@cluster0.n7fxanf.mongodb.net/CoderBE?retryWrites=true&w=majority'
//String Compass
//mongodb+srv://fede:fedepass@cluster0.n7fxanf.mongodb.net/
//String local
//mongodb://localhost:27017/

const connectionString = 'mongodb+srv://fede:fedepass@cluster0.n7fxanf.mongodb.net/CoderBE?retryWrites=true&w=majority';

    try {
        await mongoose.connect(connectionString)
        console.log('Conectado a MongoDB!');
    } catch (error) {
        console.log(error);
    }

