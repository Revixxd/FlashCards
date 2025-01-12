import { HttpMethod, GETRequestEnum, POSTRequestEnum, DELETERequestEnum, GETRequestProps, POSTRequestProps, DELETERequestProps, RequestOptions  } from "./makeRequest.types"
import {RequestResponse} from "./response.types"
type RequestProps<T> = T extends GETRequestEnum
  ? GETRequestProps[T]
  : T extends POSTRequestEnum
  ? POSTRequestProps[T]
  : T extends DELETERequestEnum
  ? DELETERequestProps[T]
  : never;

function requestFactory<T extends GETRequestEnum | POSTRequestEnum | DELETERequestEnum>(
  method: HttpMethod,
  type: T,
  props: RequestProps<T>
) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  let url = `${baseUrl}/${type}`
  let body: string | undefined

  if(props) {
    body = JSON.stringify(props)
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
  };
}

async function makeRequest<T extends GETRequestEnum | POSTRequestEnum | DELETERequestEnum>(
  method: HttpMethod,
  type: T,
  props: RequestProps<T>
): Promise<RequestResponse<T>> {
  console.log(props);
  const requestOptions = requestFactory(method, type, props);
  const response = await fetch(requestOptions.url, requestOptions);
  if (!response.ok) {
    throw new Error(`error status: ${response.status}`);
  }

  return await response.json();
}

export { makeRequest};


