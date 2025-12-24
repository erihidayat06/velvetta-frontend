<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">Casting</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Join our exceptional team</p>
    </div>
    
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card class="premium-card pa-8">
          <h2 class="text-h4 font-weight-bold mb-6 text-premium">Join Our Team</h2>
          
          <v-row class="ga-3 ga-md-4 mb-8">
            <v-col cols="12" md="6">
              <div>
                <h3 class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">
                  <v-icon size="20" class="mr-2" color="primary">mdi-check-circle</v-icon>
                  Requirements
                </h3>
                <ul class="casting-list">
                  <li>Must be 18 years or older</li>
                  <li>Professional attitude and demeanor</li>
                  <li>Discretion and confidentiality</li>
                  <li>Excellent communication skills</li>
                  <li>Flexible schedule availability</li>
                </ul>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div>
                <h3 class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">
                  <v-icon size="20" class="mr-2" color="primary">mdi-star</v-icon>
                  What We Offer
                </h3>
                <ul class="casting-list">
                  <li>Competitive compensation</li>
                  <li>Professional working environment</li>
                  <li>Discrete and confidential operations</li>
                  <li>Supportive team environment</li>
                </ul>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-8" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>

          <div class="text-center">
            <h3 class="text-h5 font-weight-bold mb-4 text-premium">Apply Now</h3>
            <p class="text-body-1 mb-6" style="color: rgba(255, 255, 255, 0.7);">
              Contact us via WhatsApp or Email to apply
            </p>
            
            <v-row class="ga-3 ga-md-4">
              <v-col cols="6" sm="6" md="6">
                <v-btn
                  block
                  size="x-large"
                  class="btn-premium"
                  @click="applyViaWhatsApp"
                >
                  <v-icon start size="24">mdi-whatsapp</v-icon>
                  <span class="d-none d-sm-inline">Apply via WhatsApp</span>
                  <span class="d-sm-none">WhatsApp</span>
                </v-btn>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-btn
                  block
                  size="x-large"
                  class="btn-premium"
                  @click="applyViaEmail"
                >
                  <v-icon start size="24">mdi-email</v-icon>
                  <span class="d-none d-sm-inline">Apply via Email</span>
                  <span class="d-sm-none">Email</span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const applyViaWhatsApp = () => {
  const phoneNumber = '1234567890' // Replace with actual admin WhatsApp number
  const message = encodeURIComponent('Hello, I am interested in applying for a casting position at Velvetta.')
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}

const applyViaEmail = () => {
  const email = 'casting@velvetta.com' // Replace with actual email
  const subject = encodeURIComponent('Casting Application')
  const body = encodeURIComponent('Hello, I am interested in applying for a casting position.')
  window.open(`mailto:${email}?subject=${subject}&body=${body}`)
}
</script>

<style scoped>
.casting-list {
  list-style: none;
  padding: 0;
}

.casting-list li {
  padding: 12px 0;
  padding-left: 32px;
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.casting-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #8B5CF6;
  font-weight: bold;
}

@media (max-width: 600px) {
  .premium-card.pa-8 {
    padding: 24px 20px !important;
  }
  
  .btn-premium {
    font-size: 0.75rem !important;
    padding: 12px 8px !important;
    min-width: auto !important;
    height: 44px !important;
  }
  
  .btn-premium .v-icon {
    font-size: 18px !important;
    margin-right: 4px !important;
  }
  
  .btn-premium.size-x-large {
    height: 44px !important;
  }
  
  /* Ensure buttons stay side by side on mobile */
  .ga-3.ga-md-4 > .v-col {
    padding: 0 4px !important;
  }
  
  .casting-list li {
    font-size: 0.875rem !important;
    padding: 10px 0;
    padding-left: 28px;
  }
}
</style>
