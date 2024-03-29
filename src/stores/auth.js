import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axiosApiInstance from '../api.js'

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;
export const useAuthStore = defineStore('auth', () => {
  const userData = reactive({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
  })
  const error = ref('')
  const loader = ref(false)


  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
    error.value = ''; // Ошибки нет
    loader.value = true; // загрузка происходит
    try {
      let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true
      });
      userData.value = { // данные заменяються
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
      }
      localStorage.setItem('userTokens', JSON.stringify({
        token: userData.value.token,
        refreshToken: userData.value.refreshToken,
      }))
    } catch(err) {
      if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
        switch (err.response.data.error.message) {
          case 'EMAIL_EXISTS':
            error.value = 'Email exists';
            break;
          case 'OPERATION_NOT_ALLOWED':
            error.value = 'Operation not allowed';
            break;
          case 'EMAIL_NOT_FOUND':
            error.value = 'Email not found';
            break;
          case 'INVALID_PASSWORD':
            error.value = 'Invalid password';
            break;
          case 'INVALID_EMAIL':
            error.value = 'Invalid email';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            error.value = 'Invalid email or password';
            break;
          default:
            error.value = 'Error';
            break;
        }
      } else {
        // Если свойство data отсутствует, выводим стандартное сообщение об ошибке
        error.value = 'Network error or server issue';
      }
      throw error.value
    } finally {
      loader.value = false;
    }
  }

  const logout = () => {
    userData.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
    }
  }
  return { auth, userData, error, loader, logout }
})
