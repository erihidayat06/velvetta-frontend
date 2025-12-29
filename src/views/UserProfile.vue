<template>
  <div class="profile-wrapper">

    <!-- TITLE -->
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold mb-4 text-premium">
        User Profile
      </h1>
      <p class="text-body-1" style="color: rgba(255, 255, 255, 0.6);">
        Your personal account overview
      </p>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center text-grey">
      Loading profile...
    </div>

    <!-- CARD -->
    <v-card
      v-else
      class="profile-card mx-auto"
      max-width="420"
    >
      <!-- HEADER -->
      <div class="profile-header text-center">
        <h2 class="mb-1">{{ user.name }}</h2>
        <p class=" opacity-80">
           {{ user.vvip ? "VVIP Member" : "Regular User" }}
          <span v-if="user.vvip" class="vvip-badge">VVIP</span>
        </p>
      </div>

      <!-- BODY -->
      <v-card-text>
        <v-list bg-color="transparent" density="compact">

          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item>
            <v-list-item-title>Phone</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.phone || "-" }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider class="my-2" />

          <v-list-item>
            <v-list-item-title>Role</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.role }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider class="my-2" />

        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authService } from "@/services/authService";

const user = ref({
  name: "",
  email: "",
  phone: "",
  role: "",
  vvip: false,
});

const loading = ref(true);

const loadProfile = async () => {
  try {
    const res = await authService.getProfile();
    // asumsi backend: { success: true, data: user }
    user.value = res.data;
  } catch (error) {
    console.error("Failed to load profile", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.profile-wrapper {
  margin-top: 70px;
  background: #0f0f0f;
}

/* === STYLE EXISTING === */

.profile-card {
  padding: 0 !important;
  overflow: hidden;
}

.profile-header {
  background: var(--gradient-primary);
  padding: 32px 24px !important;
  color: white;
}

.profile-card .v-card-text {
  background: rgba(20, 20, 20, 0.95) !important;
  color: rgba(255, 255, 255, 0.9);
}

.profile-card :deep(.v-list-item-title) {
  color: rgba(255, 255, 255, 0.7);
}

.profile-card :deep(.v-list-item-subtitle) {
  color: rgba(255, 255, 255, 0.9);
}

/* VVIP BADGE */
.vvip-badge {
  margin-left: 8px;
  padding: 2px 8px;
  
  border-radius: 999px;
  background: linear-gradient(135deg, #facc15, #f59e0b);
  color: #000;
  font-weight: 600;
}
</style>
