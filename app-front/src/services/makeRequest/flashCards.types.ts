export interface Flashcard {
  frontName: string
  backName: string
  _id: string
}

export interface FlashcardSet {
  _id: string
  flashcardName: string
}

export interface FlashcardSetLong extends FlashcardSet {
  userId: string
  flashcards: Flashcard[]
}
