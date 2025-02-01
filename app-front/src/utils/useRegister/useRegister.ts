import type { RegisterProps } from '../../services/makeRequest/makeRequest.types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { makeRequest } from '../../services/makeRequest/makeRequest'
import { POSTRequestEnum } from '../../services/makeRequest/makeRequest.types'

function useLogin() {
  const router = useRouter()
  const requestError = ref<Error | null>(null)

  const register = async (data: RegisterProps) => {
    if (!data) {
      return
    }

    try {
      await makeRequest('POST', POSTRequestEnum.REGISTER, data)
      router.push({ name: 'dashboard' })
    }
    catch (err: any) {
      const serverErrorMessage = JSON.parse(err.message)
      requestError.value = serverErrorMessage
    }
  }

  return {
    requestError,
    register,
  }
}

export default useLogin
