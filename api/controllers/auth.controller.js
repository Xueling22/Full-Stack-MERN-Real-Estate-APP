import { error } from "console";
import User from "../models/user.model.js"; //所有都不能漏了.js
import bcryptjs from "bcryptjs"; //这个过程是单向的，意味着无法从散列值逆向推导出原始密码
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { userInfo } from "os";
import dotenv from 'dotenv'; //这个没有引不来env，无语

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); //salt盐值的轮数，也就是散列过程的复杂度。轮数越高，生成散列值的时间越长，破解的难度也越大。10通常被认为是一个合理的值，既能保证安全性，又不会过分消耗计算资源
  const newUser = new User({ username, email, password: hashedPassword }); //在数据库中加密了，看不到实际的密码
  try {
    await newUser.save(); //没保存成功，意味着比如email有重复之类的，没遵守规则
    res.status(201).json("User created succesfully!");
  } catch (error) {
    next(error);
  }
  //保存到数据库需要时间，所以异步，存到mongodb数据库里了
};

export const signin= async (req, res,next) => {
    const { email, password } = req.body;
    try {
      const validUser=await User.findOne({email:email}); //因为名一样也可以写({email})
      if(!validUser) return next(errorHandler(404,'User not found'));
      const validPassword=bcryptjs.compareSync(password,validUser.password); //比较两个密码。第一个参数是用户输入的密码（未加密），第二个参数是存储在数据库中的密码（已加密）。
      if(!validPassword) return next(errorHandler(401,'Wrong credential!'));
      const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
      const {password:hashedPassword,...rest}=validUser._doc;//._doc;代表包含数据库文档的纯数据，避免处理查询结果对象中的方法和其他非数据属性
// 从validUser对象中提取password属性，并将其值赋给新的变量hashedPassword。这意味着，如果validUser对象中有一个属性叫password，它的值现在会被存储在hashedPassword变量中，而不是一个同名的password变量中。
// ...rest是使用了剩余参数（rest parameter）语法，它将validUser对象中除了password之外的所有属性收集到一个新的对象rest中。这样，rest对象包含了validUser的所有属性和值，除了password。
      jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
// 这一行使用jsonwebtoken库的sign方法来生成一个新的JWT。
// 第一个参数是一个包含要编码在JWT中的数据的对象。在这个例子中，它包含了一个用户的唯一标识符id，这通常用于以后识别和验证用户。
// 第二个参数是用于签名和验证JWT的密钥。这个密钥应该是一个只有服务器知道的秘密字符串，存储在环境变量JWT_SECRET中。这增加了安全性，因为即使JWT被拦截，没有密钥也无法伪造有效的JWT。
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest); //只返回除了加密密码之外的 
      //cookie里面包含的jwt，是可以识别用户唯一id的办法，就能确定是谁了，因为web识别不了请求来自于谁，cookie可以帮忙然后保存之前的状态，加载更丝滑
// 这一行使用Express的响应对象res的cookie方法来设置一个名为access_token的cookie。
// 第一个参数是cookie的名称。
// 第二个参数是之前生成的JWT。
// 第三个参数是一个选项对象，这里设置httpOnly: true使得这个cookie只能通过HTTP请求被访问，而不能通过客户端脚本访问。这是一个重要的安全措施，可以帮助减少跨站脚本攻击（XSS）的风险
    } catch (error) {
      next(error);
    }
  };

  export const google=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest} =user._doc;
            res
                .cookie('access_token',token,{httpOnly:true})
                .status(200)
                .json(rest);
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8); //16位
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
            const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo});
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest} =newUser._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
    }catch(error){
        next(error)
    }
  }