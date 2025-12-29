<template>
  <v-app-bar
    elevation="0"
    app
    class="navbar-premium"
  >
  
    <v-container class="d-flex align-center navbar-container" fluid>
      <v-app-bar-title class="navbar-logo-title font-weight-bold pa-0 pt-1">
        <router-link to="/" class="navbar-logo">
          <img :src="logoUrl" alt="Velvetta" class="navbar-logo-img" />
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

     <!-- Desktop Menu -->
<div class="d-none d-md-flex align-center ga-2">
  <v-btn
    v-for="item in menuItems"
    :key="item.name"
    :to="item.path"
    variant="text"
    class="navbar-link"
    size="default"
  >
    {{ item.name }}
  </v-btn>

  <!-- AUTH -->
  <v-btn
    v-if="!isAuthenticated"
    variant="text"
    class="navbar-link"
    size="default"
    @click="showLoginModal = true"
  >
    Login
  </v-btn>

  <!-- USER DROPDOWN -->
  <v-menu
    v-else
    location="bottom end"
    offset="8"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        class="navbar-link d-flex align-center"
      >
        <v-icon start>mdi-account-circle</v-icon>
        Account
        <v-icon end size="18">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list min-width="180">
      <v-list-item to="/user">
        <v-list-item-title>User Profile</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item @click="handleLogout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</div>

      <!-- Mobile Burger Menu -->
      <v-btn
        class="d-md-none"
        icon
        variant="text"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
 <v-navigation-drawer
  v-model="drawer"
  temporary
  location="right"
  touchless
  class="mobile-drawer"
>
  <v-list class="mobile-menu-list">
    <v-list-item
      v-for="item in menuItems"
      :key="item.name"
      :to="item.path"
      @click="drawer = false"
    >
      <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item>

    <v-divider class="my-2"></v-divider>

    <!-- USER PROFILE (MOBILE) -->
    <v-list-item
      v-if="isAuthenticated"
      to="/user"
      @click="drawer = false"
    >
      <v-list-item-title>User Profile</v-list-item-title>
    </v-list-item>

   

    <!-- AUTH -->
    <v-list-item
      v-if="!isAuthenticated"
      @click="showLoginModal = true; drawer = false"
    >
      <v-list-item-title>Login</v-list-item-title>
    </v-list-item>

    <v-list-item
      v-else
      @click="handleLogout(); drawer = false"
    >
      <v-list-item-title>Logout</v-list-item-title>
    </v-list-item>
  </v-list>
</v-navigation-drawer>


  <!-- Login Modal -->
  <LoginModal
    v-model="showLoginModal"
    @login="handleLogin"
    @register="handleRegister"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import LoginModal from '@/components/LoginModal.vue'
import logoUrl from '@/assets/velvetta-logo.svg'

/* =====================
   ROUTER
===================== */
const router = useRouter()

/* =====================
   STATE
===================== */
const drawer = ref(false)
const showLoginModal = ref(false)

const menuItems = [
  { name: 'Talent', path: '/talent' },
  { name: 'Product', path: '/product' },
  { name: 'Casting', path: '/casting' },
  { name: 'Contact us', path: '/contact' },
]

const token = ref(localStorage.getItem('token'))

/* =====================
   COMPUTED
===================== */
const isAuthenticated = computed(() => {
  return !!token.value
})

/* =====================
   AUTH HANDLERS
===================== */
const handleLogin = () => {
  token.value = localStorage.getItem('token')
  showLoginModal.value = false
}

const handleRegister = () => {
  token.value = localStorage.getItem('token')
  showLoginModal.value = false
}

const handleLogout = () => {
  // Clear auth data
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  // Update reactive state
  token.value = null

  // Optional: sync with other components / tabs
  window.dispatchEvent(new Event('storage'))

  // Close mobile drawer if open
  drawer.value = false

  // 🔥 Redirect ke halaman utama
  router.replace('/')
}

/* =====================
   STORAGE LISTENER
===================== */
onMounted(() => {
  const updateToken = () => {
    token.value = localStorage.getItem('token')
  }

  // Listen for cross-tab auth changes
  window.addEventListener('storage', updateToken)

  // Initial sync
  updateToken()

  // Cleanup
  return () => {
    window.removeEventListener('storage', updateToken)
  }
})
</script>


<style scoped>
.navbar-premium {
  padding: 0 !important;
  min-height: 72px !important;
  display: flex;
  justify-content: center;
}

@media (min-width: 960px) {
  .navbar-premium {
    min-height: 92px !important; /* 72px + 20px */
  }
}

.navbar-container {
  padding-left: 165px !important;
  padding-right: 165px !important;
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
}

@media (max-width: 1279px) {
  .navbar-container {
    padding-left: 32px !important;
    padding-right: 32px !important;
  }
}

@media (max-width: 600px) {
  .navbar-container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}

.navbar-logo-title {
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
}

.navbar-logo {
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex !important;
  align-items: center !important;
  height: 100% !important;
}

.navbar-logo-img {
  height: 40px !important; /* Default mobile size */
  width: auto !important;
  display: block !important;
  object-fit: contain !important;
}

@media (min-width: 960px) {
  .navbar-logo-img {
    height: 60px !important; /* Larger desktop size */
  }
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.navbar-link {
  font-family: 'Nunito Sans', sans-serif !important;
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
  padding: 8px 16px !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  font-size: 1rem !important; /* Default mobile size */
  height: 50px !important;
}

@media (min-width: 960px) {
  .navbar-link {
    font-size: 1.125rem !important; /* Larger desktop size (18px) */
    padding: 0px 20px !important; /* More padding for larger text */
  }
}

.navbar-link:hover {
  color: var(--color-gold) !important;
  background: rgba(39, 6, 55, 0.1) !important;
}

.navbar-link.v-btn--active {
  color: var(--color-gold) !important;
  background: rgba(39, 6, 55, 0.15) !important;
}

.premium-menu {
  background: var(--color-secondary) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  padding: 8px !important;
  margin-top: 8px !important;
}

.premium-menu-item {
  border-radius: 12px !important;
  margin-bottom: 4px !important;
  transition: all 0.2s ease !important;
}

.premium-menu-item:hover {
  background: rgba(39, 6, 55, 0.15) !important;
}

.mobile-drawer {
  background: var(--color-secondary) !important;
  backdrop-filter: blur(20px) !important;
  z-index: 2000 !important;
}

.mobile-menu-list {
  background: transparent !important;
  padding: 16px !important;
}

.mobile-menu-list .v-list-item {
  border-radius: 12px !important;
  margin-bottom: 8px !important;
  color: rgba(255, 255, 255, 0.8) !important;
  transition: all 0.2s ease !important;
}

.mobile-menu-list .v-list-item:hover,
.mobile-menu-list .v-list-item--active {
  background: rgba(39, 6, 55, 0.15) !important;
  color: var(--color-gold) !important;
}

.mobile-menu-list .v-list-item-title {
  font-family: 'Nunito Sans', sans-serif !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
}
</style>

