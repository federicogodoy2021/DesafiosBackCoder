import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use('/users', userRouter);
//app.use('/pets', petsRouter);

app.listen(8080, ()=>{
    console.log('Server ok on port 8080');
})