import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { authorizeUser } from '../controllers/auth.js';

dotenv.config();
const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        await authorizeUser(req, res);
        res.status(200).json({ message: 'Token refreshed' });
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
});

export default router;