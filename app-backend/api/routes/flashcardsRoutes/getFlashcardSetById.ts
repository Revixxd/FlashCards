import { Request, Response } from "express";
import Flashcard from "../../models/Flashcard.js";
import { authorizeUser } from "../../controllers/auth.js";


const getFlashcardSetById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authorizeUser(req, res);
        if (!userId) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const flashcardId = req.body.flashcardId;
        if (!flashcardId) {
            res.status(400).json({ message: "Flashcard ID is required" });
            return;
        }

        const flashcardSet = await Flashcard.findOne({ _id: flashcardId }).exec();
        if (!flashcardSet) {
            res.status(404).json({ message: "Flashcard set not found" });
            return;
        }

        res.status(200).json(flashcardSet);
    } catch (error) {
        console.error("Error retrieving flashcard set:", error);
        res.status(500).json({ message: "Error retrieving flashcard set", error });
    }
};

export default getFlashcardSetById;