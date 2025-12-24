<template>
  <v-container class="px-4 px-md-8 py-12">
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-btn
          class="mb-6 btn-ghost"
          variant="text"
          @click="$router.back()"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Back
        </v-btn>

        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="d-block mx-auto my-12"
        ></v-progress-circular>
        
        <v-card v-else class="premium-card">
          <v-img
            v-if="newsItem.image"
            :src="newsItem.image"
            height="450"
            cover
            class="news-detail-image"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>
          
          <v-card-text class="pa-8">
            <div class="text-caption mb-4" style="color: rgba(255, 255, 255, 0.5);">
              {{ newsItem.date }}
            </div>
            <h1 class="text-h3 font-weight-bold mb-6 text-premium">
              {{ newsItem.title }}
            </h1>
            
            <v-divider class="my-6" style="border-color: rgba(255, 255, 255, 0.1);"></v-divider>
            
            <div 
              class="news-content" 
              v-html="newsItem.fullContent || newsItem.content"
              style="color: rgba(255, 255, 255, 0.8); line-height: 1.9;"
            ></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { blogService } from '@/services/blogService'
import { getImageUrl } from '@/utils/imageUrl'

const route = useRoute()
const blogId = parseInt(route.params.id)

const newsItem = ref({
  title: '',
  date: '',
  image: '',
  content: '',
  fullContent: ''
})
const loading = ref(true)

const loadBlog = async () => {
  try {
    const response = await blogService.getById(blogId)
    if (response.success) {
      const blog = response.data
      newsItem.value = {
        title: blog.title,
        date: blog.date,
        image: blog.thumbnail ? getImageUrl(blog.thumbnail) : null,
        content: blog.description || '',
        fullContent: blog.content || ''
      }
    }
  } catch (error) {
    console.error('Failed to load blog:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBlog()
})
</script>

<style scoped>
.news-detail-image {
  border-radius: 24px 24px 0 0 !important;
}

.news-content {
  max-width: 800px;
}
</style>
