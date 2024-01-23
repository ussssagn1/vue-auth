import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;
export const useAuthStore = defineStore('auth', () => {
  const userData = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })
  const error = ref('')
  const loader = ref(false)


  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
    error.value = '';
    loader.value = true;
    try {
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true
      });
      console.log(response.data)
      userData.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too many attempts';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Invalid login or password';
          break;
        default:
          error.value = 'Error'
          break;
      }
      loader.value = false;
      throw error.value
    }
  }

  return { auth, userData, error, loader }
})
