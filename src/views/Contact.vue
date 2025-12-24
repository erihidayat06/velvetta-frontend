<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">Contact Us</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">We're here to help</p>
    </div>
    
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="premium-card pa-8">
          <h2 class="text-h4 font-weight-bold mb-6 text-premium">Get in Touch</h2>
          <p class="text-body-1 mb-8" style="color: rgba(255, 255, 255, 0.7); line-height: 1.8;">
            We're here to help! Reach out to us through any of the following methods.
          </p>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <v-row class="ga-3 ga-md-4 mb-8">
            <v-col cols="12" sm="6" md="6">
              <div class="contact-method text-center">
                <div class="contact-icon-wrapper mb-4">
                  <v-icon size="64" color="success">mdi-whatsapp</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-2" style="color: rgba(255, 255, 255, 0.9);">WhatsApp</h3>
                <p class="text-body-2 mb-4" style="color: rgba(255, 255, 255, 0.6);">Quick response via WhatsApp</p>
                <v-btn
                  size="large"
                  class="btn-premium"
                  block
                  @click="openWhatsApp"
                >
                  <v-icon start>mdi-whatsapp</v-icon>
                  Contact via WhatsApp
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <div class="contact-method text-center">
                <div class="contact-icon-wrapper mb-4">
                  <v-icon size="64" color="info">mdi-send</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-2" style="color: rgba(255, 255, 255, 0.9);">Telegram</h3>
                <p class="text-body-2 mb-4" style="color: rgba(255, 255, 255, 0.6);">Message us on Telegram</p>
                <v-btn
                  size="large"
                  class="btn-premium"
                  block
                  @click="openTelegram"
                >
                  <v-icon start>mdi-send</v-icon>
                  Contact via Telegram
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <div class="contact-method text-center">
                <div class="contact-icon-wrapper mb-4">
                  <v-icon size="64" color="pink">mdi-instagram</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-2" style="color: rgba(255, 255, 255, 0.9);">Instagram</h3>
                <p class="text-body-2 mb-4" style="color: rgba(255, 255, 255, 0.6);">Follow us on Instagram</p>
                <v-btn
                  size="large"
                  class="btn-premium"
                  block
                  @click="openInstagram"
                >
                  <v-icon start>mdi-instagram</v-icon>
                  Visit Instagram
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <div class="contact-method text-center">
                <div class="contact-icon-wrapper mb-4">
                  <v-icon size="64" color="primary">mdi-email</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold mb-2" style="color: rgba(255, 255, 255, 0.9);">Email</h3>
                <p class="text-body-2 mb-4" style="color: rgba(255, 255, 255, 0.6);">Send us an email</p>
                <v-btn
                  size="large"
                  class="btn-premium"
                  block
                  @click="openEmail"
                >
                  <v-icon start>mdi-email</v-icon>
                  Send Email
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <div class="text-center">
            <h3 class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">Business Hours</h3>
            <div class="business-hours">
              <p class="text-body-1 mb-2" style="color: rgba(255, 255, 255, 0.7);">Monday - Friday: 9:00 AM - 9:00 PM</p>
              <p class="text-body-1 mb-2" style="color: rgba(255, 255, 255, 0.7);">Saturday - Sunday: 10:00 AM - 8:00 PM</p>
            </div>
            <p class="text-body-2 mt-4" style="color: rgba(255, 255, 255, 0.5);">
              We respond to inquiries within 24 hours
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const openWhatsApp = () => {
  const phoneNumber = '1234567890' // Replace with actual admin WhatsApp number
  const message = encodeURIComponent('Hello, I would like to contact Velvetta.')
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}

const openTelegram = () => {
  const username = 'velvetta' // Replace with actual Telegram username (without @)
  window.open(`https://t.me/${username}`, '_blank')
}

const openInstagram = () => {
  const username = 'velvetta' // Replace with actual Instagram username
  window.open(`https://instagram.com/${username}`, '_blank')
}

const openEmail = () => {
  const email = 'contact@velvetta.com' // Replace with actual email
  const subject = encodeURIComponent('Inquiry from Velvetta Website')
  const body = encodeURIComponent('Hello, I would like to get in touch.')
  window.open(`mailto:${email}?subject=${subject}&body=${body}`)
}
</script>

<style scoped>
.contact-method {
  padding: 24px;
  border-radius: 16px;
  background: rgba(139, 92, 246, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.contact-method:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-4px);
}

.contact-icon-wrapper {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.contact-method:hover .contact-icon-wrapper {
  background: rgba(139, 92, 246, 0.2);
  transform: scale(1.1);
}

.business-hours {
  padding: 20px;
  background: rgba(139, 92, 246, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.2);
}
</style>
