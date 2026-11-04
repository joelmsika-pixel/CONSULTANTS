<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import PageLoader from './components/PageLoader.vue'
import MainLayout from './layouts/MainLayout.vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const router = useRouter()
const isStarting = ref(true)

onMounted(async () => {
  const minimumDisplay = new Promise((resolve) => window.setTimeout(resolve, 1500))

  try {
    await Promise.all([
      router.isReady(),
      auth.refresh().catch((error) => {
        auth.error = error.message
      }),
      minimumDisplay,
    ])
  } finally {
    isStarting.value = false
  }
})
</script>

<template>
  <PageLoader v-if="isStarting" />
  <MainLayout v-else>
    <RouterView />
  </MainLayout>
</template>
