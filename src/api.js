import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js'
import router from '@/router/index.js'

const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url
  if(!url.includes('signInWithPassword') && !url.includes('signUp')) {
    const authStore = useAuthStore()
    let params = new URLSearchParams()
    params.append('auth', authStore.userData.token)
    config.params = params;
  }
  return config
})

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const authStore = useAuthStore()
  const originalError = error.config
  if (error.response.status === 401 && !originalError._retry) {
    originalError._retry = true;
    try {
      const newTokens = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key`, {
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('userTokens')).refresh_token
        }
      )
      authStore.userData.token = newTokens.data.access_token
      authStore.userData.refreshToken = newTokens.data.refresh_token
      localStorage.setItem('userTokens', JSON.stringify({
        token: newTokens.data.access_token,
        refreshToken: newTokens.data.refresh_token
      }))
    } catch (e) {
      console.log('Error: ', e)
      localStorage.removeItem('userItems')
      router.push('/signin')
      authStore.userData.token = '';
      authStore.userData.refreshToken = ''
    }
  }
  console.log(error)
})
export default axiosApiInstance