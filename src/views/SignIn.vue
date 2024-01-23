<script setup>
import { useAuthStore } from '@/stores/auth.js'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { ref } from 'vue'
import VLoader from '@/components/v-loader.vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()

const email = ref();
const password = ref()

const router = useRouter();

const SignIn = async () => {
  await authStore.auth({email: email.value, password: password.value}, 'signin')
  router.push('/cars')
}
</script>

<template>
  <h2>Sign In</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText v-model="email" typeof="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText v-model="password" type="password" placeholder="Password"/>
    </div>
    <v-loader  v-if="authStore.loader"/>
    <div class="flex flex-column gap-3">
      <Button label="Signin" @click="SignIn"/>
      <span>Are you not registered yet? <router-link to="/signup">Sign up</router-link></span>
    </div>
  </form>
</template>

<style scoped>

</style>