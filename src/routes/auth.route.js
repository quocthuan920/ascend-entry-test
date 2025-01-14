import express from 'express';
import AuthenticationController from '../controllers/auth.controller.js';
import {validateLoginData, validateRegisterData} from '../middlewares/validateUser.js';


const router = express.Router();

router.post('/register', validateRegisterData, AuthenticationController.register);

router.post('/login', validateLoginData, AuthenticationController.login);


export default router;