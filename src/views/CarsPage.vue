<script setup>
import {ref, onMounted} from 'vue'
import axiosApiInstance from '../api.js'

import Card from 'primevue/card'
import VLoader from '@/components/v-loader.vue';

const cars = ref();
const showLoader = ref(false);

const getAllCars = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstance.get('https://jwt-firebase-vue3-d7996-default-rtdb.europe-west1.firebasedatabase.app/cars.json')
    cars.value = response.data
  } catch (err) {
    console.log(err.response);
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllCars();
})
</script>

<template>
  <div>
    <h2>Cars</h2>
    <v-loader v-if="showLoader"/>
    <div class="flex flex-column gap-3" v-else>
      <Card v-for="(car, i) in cars" :key="i">
        <template #title> {{car.name}} </template>
        <template #subtitle> {{car.type}} </template>
      </Card>
    </div>
  </div>
</template>