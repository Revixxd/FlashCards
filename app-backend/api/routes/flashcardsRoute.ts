import express from "express";
import getUserFlashcardList from "./flashcardsRoutes/getUserFlashcardList.js";
import getUserFlashcards from "./flashcardsRoutes/getUserFlashcards.js";
import createFlashcardSet from "./flashcardsRoutes/createFlashcardSet.js";
import deleteFlashcardSet from "./flashcardsRoutes/deleteFlashcardSet.js";
import updateFlashcardSet from "./flashcardsRoutes/updateFlashcardSet.js";
import getFlashcardSetById from "./flashcardsRoutes/getFlashcardSetById.js";
const router = express.Router();

router.get("/getUserFlashcardList", getUserFlashcardList);
router.get("/getUserFlashcards", getUserFlashcards );
router.post('/getFlashcardSetById', getFlashcardSetById);
router.post('/createFlashcardSet', createFlashcardSet);
router.post('/updateFlashcardSet', updateFlashcardSet );
router.delete('/deleteFlashcardSet', deleteFlashcardSet);


export default router;