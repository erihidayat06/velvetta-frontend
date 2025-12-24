<template>
  <v-app>
    <router-view />
    <WhatsAppButton />
    <WarningModal v-if="showWarning" @close="showWarning = false" />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import WarningModal from './components/WarningModal.vue'

const showWarning = ref(false)

onMounted(() => {
  const hasSeenWarning = localStorage.getItem('hasSeenWarning')
  if (!hasSeenWarning) {
    showWarning.value = true
  }
})
</script>

