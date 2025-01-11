import { Request, Response } from "express";
import sanitizeInput from "../../utils/sanitizeInput.js";
import Flashcard from "../../models/Flashcard.js";
import { authorizeUser } from "../../controllers/auth.js";

const createFlashcardSet = async (req: Request, res: Response): Promise<void> => {

    try { 
        const userId = await authorizeUser(req, res);
        if (!userId) {
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