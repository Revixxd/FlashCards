import { Request, Response } from "express";
import Flashcard from "../../models/Flashcard.js";
import { authorizeUser } from "../../controllers/auth.js";

const getUserFlashcards = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const flashcards = await Flashcard.find({ userId }).exec();
        if (!flashcards || flashcards.length === 0) {
            res.status(404).json({ message: "No flashcards found" });
            return;
        }
        else {
            res.status(200).json(flashcards);
        }
    } catch (error) {
        console.error("Error retrieving flashcards:");
    }
};

export default getUserFlashcards;