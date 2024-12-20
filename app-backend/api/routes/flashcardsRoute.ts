import express from "express";
import type { Request, Response } from "express";
import sanitizeInput from "../utils/sanitizeInput.js";
import getUserId from "../utils/getUserId.js";
import Flashcard from "../models/Flashcard.js";

const router = express.Router();

router.post("/showFlashcardList", async (req: Request, res: Response): Promise<void> => {
    const userId = await getUserId(req, res);
    try {
        const flashcards = await Flashcard.find({ userId }, "flashcardName").exec();
        res.status(200).json(flashcards);
    } catch (error) {
        console.error(error, "error sending flashcards");
        res.status(500).json({ message: "Error retrieving flashcards", error });
    }
});

router.post("/showUsersFlashcards", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserId(req, res);
        if (!userId) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const flashcards = await Flashcard.find({ userId }).exec();
        if (!flashcards || flashcards.length === 0) {
            res.status(404).json({ message: "No flashcards found" });
            return;
        }

        res.status(200).json(flashcards);
    } catch (error) {

        console.error("Error retrieving flashcards:", error);
        res.status(500).json({ message: "Error retrieving flashcards", error });
    }
});

router.post('/createFlashcardSet', async (req: Request, res: Response): Promise<void> => {
    const userId = await getUserId(req, res);
    const flashcardName = sanitizeInput(req.body.flashcardName);
    if (!flashcardName) {
        res.status(400).json({ message: "flashcardName required" });
        return;
    }
    try {
        const flashcard = new Flashcard({ flashcardName, userId, flashcards: [] });
        await flashcard.save();
        res.status(200).json({ message: "flashcard created" });
    } catch (error) {
        console.error(error, "error creating flashcard");
        res.status(500).json({ message: "Error creating flashcard", error });
    }
})

router.post('/deleteFlashcardSet', async (req: Request, res: Response): Promise<void> => {
    const userId = await getUserId(req, res);
    const flashcardId = sanitizeInput(req.body.flashcardId);
    if (!flashcardId) {
        res.status(400).json({ message: "flashcardId required" });
        return;
    }
    try {
        await Flashcard.deleteOne({ _id: flashcardId, userId }).then((result) => {
            if (result.deletedCount === 0) {
                res.status(400).json({ message: "flashcard not found" });
                return;
            }
        })
        res.status(200).json({ message: "flashcard deleted" });
    } catch (error) {
        console.error(error, "error deleting flashcard");
        res.status(500).json({ message: "Error deleting flashcard", error });
    }
})

router.post('/updateFlashcardSet', async (req: Request, res: Response): Promise<void> => {
    try {

        const userId: string | void = await getUserId(req, res);
        const flashcardId: string = sanitizeInput(req.body.flashcardId);
        const flashcards = req.body.flashcards;
        const sanitizedFlashcards = flashcards.map((flashcard: { frontName: string, backName: string }) => ({
            frontName: sanitizeInput(flashcard.frontName),
            backName: sanitizeInput(flashcard.backName),
        }));
        if (!flashcardId || !flashcards || !Array.isArray(flashcards)) {
            res.status(400).json({ message: "flashcardName and flashcards array required" });
            return;
        }

        const flashcard = await Flashcard.findOne({ _id: flashcardId, userId });
        if (!flashcard) {
            res.status(400).json({ message: "flashcard not found" });
            return;
        }

        flashcard.set('flashcards', sanitizedFlashcards);
        await flashcard.save();
        res.status(200).json({ message: "flashcard set updated" });
        return;
    }

    catch (error) {
        console.error(error, "error updating flashcards");
        res.status(500).json({ message: "Error updating flashcards", error });
    }
});
export default router;