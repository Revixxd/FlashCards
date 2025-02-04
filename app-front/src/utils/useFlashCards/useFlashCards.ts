import type { Flashcard, FlashcardSet } from '../../services/makeRequest/flashCards.types'
import { ref } from 'vue'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { GETRequestEnum, POSTRequestEnum } from '../../services/makeRequest/makeRequest.types'

function useFlashCards() {
  const requestError = ref<Error | null>(null)

  const getUserFlashCardsList = async () => {
    let flashCardsSets: FlashcardSet[] = []

    try {
      await makeRequest('GET', GETRequestEnum.GETUSERFLASHCARDLIST, null)
        .then((response) => {
          flashCardsSets = response
        })
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }

    return flashCardsSets
  }

  const getUserFlashCardsSet = async (flashCardSetId: string): Promise<FlashcardSet> => {
    let flashCardsSet: FlashcardSet = {
      _id: '',
      flashcardName: '',
      userId: '',
      flashcards: [],
    }

    try {
      await makeRequest('POST', POSTRequestEnum.GETUSERFLASHCARDSET, { flashcardId: flashCardSetId })
        .then((response) => {
          flashCardsSet = response as FlashcardSet
        })
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }

    return flashCardsSet
  }

  const updateFlashcardSet = async (flashcardSetId: string, flashcards: Flashcard[]) => {
    try {
      await makeRequest('POST', POSTRequestEnum.UPDATEFLASHCARDSET, {
        flashcardId: flashcardSetId,
        flashcards,
      })
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }
  }

  return {
    requestError,
    updateFlashcardSet,
    getUserFlashCardsSet,
    getUserFlashCardsList,
  }
}

export default useFlashCards
