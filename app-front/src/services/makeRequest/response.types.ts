import type { FlashcardSet } from './flashCards.types'
import type { DELETERequestEnum, GETRequestEnum, POSTRequestEnum } from './makeRequest.types'
// POST request responses
export interface LoginResponse {
  message: string
}
export interface RegisterResponse {
  token: string
}
export interface CreateFlashcardSetResponse {
  flashcardSetId: string
}
export interface UpdateFlashcardSetResponse {
  flashcardSetId: string
}

// GET request responses
export type GetUserFlashcardsListResponse = FlashcardSet
// DELETE request responses
export interface DeleteFlashcardSetResponse {
  flashcardSetId: string
}

interface POSTRequestResponseType {
  [POSTRequestEnum.LOGIN]: LoginResponse
  [POSTRequestEnum.REGISTER]: RegisterResponse
  [POSTRequestEnum.CREATEFLASHCARDSET]: CreateFlashcardSetResponse
  [POSTRequestEnum.UPDATEFLASHCARDSET]: UpdateFlashcardSetResponse
}

interface GetRequestResponseType {
  [GETRequestEnum.GETUSERFLASHCARDLIST]: GetUserFlashcardsListResponse
  [GETRequestEnum.LOGOUT]: null
  [GETRequestEnum.ISUSERAUTHENTICATED]: null
}

interface DELETERequestResponseType {
  [DELETERequestEnum.DELETEFLASHCARDSET]: DeleteFlashcardSetResponse
}

export type RequestResponse<T> = T extends POSTRequestEnum
  ? POSTRequestResponseType[T]
  : T extends GETRequestEnum
    ? GetRequestResponseType[T]
    : T extends DELETERequestEnum
      ? DELETERequestResponseType[T]
      : never
