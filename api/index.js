import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB!');
}).catch((err)=>{
    console.log(err);
}
);


const app=express();

app.listen(3000,()=>{
    console.log('port 3000!!');
}
);

app.get('/test',(req,res)=>{
    res.json({
        message:'Hello World!',
    });
});

app.use(express.json()); //允许json作为input发给server，就可以用insomnia api进行测试

app.use("/api/user",userRouter);
app.use('/api/auth',authRouter);
 
//错误处理中间件middleware，用于Express应用程序，四个参数是固定的
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message =err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});

