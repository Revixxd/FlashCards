import express from "express";
import showFlashcardList from "./flashcardsRoutes/showFlashcardList.js";
import showUserFlashcards from "./flashcardsRoutes/showUserFlashcards.js";
import createFlashcardSet from "./flashcardsRoutes/createFlashcardSet.js";
import deleteFlashcardSet from "./flashcardsRoutes/deleteFlashcardSet.js";
import updateFlashcardSet from "./flashcardsRoutes/updateFlashcardSet.js";
const router = express.Router();

router.post("/showFlashcardList", showFlashcardList);
router.post("/showUserFlashcards", showUserFlashcards );
router.post('/createFlashcardSet', createFlashcardSet);
router.post('/deleteFlashcardSet', deleteFlashcardSet);
router.post('/updateFlashcardSet', updateFlashcardSet );

export default router;