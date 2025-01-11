import { Request, Response } from "express";
import Flashcard from "../../models/Flashcard.js";
import { authorizeUser } from "../../controllers/auth.js";

const getUserFlashcardList = async (req: Request, res: Response): Promise<void> => {
    try {
    const userId = await authorizeUser(req, res);
    if (!userId) {
        return;
    }
        const flashcards = await Flashcard.find({ userId }, "flashcardName").exec();
        res.status(200).json(flashcards);
    } catch (error) {
        console.error("Error retrieving flashcards:", error);
        res.status(500).json({ message: "Error retrieving flashcards", error });
    }
};

export default getUserFlashcardList;