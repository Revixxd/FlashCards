import { Request, Response } from "express";
import getUserId from "../../utils/getUserId.js";
import Flashcard from "../../models/Flashcard.js";

const showFlashcardList = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await getUserId(req, res);
        if (!userId) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const flashcards = await Flashcard.find({ userId }, "flashcardName").exec();
        res.status(200).json(flashcards);
    } catch (error) {
        console.error("Error retrieving flashcards:", error);
        res.status(500).json({ message: "Error retrieving flashcards", error });
    }
};

export default showFlashcardList;