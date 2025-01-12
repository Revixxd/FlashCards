import { GETRequestEnum, DELETERequestEnum, POSTRequestEnum } from "./makeRequest.types";

// POST request responses
export type LoginResponse = {
    token: string
}
export type RegisterResponse = {
    token: string
}
export type CreateFlashcardSetResponse = {
    flashcardSetId: string
}
export type UpdateFlashcardSetResponse = {
    flashcardSetId: string
}

// GET request responses
export type GetUserFlashcardsResponse = {
    flashcardSets: {
        flashcardSetId: string
        title: string
        description: string
        flashcards: {
            frontName: string
            backName: string
        }[]
    }[]
}

// DELETE request responses
export type DeleteFlashcardSetResponse = {
    flashcardSetId: string
}

type POSTRequestResponseType = {
    [POSTRequestEnum.LOGIN]: LoginResponse
    [POSTRequestEnum.REGISTER]: RegisterResponse
    [POSTRequestEnum.CREATEFLASHCARDSET]: CreateFlashcardSetResponse
    [POSTRequestEnum.UPDATEFLASHCARDSET]: UpdateFlashcardSetResponse
}

type GetRequestResponseType = {
    [GETRequestEnum.GETUSERFLASHCARDS]: GetUserFlashcardsResponse
}

type DELETERequestResponseType = {
    [DELETERequestEnum.DELETEFLASHCARDSET]: DeleteFlashcardSetResponse
}

export type RequestResponse<T> = T extends POSTRequestEnum
  ? POSTRequestResponseType[T]
  : T extends GETRequestEnum
  ? GetRequestResponseType[T]
  : T extends DELETERequestEnum
  ? DELETERequestResponseType[T]
  : never;