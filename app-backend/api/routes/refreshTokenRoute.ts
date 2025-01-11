import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { createAccessToken } from '../controllers/jwt.js';
import sanitizeInput from '../utils/sanitizeInput.js';
import connectDb from '../utils/connectDb.js';

dotenv.config();
const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response):Promise<void> => {
    await connectDb();
    const { JWT_PRIVATE_KEY, JWT_REFRESH_KEY } = process.env;
    if (!JWT_PRIVATE_KEY || !JWT_REFRESH_KEY) {
        res.status(500).json({ message: "JWT keys are not defined in environment variables" });
        return;
    }

    const refreshToken = sanitizeInput(req.body.refreshToken);
    if (!refreshToken) {
        res.status(400).json({ message: "Refresh token is required" });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_KEY) as any;
        const user = await User.findById(decoded.userId).exec();
        if (!user || user.refreshToken !== refreshToken) {
            res.status(403).json({ message: "Invalid refresh token" });
            return;
        }

        const newAccessToken = await createAccessToken({ userId: user._id });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(403).json({ message: "Invalid refresh token" });
    }
});

export default router;