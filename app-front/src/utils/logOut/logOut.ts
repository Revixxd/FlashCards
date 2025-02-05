import router from '../../router'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { GETRequestEnum } from '../../services/makeRequest/makeRequest.types'

async function logOut() {
  try {
    await makeRequest('GET', GETRequestEnum.LOGOUT, null)
    router.push({ name: 'login' })
  }
  catch (err: any) {
    console.error(err)
  }
}

export default logOut
