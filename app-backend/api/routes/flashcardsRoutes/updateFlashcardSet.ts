import { Request, Response } from "express";
import sanitizeInput from "../../utils/sanitizeInput.js";
import Flashcard from "../../models/Flashcard.js";
import { authorizeUser } from "../../controllers/auth.js";

const updateFlashcardSet = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) {
             res.status(400).json({ message: "User not found" });
             return;
        }

        const flashcardId = sanitizeInput(req.body.flashcardId);
        const flashcards = req.body.flashcards;
        if (!flashcardId || !flashcards || !Array.isArray(flashcards)) {
            res.status(400).json({ message: "flashcardId and flashcards array required" });
            return;
        }

        const sanitizedFlashcards = flashcards.map((flashcard: { frontName?: string, backName?: string }) => ({
            frontName: sanitizeInput(flashcard.frontName),
            backName: sanitizeInput(flashcard.backName),
        }));

        const flashcard = await Flashcard.findOne({ _id: flashcardId, userId });
        if (!flashcard) {
            res.status(400).json({ message: "flashcard not found" });
            return;
        }

        flashcard.set('flashcards', sanitizedFlashcards);
        await flashcard.save();
        res.status(200).json({ message: "flashcard set updated" });
    } catch (error) {
        console.error("Error updating flashcards:", error);
    }
};

export default updateFlashcardSet;