<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">VIP Talent Payment</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Exclusive premium experience</p>
    </div>
    
    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-card class="gradient-card pa-8 text-center">
          <div class="vip-icon-wrapper mb-6">
            <v-icon size="120" color="white">mdi-crown</v-icon>
          </div>
          <h2 class="text-h4 font-weight-bold mb-4 text-white">VIP Talent Experience</h2>
          <p class="text-h6 mb-8 text-white" style="opacity: 0.9;">
            Exclusive premium talent experience with the highest level of service
          </p>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.2);"></v-divider>

          <div class="mb-8 text-left">
            <h3 class="text-h6 font-weight-bold mb-4 text-white">Package Includes</h3>
            <ul class="vip-list">
              <li>Premium talent selection</li>
              <li>Extended service duration</li>
              <li>Priority booking</li>
              <li>Additional amenities</li>
              <li>Personalized attention</li>
            </ul>
          </div>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.2);"></v-divider>

          <div>
            <p class="text-h6 font-weight-bold mb-6 text-white">Contact us to proceed with payment</p>
            <v-btn
              size="x-large"
              class="btn-premium-white"
              block
              @click="contactForPayment"
            >
              <v-icon start size="24">mdi-whatsapp</v-icon>
              Contact for Payment
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const contactForPayment = () => {
  const phoneNumber = '1234567890' // Replace with actual admin WhatsApp number
  const message = encodeURIComponent('Hello, I am interested in VIP Talent service and would like to proceed with payment.')
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}
</script>

<style scoped>
.vip-icon-wrapper {
  width: 160px;
  height: 160px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.vip-list {
  list-style: none;
  padding: 0;
}

.vip-list li {
  padding: 12px 0;
  padding-left: 32px;
  position: relative;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  font-size: 1rem;
}

.vip-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.btn-premium-white {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  font-weight: 600 !important;
}

.btn-premium-white:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-2px);
}
</style>
