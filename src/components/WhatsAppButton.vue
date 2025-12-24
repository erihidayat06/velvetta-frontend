<template>
  <v-btn
    class="whatsapp-button"
    color="success"
    size="large"
    icon="mdi-whatsapp"
    @click="openWhatsApp"
  >
  </v-btn>
</template>

<script setup>
const openWhatsApp = () => {
  const phoneNumber = '1234567890' // Replace with actual admin WhatsApp number
  const message = encodeURIComponent('Hello, I would like to inquire about Velvetta services.')
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  width: 64px !important;
  height: 64px !important;
  border-radius: 50% !important;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.whatsapp-button:hover {
  transform: translateY(-4px) scale(1.1) !important;
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.5) !important;
}

.whatsapp-button:active {
  transform: translateY(-2px) scale(1.05) !important;
}
</style>

