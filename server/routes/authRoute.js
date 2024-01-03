import express from "express";
import cors from 'cors';
const router = express.Router();
import {getProfile, test} from "../../server/controllers/authController.js";

import { registerUser, loginUser } from "../../server/controllers/authController.js";

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test);
router.post('/register', registerUser)
router.post('/login', loginUser )
router.get('/profile', getProfile)


export default router;
