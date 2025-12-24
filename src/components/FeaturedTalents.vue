<template>
  <section class="section-spacing">
    <div class="text-center mb-12">
      <h2 class="text-h3 font-weight-bold mb-4 text-premium">{{ title }}</h2>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">{{ subtitle }}</p>
    </div>
    <v-row class="ga-0 ga-md-4">
      <v-col
        v-for="talent in talents"
        :key="talent.id"
        cols="6"
        sm="6"
        md="3"
        lg="3"
      >
        <v-card
          class="talent-card cursor-pointer image-overlay"
          @click="router.push(`/talent/${talent.id}`)"
        >
            <v-img
              :src="getImageUrl(talent.image)"
              height="380"
              cover
              class="talent-image"
            >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <div class="talent-overlay">
              <div class="talent-info">
                <h3 class="text-h6 font-weight-bold mb-1">{{ talent.name }}</h3>
                <v-chip size="small" class="talent-chip">{{ talent.category }}</v-chip>
              </div>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/imageUrl'

const router = useRouter()

defineProps({
  talents: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Featured Talents'
  },
  subtitle: {
    type: String,
    default: 'Discover our exceptional selection'
  }
})
</script>

<style scoped>
.talent-card {
  overflow: hidden;
  border-radius: 20px !important;
}

.talent-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.talent-card:hover .talent-image {
  transform: scale(1.1);
}

.talent-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 24px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

/* Show overlay by default on mobile */
@media (max-width: 959px) {
  .talent-overlay {
    transform: translateY(0);
  }
}

/* Hide on desktop, show on hover */
@media (min-width: 960px) {
  .talent-card:hover .talent-overlay {
    transform: translateY(0);
  }
}

.talent-info {
  color: white;
}

.talent-chip {
  background: rgba(139, 92, 246, 0.8) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 600px) {
  .talent-image {
    height: 250px !important;
  }
  
  .talent-info h3 {
    font-size: 0.875rem !important;
  }
  
  .talent-chip {
    font-size: 0.625rem !important;
    height: 20px !important;
  }
}
</style>

