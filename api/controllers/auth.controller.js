import { error } from "console";
import User from "../models/user.model.js"; //所有都不能漏了.js
import bcryptjs from "bcryptjs"; //这个过程是单向的，意味着无法从散列值逆向推导出原始密码

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
