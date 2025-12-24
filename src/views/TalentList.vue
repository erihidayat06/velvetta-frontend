<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">Our Talents</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Discover our exceptional selection of premium talent</p>
    </div>
    
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="d-block mx-auto my-12"
    ></v-progress-circular>
    
    <v-row v-else class="ga-0 ga-md-4">
      <v-col
        v-for="talent in talents"
        :key="talent.id"
        cols="6"
        sm="6"
        md="3"
        lg="3"
      >
        <v-card
          class="talent-list-card cursor-pointer"
          @click="$router.push(`/talent/${talent.id}`)"
        >
          <v-img
            :src="getImageUrl(talent.image)"
            height="420"
            cover
            class="talent-list-image"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
            <div class="talent-list-overlay">
              <div class="talent-list-info">
                <h3
                  class="text-h6 font-weight-bold"
                  :class="{ 'mb-2': !$vuetify.display.xs }"
                >
                  {{ talent.name }}
                </h3>
                <v-chip size="small" class="talent-chip">{{ talent.category }}</v-chip>
              </div>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { talentService } from '@/services/talentService'
import { getImageUrl } from '@/utils/imageUrl'

const talents = ref([])
const loading = ref(true)

const loadTalents = async () => {
  try {
    const response = await talentService.getAll()
    if (response.success) {
      talents.value = (response.data || []).map(talent => ({
        ...talent,
        category: talent.level || talent.category,
        image: talent.image || (talent.images && talent.images.length > 0 ? talent.images[0] : null)
      }))
    }
  } catch (error) {
    console.error('Failed to load talents:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTalents()
})
</script>

<style scoped>
.talent-list-card {
  overflow: hidden;
  border-radius: 20px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.talent-list-card:hover {
  transform: translateY(-8px);
}

.talent-list-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.talent-list-card:hover .talent-list-image {
  transform: scale(1.08);
}

.talent-list-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%);
  padding: 24px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

/* Show overlay by default on mobile */
@media (max-width: 959px) {
  .talent-list-overlay {
    transform: translateY(0);
    padding: 10px;
  }
}

/* Hide on desktop, show on hover */
@media (min-width: 960px) {
  .talent-list-card:hover .talent-list-overlay {
    transform: translateY(0);
  }
}

.talent-list-info {
  color: white;
}

.talent-chip {
  background: rgba(139, 92, 246, 0.9) !important;
  color: white !important;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 600px) {
  .talent-list-card {
    border-radius: 16px !important;
  }
  
  .talent-list-image {
    height: 250px !important;
  }
  
  .talent-list-info h3 {
    font-size: 0.875rem !important;
  }
  
  .talent-chip {
    font-size: 0.625rem !important;
    height: 20px !important;
  }
}
</style>
