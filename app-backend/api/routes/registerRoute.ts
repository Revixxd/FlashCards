import {
    Router,
    Request,
    Response
} from 'express';
import validator from 'validator';
import sanitizeInput from '../utils/sanitizeInput.js';
import connectDb from '../utils/connectDb.js';
import User from '../models/User.js';
import { hashPassword } from '../controllers/auth.js';
import { createJwtToken } from '../controllers/jwt.js';

const router = Router();

router.post('/', async (req:any, res:any) => {
    const sanitizedUsername:string = sanitizeInput(req.body.username);
    const sanitizedPassword:string = sanitizeInput(req.body.password);
    const sanitizedEmail:string = sanitizeInput(req.body.email);
    if(!validator.isEmail(sanitizedEmail)){
        return res.status(400).json({
            message: 'Email is not valid'
        });
    }
    if (!sanitizedUsername || !sanitizedPassword || !sanitizedEmail) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }
    const hashedPassword = await hashPassword(sanitizedPassword);
    await connectDb();
    try {
        const existingUser = await User.findOne({
            $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }]
        }).exec();

        if (existingUser) {
            if (existingUser.username === sanitizedUsername) {
                return res.status(400).json({
                    message: 'Username already exists'
                });
            } else if (existingUser.email === sanitizedEmail) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }
        }

        const newUser = new User({
            username: sanitizedUsername,
            password: hashedPassword,
            email: sanitizedEmail
        });

        await newUser.save();
        const token:string = await createJwtToken({user: sanitizedUsername});
        res.status(201).json({ message: 'User registered successfully', jwttoken: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
});


export default router;