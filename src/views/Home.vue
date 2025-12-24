<template>
  <div class="home-page">
    <!-- Hero Carousel -->
    <section class="hero-section mb-16">
      <v-carousel
        v-if="carouselSlides.length > 0"
        cycle
        interval="5000"
        show-arrows="hover"
        hide-delimiters
        class="hero-carousel"
      >
        <v-carousel-item
          v-for="(slide, i) in carouselSlides"
          :key="i"
          :src="slide.src"
          cover
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
          <div class="d-flex fill-height align-center justify-center hero-overlay">
            <div v-if="slide.title || slide.subtitle" class="hero-content text-center">
              <h1 v-if="slide.title" class="text-h2 font-weight-bold mb-4 text-premium">{{ slide.title }}</h1>
              <p v-if="slide.subtitle" class="text-h5" style="color: rgba(255, 255, 255, 0.9);">{{ slide.subtitle }}</p>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </section>

    <v-container class="px-4 px-md-8">
      <!-- VIP and Mystery Talent Hero -->
      <section class="section-spacing">
        <v-row class="ga-3 ga-md-4">
          <v-col cols="12" sm="12" md="6">
            <v-card
              class="premium-hero-card gradient-card text-center cursor-pointer"
              @click="$router.push('/payment')"
            >
              <div class="pa-10">
                <div class="hero-icon-wrapper mb-6">
                  <v-icon size="96" color="white">mdi-crown</v-icon>
                </div>
                <h2 class="text-h3 font-weight-bold mb-4 text-white">VIP Talent</h2>
                <p class="text-h6 mb-6 text-white" style="opacity: 0.9;">Exclusive premium talent</p>
                <v-btn size="x-large" class="btn-premium" variant="flat">
                  EXPLORE VIP
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-card
              class="premium-hero-card soft-card text-center cursor-pointer"
              @click="$router.push('/mystery-talent')"
            >
              <div class="pa-10">
                <div class="hero-icon-wrapper mb-6">
                  <v-icon size="96" color="white">mdi-incognito</v-icon>
                </div>
                <h2 class="text-h3 font-weight-bold mb-4 text-white">Mystery Talent</h2>
                <p class="text-h6 mb-6 text-white" style="opacity: 0.9;">Exclusive premium talent</p>
                <v-btn size="x-large" class="btn-premium-white" variant="flat">
                  EXPLORE VIP
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Featured Talents -->
      <FeaturedTalents
        v-if="featuredTalents.length > 0"
        :talents="featuredTalents"
        title="Featured Talents"
        subtitle="Discover our exceptional selection"
      />

      <!-- News / Blogs Masonry -->
      <section v-if="newsItems.length > 0" class="section-spacing">
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold mb-4 text-premium">Latest News & Blogs</h2>
          <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Stay updated with our latest updates</p>
        </div>
        <v-row class="ga-0 ga-md-4">
          <v-col
            v-for="(news, i) in newsItems"
            :key="news.id || i"
            v-bind="getNewsCols(i)"
          >
            <v-card
              class="news-card cursor-pointer"
              @click="$router.push(`/news/${news.id}`)"
            >
              <v-img
                :src="news.image"
                height="280"
                cover
                class="news-image"
              >
                <div class="news-overlay">
                  <v-card-title class="news-title">{{ news.title }}</v-card-title>
                </div>
              </v-img>
              <v-card-text class="pa-4">
                <p class="text-body-2 mb-2" style="color: rgba(255, 255, 255, 0.8);">{{ news.excerpt }}</p>
                <small class="text-caption" style="color: rgba(255, 255, 255, 0.5);">{{ news.date }}</small>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import FeaturedTalents from '@/components/FeaturedTalents.vue'
import { homeConfigService } from '@/services/homeConfigService'
import { blogService } from '@/services/blogService'
import { getImageUrl } from '@/utils/imageUrl'

const { mobile } = useDisplay()

const carouselSlides = ref([])
const carouselData = ref(null) // Store raw carousel data
const featuredTalents = ref([])
const newsItems = ref([])
const loading = ref(true)

const loadHomeData = async () => {
  try {
    // Load home config (carousel + featured talents)
    const configResponse = await homeConfigService.get()
    if (configResponse.success) {
      const config = configResponse.data
      
      // Set featured talents
      featuredTalents.value = (config.featuredTalents || []).map(t => ({
        ...t,
        category: t.level || t.category,
        image: t.image ? getImageUrl(t.image) : null
      }))
      
      // Store carousel data for responsive updates
      carouselData.value = config
      
      // Set initial carousel slides
      updateCarouselSlides()
    }
    
    // Load blogs
    const blogsResponse = await blogService.getAll(4)
    if (blogsResponse.success) {
      newsItems.value = (blogsResponse.data || []).map(blog => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.description,
        image: blog.thumbnail ? getImageUrl(blog.thumbnail) : null,
        date: blog.date
      }))
    }
  } catch (error) {
    console.error('Failed to load home data:', error)
  } finally {
    loading.value = false
  }
}

const updateCarouselSlides = () => {
  if (!carouselData.value) return
  
  // Backend returns carouselSlides array with src and mobileSrc
  if (carouselData.value.carouselSlides && carouselData.value.carouselSlides.length > 0) {
    carouselSlides.value = carouselData.value.carouselSlides.map((slide) => ({
      src: mobile.value 
        ? (slide.mobileSrc ? getImageUrl(slide.mobileSrc) : getImageUrl(slide.src))
        : getImageUrl(slide.src),
      title: slide.title || '',
      subtitle: slide.subtitle || ''
    }))
  } else {
    // Fallback to desktop/mobile images if carouselSlides not available
    const desktopImages = carouselData.value.carouselDesktopImages || []
    const mobileImages = carouselData.value.carouselMobileImages || []
    const carouselImages = mobile.value 
      ? (mobileImages.length > 0 ? mobileImages : desktopImages)
      : (desktopImages.length > 0 ? desktopImages : mobileImages)
    
    carouselSlides.value = carouselImages.length > 0 
      ? carouselImages.map((img) => ({
          src: getImageUrl(img),
          title: '',
          subtitle: ''
        }))
      : [
          {
            src: 'https://via.placeholder.com/1200x600/8B5CF6/FFFFFF?text=Welcome+to+Velvetta',
            title: 'Welcome to Velvetta',
            subtitle: 'Premium Talent Platform'
          }
        ]
  }
}

// Watch for screen size changes to update carousel images
watch(() => mobile.value, () => {
  updateCarouselSlides()
})

const getNewsCols = (index) => {
  const patterns = [
    { cols: 12, sm: 6, md: 6 },
    { cols: 12, sm: 6, md: 6 },
    { cols: 12, sm: 6, md: 6 },
    { cols: 12, sm: 6, md: 6 }
  ]
  return patterns[index % patterns.length]
}

onMounted(() => {
  loadHomeData()
})
</script>

<style scoped>
.home-page {
  padding-bottom: 64px;
}

.hero-section {
  margin-top: -72px;
  margin-bottom: 0;
  height: 100vh;
}

.hero-carousel {
  border-radius: 0 !important;
  height: 100vh !important;
}

.hero-carousel :deep(.v-carousel__container) {
  height: 100vh !important;
}

.hero-carousel :deep(.v-carousel-item) {
  height: 100vh !important;
}

.hero-overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
}

.hero-content {
  padding: 48px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.premium-hero-card {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-hero-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.hero-icon-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.premium-hero-card:hover .hero-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.25);
}

/* btn-premium-white is now defined in global style.css */


.news-card {
  overflow: hidden;
  border-radius: 20px !important;
}

.news-image {
  position: relative;
}

.news-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  padding: 20px;
}

.news-title {
  color: white !important;
  font-weight: 600 !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 960px) {
  .hero-content {
    padding: 32px 24px;
  }
  
  .premium-hero-card {
    min-height: 350px;
  }
  
  .premium-hero-card .pa-10 {
    padding: 48px 32px !important;
  }
}

@media (max-width: 600px) {
  .premium-hero-card .pa-10 {
    padding: 32px 24px !important;
  }
  
  .hero-icon-wrapper {
    width: 80px !important;
    height: 80px !important;
  }
  
  .hero-icon-wrapper .v-icon {
    font-size: 48px !important;
  }
  
  .hero-content {
    padding: 24px 16px !important;
  }
  
  .hero-content h1 {
    font-size: 1.5rem !important;
  }
  
  .hero-content p {
    font-size: 1rem !important;
  }
}
</style>
