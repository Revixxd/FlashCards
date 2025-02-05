export interface FlashcardSet {
  _id: string
  flashcardName: string
  userId: string
  flashcards: Flashcard[]
}

export interface Flashcard {
  frontName: string
  backName: string
  _id: string
}
