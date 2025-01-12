import { Request, Response } from "express";
import sanitizeInput from "../../utils/sanitizeInput.js";
import Flashcard from "../../models/Flashcard.js";
import { authorizeUser } from "../../controllers/auth.js";

const deleteFlashcardSet = async (req: Request, res: Response): Promise<void> => {
    try {
        let userId = await authorizeUser(req, res);
        
        const flashcardId = sanitizeInput(req.body.flashcardId);
        if (!flashcardId) {
            res.status(400).json({ message: "flashcardId required" });
            return;
        }
        const result = await Flashcard.deleteOne({ _id: flashcardId, userId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "flashcard not found" });
            return;
        }

        res.status(200).json({ message: "flashcard deleted" });
    } catch (error) {
        console.error("Error deleting flashcard:", error);
    }
};

export default deleteFlashcardSet;