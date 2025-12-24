<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">Mystery Talent</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Discover the unexpected</p>
    </div>
    
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card class="premium-card pa-8">
          <div class="text-center mb-8">
            <div class="mystery-icon-wrapper mb-6">
              <v-icon size="96" color="primary">mdi-incognito</v-icon>
            </div>
            <h2 class="text-h4 font-weight-bold mb-4 text-premium">Discover the Unexpected</h2>
          </div>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <div class="mb-8">
            <h3 class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">What is Mystery Talent?</h3>
            <p class="text-body-1 mb-4" style="color: rgba(255, 255, 255, 0.8); line-height: 1.8;">
              Mystery Talent offers a unique and exciting experience where you can discover
              something unexpected. This exclusive service provides an element of surprise
              and adventure.
            </p>
          </div>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <div class="mb-8">
            <h3 class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">
              <v-icon size="20" class="mr-2" color="primary">mdi-check-circle</v-icon>
              Requirements
            </h3>
            <ul class="mystery-list">
              <li>Must be 18 years or older</li>
              <li>Valid identification required</li>
              <li>Advance booking required (minimum 24 hours)</li>
              <li>Payment confirmation required before service</li>
              <li>Agreement to terms and conditions</li>
            </ul>
          </div>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <div class="mb-8">
            <h3 class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">
              <v-icon size="20" class="mr-2" color="primary">mdi-star</v-icon>
              What to Expect
            </h3>
            <p class="text-body-1 mb-4" style="color: rgba(255, 255, 255, 0.8); line-height: 1.8;">
              The Mystery Talent experience is designed to be unique and memorable.
              While we maintain discretion about specific details, you can expect:
            </p>
            <ul class="mystery-list">
              <li>Professional and discrete service</li>
              <li>High-quality experience</li>
              <li>Surprise element that makes it special</li>
              <li>Complete confidentiality</li>
            </ul>
          </div>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <div class="text-center">
            <v-btn
              size="x-large"
              class="btn-premium"
              @click="contactForBooking"
            >
              <v-icon start size="24">mdi-whatsapp</v-icon>
              Contact for Booking
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const contactForBooking = () => {
  const phoneNumber = '1234567890' // Replace with actual admin WhatsApp number
  const message = encodeURIComponent('Hello, I am interested in booking Mystery Talent service.')
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}
</script>

<style scoped>
.mystery-icon-wrapper {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  background: rgba(139, 92, 246, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
}

.mystery-list {
  list-style: none;
  padding: 0;
}

.mystery-list li {
  padding: 12px 0;
  padding-left: 32px;
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.mystery-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #8B5CF6;
  font-weight: bold;
}
</style>
