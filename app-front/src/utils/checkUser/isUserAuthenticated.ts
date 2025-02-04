import { makeRequest } from '../../services/makeRequest/makeRequest'
import { GETRequestEnum } from '../../services/makeRequest/makeRequest.types'

async function isUserAuthenticated() {
  try {
    await makeRequest('GET', GETRequestEnum.ISUSERAUTHENTICATED, null)

    return true
  }
  catch (error) {
    console.error('Authentication check failed:', error)

    return false
  }
}

export default isUserAuthenticated
