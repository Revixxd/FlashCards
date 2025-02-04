import type { FlashcardSet } from '../../services/makeRequest/flashCards.types'
import { ref } from 'vue'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { GETRequestEnum } from '../../services/makeRequest/makeRequest.types'

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

  return {
    requestError,
    getUserFlashCardsList,
  }
}

export default useFlashCards
