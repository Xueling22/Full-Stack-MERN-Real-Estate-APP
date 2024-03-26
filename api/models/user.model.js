import mongoose from 'mongoose';
//Mongoose库的用户模型，用于MongoDB数据库中
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
},
{timestamps:true});

const User=mongoose.model('User',userSchema);//Mongoose会自动为每个用户记录添加createdAt和updatedAt时间戳，分别表示记录的创建时间和最后更新时间

export default User;