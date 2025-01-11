import mongoose, { Schema, Document, Types } from 'mongoose';

interface IFlashcard extends Document {
    flashcardName: string;
    userId: Types.ObjectId;
    flashcards: Types.Array<IFlashcard>;
}
const FlashcardItemSchema: Schema = new Schema({
    frontName: {type: String, required: true},
    backName: {type: String, required: true}
});

const FlashcardSchema: Schema = new Schema({
    flashcardName: { type: String, required: true, unique: false },
    userId: {type: Types.ObjectId, ref: "Users", required: true},
    flashcards: {type: [FlashcardItemSchema], required: true}
});

const Flashcard = mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

export default Flashcard;