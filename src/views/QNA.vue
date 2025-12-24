<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">Frequently Asked Questions</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Find answers to common questions</p>
    </div>
    
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-expansion-panels variant="accordion" class="qna-panels">
          <v-expansion-panel
            v-for="(item, index) in qnaItems"
            :key="index"
            class="qna-panel"
          >
            <v-expansion-panel-title class="qna-title">
              <span class="text-h6 font-weight-medium">{{ item.question }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="qna-content">
              <p class="text-body-1" style="color: rgba(255, 255, 255, 0.8); line-height: 1.8;">{{ item.answer }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const qnaItems = ref([
  {
    question: 'What services does Velvetta provide?',
    answer: 'Velvetta provides premium talent services with a focus on professionalism, discretion, and excellence. We connect clients with exceptional talent for various needs.'
  },
  {
    question: 'How do I book a talent?',
    answer: 'You can browse our talent listings and contact us via WhatsApp to make a booking. Our team will assist you with the booking process.'
  },
  {
    question: 'What is the booking process?',
    answer: 'After contacting us via WhatsApp, we will discuss your requirements, confirm availability, and provide you with booking details. Payment and confirmation will be handled securely.'
  },
  {
    question: 'Is my information kept confidential?',
    answer: 'Yes, absolutely. We prioritize discretion and confidentiality. All client information is kept strictly confidential and secure.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods. Please contact us via WhatsApp to discuss payment options that work best for you.'
  },
  {
    question: 'Can I cancel or reschedule a booking?',
    answer: 'Yes, cancellations and rescheduling are possible. Please contact us as soon as possible to discuss your needs. Cancellation policies may apply.'
  },
  {
    question: 'What is VIP Talent?',
    answer: 'VIP Talent offers an exclusive premium experience with our most elite talent. This service includes additional amenities and personalized attention.'
  },
  {
    question: 'What is Mystery Talent?',
    answer: 'Mystery Talent is a unique service where you can discover unexpected experiences. Please visit our Mystery Talent page for more details and requirements.'
  }
])
</script>

<style scoped>
.qna-panels {
  background: transparent !important;
}

.qna-panel {
  margin-bottom: 16px !important;
}

.qna-title {
  color: rgba(255, 255, 255, 0.9) !important;
  padding: 20px 24px !important;
}

.qna-content {
  padding: 0 24px 24px !important;
  background: rgba(139, 92, 246, 0.05) !important;
}
</style>
