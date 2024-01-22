<script setup>
import { useAuthStore } from '@/stores/auth.js'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { ref } from 'vue'
import l-loader from '@/components/v-loader.vue'

const authStore = useAuthStore()

const email = ref();
const password = ref()

const signUp = async () => {
  await authStore.signUp({email: email.value, password: password.value})
}
</script>

<template>
  <h2>Sign Up</h2>
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
      <Button label="Signup" @click="signUp"/>
      <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>

<style scoped>

</style>