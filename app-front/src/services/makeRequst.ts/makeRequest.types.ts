export type HttpMethod = 'GET' | 'POST' | 'DELETE'

export interface RequestOptions {
  method: HttpMethod
  headers: { [key: string]: string }
  body?: string
  url: string
}

export enum GETRequestEnum {
    GETUSERFLASHCARDS = 'flashcards/getUserFlashcards'
}

export enum POSTRequestEnum {
  LOGIN = 'login',
  REGISTER = 'register',
  CREATEFLASHCARDSET = 'flashcards/createFlashcardSet',
  UPDATEFLASHCARDSET = 'flashcards/updateFlashcardSet',
}

export enum DELETERequestEnum {
    DELETEFLASHCARDSET = 'flashcards/deleteFlashcardSet',
}

// flashcards
export interface Flashcard {
    frontName: string
    backName: string
}

// auth
export type LoginProps = { usernameOrEmail: string, password: string }
export type RegisterProps = { username: string, email: string, password: string }

// flashcards request props
export type GetUserFlashcardsProps = null
export type CreateFlashcardSetProps = { 
    title: string, 
    description: string 
}
export type UpdateFlashcardSetProps = { 
    lashcardSetId: string, 
    flashcards: Flashcard[] 
}
export type DeleteFlashcardSetProps = { 
    flashcardSetId: string 
}

export interface GETRequestProps {
  [GETRequestEnum.GETUSERFLASHCARDS]: GetUserFlashcardsProps
}

export interface POSTRequestProps {
  [POSTRequestEnum.LOGIN]: LoginProps
  [POSTRequestEnum.REGISTER]: RegisterProps
  [POSTRequestEnum.CREATEFLASHCARDSET]: CreateFlashcardSetProps
  [POSTRequestEnum.UPDATEFLASHCARDSET]: UpdateFlashcardSetProps
}

export interface DELETERequestProps {
    [DELETERequestEnum.DELETEFLASHCARDSET]: DeleteFlashcardSetProps
}