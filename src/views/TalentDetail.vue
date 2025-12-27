<template>
  <v-container class="px-4 px-md-8 py-12">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="d-block mx-auto my-12"></v-progress-circular>

    <v-row v-else>
      <v-col cols="12" md="6">
        <v-carousel
          height="650"
          show-arrows="hover"
          hide-delimiters
          class="talent-carousel">
          <v-carousel-item
            v-for="(image, i) in talentImages"
            :key="i"
            :src="image"
            cover>
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  indeterminate
                  color="primary"></v-progress-circular>
              </div>
            </template>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" md="6">
        <div class="mb-6">
          <h1 class="text-h3 font-weight-bold mb-4 text-premium">
            {{ talent.name }}
          </h1>
          <v-chip size="large" class="talent-detail-chip">{{
            talent.category
          }}</v-chip>
        </div>

        <v-card class="premium-card mb-6">
          <v-card-title
            class="text-h6 font-weight-bold mb-4"
            style="color: rgba(255, 255, 255, 0.9)"
            >About</v-card-title
          >
          <v-card-text>
            <div
              v-if="talent.description"
              class="text-body-1 mb-6"
              style="color: rgba(255, 255, 255, 0.8); line-height: 1.8"
              v-html="talent.description"></div>

            <v-divider
              class="my-6"
              style="border-color: rgba(255, 255, 255, 0.1)"></v-divider>

            <div class="detail-item mb-4">
              <div class="detail-label">Age</div>
              <div class="detail-value">{{ talent.age }}</div>
            </div>
            <div class="detail-item mb-4">
              <div class="detail-label">Location</div>
              <div class="detail-value">{{ talent.location }}</div>
            </div>
            <div
              v-if="talent.languages && talent.languages.length > 0"
              class="detail-item mb-4">
              <div class="detail-label">Languages</div>
              <div class="detail-value">
                {{
                  Array.isArray(talent.languages)
                    ? talent.languages.join(", ")
                    : talent.languages
                }}
              </div>
            </div>
            <div
              v-if="talent.specialties && talent.specialties.length > 0"
              class="detail-item">
              <div class="detail-label">Specialties</div>
              <div class="detail-value">
                {{
                  Array.isArray(talent.specialties)
                    ? talent.specialties.join(", ")
                    : talent.specialties
                }}
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-btn
          block
          size="x-large"
          class="btn-premium mb-6"
          @click="openWhatsApp">
          <v-icon start size="24">mdi-whatsapp</v-icon>
          Order via WhatsApp
        </v-btn>
      </v-col>
    </v-row>

    <section class="mt-16">
      <FeaturedTalents
        v-if="featuredTalents.length > 0"
        :talents="featuredTalents"
        title="Featured Talents"
        subtitle="Discover our exceptional selection" />
    </section>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { talentService } from "@/services/talentService";
import { homeConfigService } from "@/services/homeConfigService";
import { getImageUrl } from "@/utils/imageUrl";
import FeaturedTalents from "@/components/FeaturedTalents.vue";

const route = useRoute();
const talentId = ref(parseInt(route.params.id));

const talent = ref({
  id: talentId.value,
  name: "",
  category: "",
  age: "",
  location: "",
  languages: [],
  specialties: [],
  description: "",
});

const talentImages = ref([]);
const featuredTalents = ref([]);
const loading = ref(true);

const loadTalent = async (id) => {
  loading.value = true;
  try {
    const response = await talentService.getById(id);
    if (response.success) {
      const data = response.data;
      talent.value = {
        id: data.id,
        name: data.name,
        category: data.level || data.category,
        age: data.age || "",
        location: data.location || "",
        languages: data.languages || [],
        specialties: data.specialties || [],
        description: data.description || "",
      };
      talentImages.value = (data.images || [])
        .map((img) => {
          const imagePath =
            typeof img === "string" ? img : img.image_url || img.url || img;
          return getImageUrl(imagePath);
        })
        .filter((url) => url);
    }

    // Load featured talents
    const configResponse = await homeConfigService.get();
    if (configResponse.success) {
      const config = configResponse.data;
      featuredTalents.value = (config.featuredTalents || []).map((t) => ({
        ...t,
        category: t.level || t.category,
        image: t.image ? getImageUrl(t.image) : null,
      }));
    }
  } catch (error) {
    console.error("Failed to load talent:", error);
  } finally {
    loading.value = false;
  }
};

// Load first
onMounted(() => {
  loadTalent(talentId.value);
});

// Watch route changes
watch(
  () => route.params.id,
  (newId) => {
    talentId.value = parseInt(newId);
    loadTalent(talentId.value);
  }
);

const openWhatsApp = () => {
  const phoneNumber = "1234567890";
  const message = encodeURIComponent(
    `Hello, I would like to order ${talent.value.name}.`
  );
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};
</script>

<style scoped>
.talent-carousel {
  border-radius: 24px !important;
  overflow: hidden;
}

.talent-detail-chip {
  background: var(--gradient-primary) !important;
  color: white !important;
  font-weight: 600;
  padding: 8px 20px !important;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.detail-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 600px) {
  .premium-card {
    padding: 20px 16px !important;
  }

  .detail-item {
    padding: 8px 0;
  }

  .detail-label {
    font-size: 0.75rem !important;
  }

  .detail-value {
    font-size: 0.875rem !important;
  }
}
</style>
