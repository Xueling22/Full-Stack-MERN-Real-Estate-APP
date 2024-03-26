import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router=express.Router(); //express 提供的一个中间件，创建一个路由，express 通过提供简洁的API，express 是 Node.js 的一个快速、无阻塞、极简的 web 开发框架

router.post("/signup",signup);
router.post("/signin",signin);

export default router;