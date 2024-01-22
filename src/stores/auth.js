import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

const API_KEY = 'AIzaSyByuVX4iiymiDpycmt7S_blh4QGPMkHOIw'
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


  const signUp = async (payload) => {
    error.value = '';
    loader.value = true;
    try {
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true
      });
      userData.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }
      loader.value = false;
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
        default:
          error.value = 'Error'
          break;
      }
    }
  }

  return { signUp, userData, error, loader }
})
