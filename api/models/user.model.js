import mongoose from 'mongoose';
//dMongoose库的用户模型，用于MongoDB数据库中
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
    },
    avatar:{
        type:String,
        default:"https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    }
},
{timestamps:true});

const User=mongoose.model('User',userSchema);//Mongoose会自动为每个用户记录添加createdAt和updatedAt时间戳，分别表示记录的创建时间和最后更新时间

export default User;