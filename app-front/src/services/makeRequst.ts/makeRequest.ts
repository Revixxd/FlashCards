import { HttpMethod, GETRequestEnum, POSTRequestEnum, DELETERequestEnum, GETRequestProps, POSTRequestProps, DELETERequestProps, RequestOptions  } from "./makeRequest.types"

function requestFactory(method: HttpMethod, type: GETRequestEnum | POSTRequestEnum | DELETERequestEnum, props: GETRequestProps | POSTRequestProps | DELETERequestProps): RequestOptions {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  let url = `${baseUrl}/${type}`
  let body: string | undefined

  if (method === 'POST' && props) {
    body = JSON.stringify(props)
  }

  if (method === 'GET' && typeof props === 'object') {
  }

  if(method === 'POST') {

  }

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
    },
    body,
    url,
  }
}

async function makeRequest<T>(method: HttpMethod, type: GETRequestEnum | POSTRequestEnum | DELETERequestEnum, props: GETRequestProps | POSTRequestProps | DELETERequestProps): Promise<T> {
  const requestOptions = requestFactory(method, type, props)

  const response = await fetch(requestOptions.url, requestOptions)
  if (!response.ok) {
    throw new Error(`error status: ${response.status}`)
  }

  return await response.json()
}

export { makeRequest }
