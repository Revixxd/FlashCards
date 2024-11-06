import express from 'express';
import connectDb from '../utils/connectDb.js';
import sanitizeInput from '../utils/sanitizeInput.js';
import { checkPassword } from '../utils/auth.js';
import User from '../models/User.js'; 

const router = express.Router();


// Login route
router.post('/', async (req: any, res: any) => {
    const sanitizedUsernameOrEmail: string = sanitizeInput(req.body.usernameOrEmail);
    const sanitizedPassword: string = sanitizeInput(req.body.password);
    await connectDb()

    if (!sanitizedUsernameOrEmail || !sanitizedPassword) {
        return res.status(400).json({ message: 'Email and password is required' });
    }
    let user = await User.findOne({ username: sanitizedUsernameOrEmail }).exec();
    if(user === null){
        user = await User.findOne({ email: sanitizedUsernameOrEmail }).exec();
    }
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordCorrect = await checkPassword(sanitizedPassword, user.password);
        if(isPasswordCorrect){
            return res.status(200).json({ message: 'You logged in' });
        }
        else{
            return res.status(401).json({ message: 'Password is incorrect' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;