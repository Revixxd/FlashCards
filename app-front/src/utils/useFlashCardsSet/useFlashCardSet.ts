import { ref } from 'vue'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { POSTRequestEnum } from '../../services/makeRequest/makeRequest.types'

function useFlashCardsSet(flashcardSetId: string) {
  const requestError = ref<Error | null>(null)
  const userFlashCardsSet = ref<FlashcardSetLong | null>(null)

  const getFlashCardsSet = async (flashCardSetId: string) => {
    try {
      await makeRequest('POST', POSTRequestEnum.GETUSERFLASHCARDSET, { flashcardId: flashCardSetId })
        .then((response) => {
          userFlashCardsSet.value = response as FlashcardSetLong
        })
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }
  }

  getFlashCardsSet(flashcardSetId)

  return {
    userFlashCardsSet,
    requestError,
  }
}

export default useFlashCardsSet
