// userroutes like login, register, logout, and admin login
import express from 'express';

import { loginUser, registerUser, adminLogin } from '../Controller/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/login', loginUser);
UserRouter.post('/register', registerUser);
UserRouter.post('/admin', adminLogin);

export default UserRouter;
