import type { DELETERequestEnum, DELETERequestProps, GETRequestEnum, GETRequestProps, HttpMethod, POSTRequestEnum, POSTRequestProps } from './makeRequest.types'
import type { RequestResponse } from './response.types'

type RequestProps<T> = T extends GETRequestEnum
  ? GETRequestProps[T]
  : T extends POSTRequestEnum
    ? POSTRequestProps[T]
    : T extends DELETERequestEnum
      ? DELETERequestProps[T]
      : never

function requestFactory<T extends GETRequestEnum | POSTRequestEnum | DELETERequestEnum>(
  method: HttpMethod,
  type: T,
  props: RequestProps<T>,
) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const url = `${baseUrl}/${type}`
  let body: string | undefined

  if (props) {
    body = JSON.stringify(props)
  }

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include' as RequestCredentials,
    body,
    url,
  }
}

async function makeRequest<T extends GETRequestEnum | POSTRequestEnum | DELETERequestEnum>(
  method: HttpMethod,
  type: T,
  props: RequestProps<T>,
): Promise<RequestResponse<T>> {
  const requestOptions = requestFactory(method, type, props)
  const response = await fetch(requestOptions.url, requestOptions)

  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(text)
    })
  }

  return response.json()
}

export { makeRequest }
