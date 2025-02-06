import type { Flashcard, FlashcardSet, FlashcardSetLong } from '../../services/makeRequest/flashCards.types'
import { ref } from 'vue'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { DELETERequestEnum, GETRequestEnum, POSTRequestEnum } from '../../services/makeRequest/makeRequest.types'

function useFlashCards() {
  const requestError = ref<Error | null>(null)
  const userFlashCardsList = ref<FlashcardSet[]>([])

  const getUserFlashCardsList = async () => {
    try {
      await makeRequest('GET', GETRequestEnum.GETUSERFLASHCARDLIST, null)
        .then((response) => {
          userFlashCardsList.value = response as Flashcard[]
        })
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }
  }

  getUserFlashCardsList()

  const deleteFlashcardSet = async (flashcardSetId: string) => {
    try {
      await makeRequest('DELETE', DELETERequestEnum.DELETEFLASHCARDSET, { flashcardId: flashcardSetId })
        .then(() => {
          userFlashCardsList.value = []
          userFlashCardsList.value = getUserFlashCardsList()
        },
        )
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }
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

  const createFlashcardSet = async (title: string) => {
    let newFlashcardSetId = ''
    try {
      await makeRequest('POST', POSTRequestEnum.CREATEFLASHCARDSET, { flashcardName: title })
        .then((response: { flashcardId: string }) => {
          newFlashcardSetId = response.flashcardId
        })

      return newFlashcardSetId
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }
  }

  return {
    requestError,
    userFlashCardsList,
    deleteFlashcardSet,
    createFlashcardSet,
    getUserFlashCardsSet,
    updateFlashcardSet,
  }
}

export default useFlashCards
