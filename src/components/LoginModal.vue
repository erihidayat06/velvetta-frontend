<template>
  <v-dialog v-model="dialog" max-width="480" class="login-dialog">
    <v-card class="login-card">
      <v-card-title class="login-header">
        <div class="d-flex align-center justify-space-between w-100">
          <h2 class="text-h5 font-weight-bold text-white">
            {{ isRegisterMode ? 'Create Account' : 'Login' }}
          </h2>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="closeModal"
            class="close-btn"
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <!-- Login Form -->
        <form v-if="!isRegisterMode" @submit.prevent="handleLogin">
          <v-text-field
            v-model="loginForm.email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="loginForm.password"
            label="Password"
            type="password"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-alert
            v-if="error && !isRegisterMode"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
            @click:close="error = ''"
          >
            {{ error }}
          </v-alert>

          <v-btn
            type="submit"
            block
            size="large"
            class="btn-premium mb-4"
            :loading="loading"
          >
            Login
          </v-btn>

          <div class="text-center">
            <span class="text-body-2" style="color: rgba(255, 255, 255, 0.6);">
              Don't have an account?
            </span>
            <v-btn
              variant="text"
              class="text-premium ml-2"
              @click="isRegisterMode = true"
            >
              Register
            </v-btn>
          </div>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister">
          <v-text-field
            v-model="registerForm.name"
            label="Full Name"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerForm.email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerForm.phone"
            label="Phone Number"
            type="tel"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerForm.password"
            label="Password"
            type="password"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="registerForm.confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-alert
            v-if="error && isRegisterMode"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
            @click:close="error = ''"
          >
            {{ error }}
          </v-alert>

          <v-btn
            type="submit"
            block
            size="large"
            class="btn-premium mb-4"
            :loading="loading"
          >
            Register
          </v-btn>

          <div class="text-center">
            <span class="text-body-2" style="color: rgba(255, 255, 255, 0.6);">
              Already have an account?
            </span>
            <v-btn
              variant="text"
              class="text-premium ml-2"
              @click="isRegisterMode = false"
            >
              Login
            </v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { authService } from '@/services/authService'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'login', 'register'])

const dialog = ref(props.modelValue)
const isRegisterMode = ref(false)
const loading = ref(false)
const error = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
  if (!newVal) {
    // Reset forms when modal closes
    isRegisterMode.value = false
    error.value = ''
    loginForm.value = { email: '', password: '' }
    registerForm.value = { name: '', email: '', phone: '', password: '', confirmPassword: '' }
  }
})

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal)
})

const closeModal = () => {
  dialog.value = false
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await authService.login(loginForm.value.email, loginForm.value.password)
    if (response.success) {
      // Store token and user data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'))
      emit('login', response.data.user)
      closeModal()
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const { confirmPassword, ...registerData } = registerForm.value
    const response = await authService.register(registerData)
    if (response.success) {
      // Store token and user data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'))
      emit('register', response.data.user)
      closeModal()
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-dialog :deep(.v-overlay__scrim) {
  background: rgba(0, 0, 0, 1) !important;
  opacity: 80% !important;
  backdrop-filter: blur(150px) saturate(250%) brightness(0.2);
  -webkit-backdrop-filter: blur(150px) saturate(250%) brightness(0.2);
}

.login-card {
  padding: 0 !important;
  overflow: hidden;
}

.login-header {
  background: var(--gradient-primary);
  padding: 24px !important;
  color: white;
}

.close-btn {
  color: white !important;
}

.login-card .v-card-text {
  background: rgba(20, 20, 20, 0.95) !important;
}

.login-card :deep(.v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
}

.login-card :deep(.v-field__input) {
  color: rgba(255, 255, 255, 0.9) !important;
}

.login-card :deep(.v-label) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.login-card :deep(.v-field--focused .v-label) {
  color: #8B5CF6 !important;
}
</style>

