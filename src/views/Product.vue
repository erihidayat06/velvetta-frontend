<template>
  <v-container class="px-4 px-md-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">Products</h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">Premium toys and props for your needs</p>
    </div>
    
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="d-block mx-auto my-12"
    ></v-progress-circular>
    
    <v-row v-else class="ga-0 ga-md-4">
      <v-col
        v-for="product in toys"
        :key="product.id"
        cols="6"
        sm="6"
        md="3"
        lg="3"
      >
        <v-card class="product-card">
          <v-img
            :src="getImageUrl(product.image)"
            height="320"
            cover
            class="product-image"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>
          <v-card-text class="pa-4">
            <h3 class="text-h6 font-weight-bold mb-2" style="color: rgba(255, 255, 255, 0.9);">{{ product.name }}</h3>
            <div class="text-h6 font-weight-bold mb-3 text-premium">Rp {{ formatIDR(product.price) }}</div>
            <p class="text-body-2 mb-4" style="color: rgba(255, 255, 255, 0.7);">{{ product.description }}</p>
            <v-btn
              block
              size="large"
              class="btn-premium"
              @click="buyProduct(product)"
            >
              <v-icon start>mdi-whatsapp</v-icon>
              Buy via WhatsApp
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { productService } from '@/services/productService'
import { getImageUrl } from '@/utils/imageUrl'
import { formatIDR } from '@/utils/formatCurrency'

const toys = ref([])
const loading = ref(true)

const loadProducts = async () => {
  try {
    const response = await productService.getAll()
    if (response.success) {
      toys.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load products:', error)
  } finally {
    loading.value = false
  }
}

const buyProduct = (product) => {
  const phoneNumber = '1234567890' // Replace with actual admin WhatsApp number
  const formattedPrice = formatIDR(product.price)
  const message = encodeURIComponent(`Hello, I would like to purchase ${product.name} for Rp ${formattedPrice}.`)
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-card {
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-8px);
}

.product-image {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .product-image {
    height: 200px !important;
  }
  
  .product-card .v-card-text {
    padding: 16px !important;
  }
  
  .product-card h3 {
    font-size: 0.875rem !important;
  }
  
  .product-card .text-h6 {
    font-size: 1rem !important;
  }
  
  .product-card .text-body-2 {
    font-size: 0.75rem !important;
  }
  
  .btn-premium {
    font-size: 0.75rem !important;
    padding: 10px !important;
  }
}
</style>
