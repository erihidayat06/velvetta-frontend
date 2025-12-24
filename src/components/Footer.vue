<template>
  <v-footer class="footer-premium mt-16">
    <v-container>
      <v-row class="py-8">
        <v-col cols="12" md="4" class="pa-6">
          <div class="text-h5 font-weight-bold mb-4 text-premium">Velvetta</div>
          <p class="text-body-1" style="color: rgba(255, 255, 255, 0.7); line-height: 1.8;">
            Premium talent platform connecting clients with exceptional talent.
            Experience excellence in every interaction.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="pa-6">
          <div class="text-h6 font-weight-bold mb-4" style="color: rgba(255, 255, 255, 0.9);">About Us</div>
          <p class="text-body-1" style="color: rgba(255, 255, 255, 0.7); line-height: 1.8;">
            We are dedicated to providing the highest quality talent services
            with professionalism, discretion, and excellence.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="pa-6 text-center">
          <v-img
            :src="aboutUsImage"
            max-width="200"
            height="150"
            class="mx-auto mb-4 footer-image"
            alt="About Us"
            cover
          ></v-img>
        </v-col>
      </v-row>
      <v-divider class="footer-divider"></v-divider>
      <div class="text-center text-body-2 py-4" style="color: rgba(255, 255, 255, 0.5);">
        &copy; {{ new Date().getFullYear() }} Velvetta. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
const aboutUsImage = 'https://via.placeholder.com/200x150/8B5CF6/FFFFFF?text=Velvetta'
</script>

<style scoped>
.footer-premium {
  padding: 0 !important;
}

.footer-image {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.footer-image:hover {
  transform: scale(1.05);
  border-color: rgba(139, 92, 246, 0.4);
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1) !important;
  margin: 0 !important;
}
</style>

