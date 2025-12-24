<template>
  <v-dialog v-model="dialog" persistent max-width="520" class="warning-dialog">
    <v-card class="warning-card">
      <div class="warning-header">
        <div class="warning-icon-wrapper">
          <v-icon size="48" color="warning">mdi-alert-circle</v-icon>
        </div>
        <h2 class="text-h5 font-weight-bold mt-4 mb-2">Age Verification Required</h2>
      </div>
      <v-card-text class="pa-6 text-center">
        <p class="text-h6 mb-4" style="color: rgba(255, 255, 255, 0.9);">You must be 18 years or older to access this website.</p>
        <p class="text-body-1" style="color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
          This website contains adult content and is intended for mature audiences only.
        </p>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          class="btn-ghost me-3"
          variant="outlined"
          size="large"
          @click="handleExit"
        >
          Exit
        </v-btn>
        <v-btn
          class="btn-premium"
          size="large"
          @click="handleConfirm"
        >
          I am 18 or older
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])
const dialog = ref(true)

const handleConfirm = () => {
  localStorage.setItem('hasSeenWarning', 'true')
  dialog.value = false
  emit('close')
}

const handleExit = () => {
  window.location.href = 'https://www.google.com'
}
</script>

<style scoped>
.warning-dialog :deep(.v-overlay__scrim) {
  background: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(8px);
}

.warning-card {
  padding: 0 !important;
  overflow: hidden;
}

.warning-header {
  background: var(--gradient-primary);
  padding: 32px 24px 24px;
  text-align: center;
  color: white;
}

.warning-icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}
</style>

