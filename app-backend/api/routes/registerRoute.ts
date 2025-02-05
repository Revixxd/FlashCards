import express from 'express';
import sanitizeInput from '../utils/sanitizeInput.js';
import connectDb from '../utils/connectDb.js';
import User from '../models/User.js';
import { hashPassword } from '../controllers/auth.js';
import { createAccessToken, createRefreshToken } from '../controllers/jwt.js';
import validateRegitraion from '../utils/validateRegistration.js';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    const recievedUser: { username: string, password: string, repeatPassword: string, email: string } = {
        username: sanitizeInput(req.body.username),
        password: sanitizeInput(req.body.password),
        repeatPassword: sanitizeInput(req.body.repeatPassword),
        email: sanitizeInput(req.body.email)
    }
    await connectDb();

    const isRegistrationValid = validateRegitraion(recievedUser, res);
    if (!isRegistrationValid) return;
    try {
        const existingUser = await User.findOne({
            $or: [{ username: recievedUser.username }, { email: recievedUser.email }]
        }).exec();

        if (existingUser) {
            if (existingUser.username === recievedUser.username) {
                res.status(400).json({
                    message: 'Username already exists'
                });
                return;
            } else if (existingUser.email === recievedUser.email) {
                res.status(400).json({
                    message: 'Email already exists'
                });
                return;
            }
        }

        const hashedPassword = await hashPassword(recievedUser.password);
        const newUser = new User({
            username: recievedUser.username,
            password: hashedPassword,
            email: recievedUser.email
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
        res.status(201).json({ message: 'User registered' });
        return;
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

export default router;