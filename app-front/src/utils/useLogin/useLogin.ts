import type { LoginProps } from '../../services/makeRequest/makeRequest.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { POSTRequestEnum } from '../../services/makeRequest/makeRequest.types'

function useLogin() {
  const router = useRouter()
  const requestError = ref<Error | null>(null)

  const login = async (data: LoginProps) => {
    if (!data) {
      return
    }

    try {
      await makeRequest('POST', POSTRequestEnum.LOGIN, data)
      router.push({ name: 'dashboard' })
    }
    catch (err: any) {
      requestError.value = err
      console.error(err)
    }
  }

  return {
    requestError,
    login,
  }
}

export default useLogin
