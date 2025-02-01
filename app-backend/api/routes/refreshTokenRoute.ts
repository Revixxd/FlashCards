import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { authorizeUser } from '../controllers/auth.js';

dotenv.config();
const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Token refreshed' });
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
});

export default router;