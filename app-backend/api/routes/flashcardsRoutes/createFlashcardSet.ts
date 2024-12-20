import { Request, Response } from "express";
import sanitizeInput from "../../utils/sanitizeInput.js";
import getUserId from "../../utils/getUserId.js";
import Flashcard from "../../models/Flashcard.js";

const createFlashcardSet = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserId(req, res);
        if (!userId) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const flashcardName = sanitizeInput(req.body.flashcardName);
        if (!flashcardName) {
            res.status(400).json({ message: "flashcardName required" });
            return;
        }

        const flashcard = new Flashcard({ flashcardName, userId, flashcards: [] });
        await flashcard.save();
        res.status(200).json({ message: "flashcard created" });
    } catch (error) {
        console.error("Error creating flashcard:", error);
        res.status(500).json({ message: "Error creating flashcard", error });
    }
};

export default createFlashcardSet;