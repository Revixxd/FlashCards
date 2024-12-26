import express from 'express';
import connectDb from '../utils/connectDb.js';
import sanitizeInput from '../utils/sanitizeInput.js';
import { checkPassword } from '../controllers/auth.js';
import User from '../models/User.js';
import { createJwtToken, createRefreshToken } from '../controllers/jwt.js';

const router = express.Router();

// Login route
router.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    const sanitizedUsernameOrEmail: string = sanitizeInput(req.body.usernameOrEmail);
    const sanitizedPassword: string = sanitizeInput(req.body.password);
    await connectDb();

    if (!sanitizedUsernameOrEmail || !sanitizedPassword) {
        res.status(400).json({ message: 'Email and password are required' });
        return
    }

    try {
        let user = await User.findOne({ username: sanitizedUsernameOrEmail }).exec();
        if (!user) {
            user = await User.findOne({ email: sanitizedUsernameOrEmail }).exec();
        }

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordCorrect = await checkPassword(sanitizedPassword, user.password);
        if (isPasswordCorrect) {
            const accessToken: string = await createJwtToken({ user: user.id });
            const refreshToken: string = await createRefreshToken({ user: user.id });

            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).json({ message: 'You logged in', accessToken: accessToken, refreshToken: refreshToken });
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