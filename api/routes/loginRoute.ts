import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import connectDb from '../utils/connectDb.js';
import sanitizeInput from '../utils/sanitizeInput.js';
import User from '../models/User.js'; 

const router = express.Router();


// Login route
router.post('/', async (req: any, res: any) => {
    const sanitizedUsernameOrEmail: string = sanitizeInput(req.body.usernameOrEmail);
    const sanitizedPassword: string = sanitizeInput(req.body.password);
    await connectDb()
    const user = await User.findOne({ sanitizedUsernameOrEmail }).exec();



    if (!sanitizedUsernameOrEmail || !sanitizedPassword) {
        return res.status(400).json({ message: 'Email and password is required' });
    }

    try {

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Email is correct' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;