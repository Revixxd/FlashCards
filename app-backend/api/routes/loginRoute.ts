import express from 'express';
import connectDb from '../utils/connectDb.js';
import sanitizeInput from '../utils/sanitizeInput.js';
import { checkPassword } from '../controllers/auth.js';
import User from '../models/User.js';
import { createAccessToken, createRefreshToken } from '../controllers/jwt.js';

const router = express.Router();

// Login route
router.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    const sanitizedUsernameOrEmail: string = sanitizeInput(req.body.usernameOrEmail);
    const sanitizedPassword: string = sanitizeInput(req.body.password);
    await connectDb();

    if (!sanitizedUsernameOrEmail || !sanitizedPassword) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try {
        const user = await User.findOne({
            $or: [
                { username: sanitizedUsernameOrEmail },
                { email: sanitizedUsernameOrEmail }
            ]
        }).exec();

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordCorrect = await checkPassword(sanitizedPassword, user.password);
        if (isPasswordCorrect) {
            const accessToken: string = await createAccessToken({ user: user.id });
            const refreshToken: string = await createRefreshToken({ user: user.id });

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.header('Authorization', `Bearer ${accessToken}`);

            res.status(200).json({ message: 'You logged in' });
            return;
        } else {
            res.status(401).json({ message: 'Password is incorrect' });
            return;
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

export default router;