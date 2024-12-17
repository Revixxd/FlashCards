import express, { Request, Response } from "express";
import mongoose from "mongoose";
import connectDb from "../utils/connectDb.js";
import sanitizeInput from "../utils/sanitizeInput.js";
import Flashcard from "../models/Flashcard.js";
import { convertJwtToken } from "../controllers/jwt.js";

const router = express.Router();
const verifyJwtTokenAndConnectDb = async (req:any, res:any) => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 0) {
        await connectDb();
    }
    const jwtToken = sanitizeInput(req.body.token);
    if (!jwtToken) {
        return res.status(400).json({ message: "jwt token required" });
    }
    const userToken = await convertJwtToken(jwtToken);

    const userId = (userToken as any).payload.user;
    if (!userId) {
        return res.status(400).json({ message: "user id not found in token" });
    }
    return userId;
}

router.post("/showFlashcardList", async (req: any, res: any) => {
    const userId = verifyJwtTokenAndConnectDb(req, res);
    try {
        const flashcards = await Flashcard.find({ userId: userId },"flashcardName").exec();
        res.status(200).json(flashcards);
    } catch (error) {
        console.log(error, "error sending flashcards"); 
        res.status(500).json({ message: "Error retrieving flashcards", error });
    }
});
export default router;