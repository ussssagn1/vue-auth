<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const token = computed(() => authStore.userData.token)
const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if(tokens) {
    authStore.userData.token = tokens.token
    authStore.userData.refreshToken = tokens.refreshToken
  }
  console.log(authStore.userData)
}
const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/')
}

checkUser()
</script>

<template>
  <div class="menu flex gap-5">
    <RouterLink class="font-bold text-gray-500" to="/">Home</RouterLink>
    <RouterLink class="font-bold  text-gray-500" to="/signin" v-if="!token">Sign in</RouterLink>
    <RouterLink class="font-bold  text-gray-500" to="/cars" v-if="token">Cars</RouterLink>
    <RouterLink class="font-bold  text-gray-500" to="/signin" v-if="token" @click.prevent="logout">Logout</RouterLink>
  </div>
  <div class="container">
    <RouterView />
  </div>

</template>

<style scoped>
.container {
  margin: auto;
  max-width: 600px
}
a {
  text-decoration: none;
}
</style>
