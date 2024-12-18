import express, { Request, Response } from "express";
import mongoose from "mongoose";
import connectDb from "../utils/connectDb.js";
import sanitizeInput from "../utils/sanitizeInput.js";
import Flashcard from "../models/Flashcard.js";
import { convertJwtToken } from "../controllers/jwt.js";

interface IFlashcard {
    front: string;
    back: string;
}

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
    const userId = await verifyJwtTokenAndConnectDb(req, res);
    try {
        const flashcards = await Flashcard.find({ userId: userId },"flashcardName").exec();
        res.status(200).json(flashcards);
    } catch (error) {
        console.log(error, "error sending flashcards"); 
        res.status(500).json({ message: "Error retrieving flashcards", error });
    }
});
router.post('/createFlashcardSet', async (req: any, res: any) => {
    const userId = await verifyJwtTokenAndConnectDb(req, res);
    const flashcardName = sanitizeInput(req.body.flashcardName);
    if (!flashcardName) {
        return res.status(400).json({ message: "flashcardName required" });
    }
    try {
        const flashcard = new Flashcard({ flashcardName, userId, flashcards: [] });
        await flashcard.save();
        res.status(200).json({ message: "flashcard created" });
    } catch (error) {
        console.log(error, "error creating flashcard");
        res.status(500).json({ message: "Error creating flashcard", error });
    }
})
router.post('/deleteFlashcardSet', async (req: any, res: any) => {
    const userId = await verifyJwtTokenAndConnectDb(req, res);
    const flashcardName = sanitizeInput(req.body.flashcardName);
    if (!flashcardName) {
        return res.status(400).json({ message: "flashcardName required" });
    }
    try {
        await Flashcard.deleteOne({ flashcardName, userId });
        res.status(200).json({ message: "flashcard deleted" });
    } catch (error) {
        console.log(error, "error deleting flashcard");
        res.status(500).json({ message: "Error deleting flashcard", error });
    }
})
router.post('/addFlashcard', async (req: any, res: any) => {
    const userId = await verifyJwtTokenAndConnectDb(req, res);
    const flashcardName = sanitizeInput(req.body.flashcardName);
    const front = sanitizeInput(req.body.front);
    const back = sanitizeInput(req.body.back);
    if (!flashcardName || !front || !back) {
        return res.status(400).json({ message: "flashcardName, front, and back required" });
    }
    try {
        const flashcard = await Flashcard.findOne({ flashcardName, userId });
        if (!flashcard) {
            return res.status(400).json({ message: "flashcard not found" });
        }
        flashcard.flashcards.push({ front, back });
        await flashcard.save();
        res.status(200).json({ message: "flashcard added" });
    } catch (error) {
        console.log(error, "error adding flashcard");
        res.status(500).json({ message: "Error adding flashcard", error });
    }
})
router.post('/updateFlashcards', async (req: any, res: any) => {
    try{

        const userId = await verifyJwtTokenAndConnectDb(req, res);
        console.log(userId)
        const flashcardName = sanitizeInput(req.body.flashcardName);
        const flashcards = req.body.flashcards; 
        console.log("test");
        const sanitizedFlashcards = flashcards.map((flashcard: IFlashcard) => ({
            front: sanitizeInput(flashcards.front),
            back: sanitizeInput(flashcards.back),
        }));
        if (!flashcardName || !flashcards || !Array.isArray(flashcards)) {
            return res.status(400).json({ message: "flashcardName and flashcards array required" });
        }
    


        const flashcard = await Flashcard.findOne({ flashcardName, userId });
        if (!flashcard) {
            return res.status(400).json({ message: "flashcard not found" });
        }

        flashcard.set('flashcards', sanitizedFlashcards as IFlashcard[]);
        await flashcard.save();
        res.status(200).json({ message: "flashcards updated" });
    }
 
 catch (error) {
        console.log(error, "error updating flashcards");
        res.status(500).json({ message: "Error updating flashcards", error });
    }
});
export default router;