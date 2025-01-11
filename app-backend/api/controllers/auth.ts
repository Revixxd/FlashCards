import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sanitizeInput from '../utils/sanitizeInput.js';
import { convertAccessToken, convertRefreshToken, createAccessToken } from './jwt.js';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import connectDb from '../utils/connectDb.js';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
};

export const authorizeUser = async (req: Request, res: Response): Promise<string | void> => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 0) {
        await connectDb();
    }
    let userId: any;
    let accessToken = (req.headers.authorization?.split(" ")[1]);
    const refreshToken = sanitizeInput(req.cookies?.refreshToken);
    try {
        if (accessToken) {

            userId = await convertAccessToken(accessToken)
            const newAccessToken = await createAccessToken({ userId: userId });
            res.header("Authorization", `Bearer ${newAccessToken}`);
            return userId.payload.userId;
        }
        else if (!accessToken && refreshToken) {
            userId = await convertRefreshToken(refreshToken);
            const newAccessToken = await createAccessToken({ userId: userId });
            res.header("Authorization", `Bearer ${newAccessToken}`);
            return userId.payload.userId;

        }
        else {
            res.status(401).json({ message: "Invalid access token" });
            return;
        }

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            try {
                userId = await convertRefreshToken(refreshToken);
                const newAccessToken = await createAccessToken({ userId });
                res.header("Authorization", `Bearer ${newAccessToken}`);
                return userId.payload.userId;
            } catch (refreshError) {
                res.status(401).json({ message: "Invalid refresh token" });
                return userId.payload.userId;
            }
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid access token" });
            return;
        }
        else {
            console.error("Error authorizing user:", error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }

    }
}