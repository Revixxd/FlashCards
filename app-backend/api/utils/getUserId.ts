import connectDb from "./connectDb.js";
import sanitizeInput from "./sanitizeInput.js";
import { convertJwtToken } from "../controllers/jwt.js";
import mongoose from "mongoose";
import express from "express";

const getUserId = async (req: express.Request, res: express.Response): Promise<void | string> => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 0) {
        await connectDb();
    }
    const jwtToken = sanitizeInput(req.body.token);
    if (!jwtToken) {
         res.status(400).json({ message: "jwt token required" });
         return
    }
    const userToken = await convertJwtToken(jwtToken);

    const dbUser = (userToken as any).payload.user;
    if (!dbUser) {
         res.status(400).json({ message: "user id not found in token" });
         return;
    }
    return dbUser;
}
export default getUserId;