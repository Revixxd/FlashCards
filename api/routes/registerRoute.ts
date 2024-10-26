import {
    Router,
    Request,
    Response
} from 'express';
import validator from 'validator';
import sanitizeInput from '../utils/sanitizeInput.js';
import connectDb from '../utils/connectDb.js';
import User from '../models/User.js';

const router = Router();

router.post('/', (req:any, res:any) => {
    const sanitizedUsername:string = sanitizeInput(req.body.username);
    const sanitizedPassword:string = sanitizeInput(req.body.password);
    const sanitizedEmail:string = sanitizeInput(req.body.email);
    console.log(sanitizedUsername,sanitizedPassword,sanitizedEmail);
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

    connectDb().then(db => {
        db.collection('users').findOne({ $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }] })
            .then(existingUser => {
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
                // Proceed with user creation if no existing user is found
                const newUser:any = new User({
                    username: sanitizedUsername,
                    password: sanitizedPassword,
                    email: sanitizedEmail
                });
                db.collection('users').insertOne(newUser)
                    .then(() => {
                        res.status(200).json({
                            message: 'User registered successfully'
                        });
                    })
                    .catch(() => {
                        res.status(500).json({
                            message: 'An error occurred'
                        });
                    });
            })
            .catch(() => {
                res.status(500).json({
                    message: 'An error occurred'
                });
            });
    });
});


export default router;