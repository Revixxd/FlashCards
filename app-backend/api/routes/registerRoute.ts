import express from 'express';
import validator from 'validator';
import sanitizeInput from '../utils/sanitizeInput.js';
import connectDb from '../utils/connectDb.js';
import User from '../models/User.js';
import { hashPassword } from '../controllers/auth.js';
import { createAccessToken, createRefreshToken } from '../controllers/jwt.js';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    const sanitizedUsername: string = sanitizeInput(req.body.username);
    const sanitizedPassword: string = sanitizeInput(req.body.password);
    const sanitizedEmail: string = sanitizeInput(req.body.email);
    await connectDb();

    if (!sanitizedUsername || !sanitizedPassword || !sanitizedEmail) {
        res.status(400).json({ message: 'Username, password, and email are required' });
        return;
    }

    if (!validator.isEmail(sanitizedEmail)) {
        res.status(400).json({
            message: 'Email is not valid'
        });
        return;
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }]
        }).exec();

        if (existingUser) {
            if (existingUser.username === sanitizedUsername) {
                res.status(400).json({
                    message: 'Username already exists'
                });
                return;
            } else if (existingUser.email === sanitizedEmail) {
                res.status(400).json({
                    message: 'Email already exists'
                });
                return;
            }
        }

        const hashedPassword = await hashPassword(sanitizedPassword);
        const newUser = new User({
            username: sanitizedUsername,
            password: hashedPassword,
            email: sanitizedEmail
        });

        const savedUser = await newUser.save();

        const accessToken: string = await createAccessToken({ userId: savedUser.id });
        const refreshToken: string = await createRefreshToken({ userId: savedUser.id });

        savedUser.refreshToken = refreshToken;
        await savedUser.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.header('Authorization', `Bearer ${accessToken}`);
        res.status(201).json({ message: 'User registered'});
        return;
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

export default router;