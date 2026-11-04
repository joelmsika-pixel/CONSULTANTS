<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'

const route = useRoute()
const article = ref(null)
const error = ref('')
const loading = ref(true)

async function loadArticle() {
  loading.value = true
  error.value = ''
  try {
    const response = await apiRequest(`/news/${encodeURIComponent(route.params.slug)}`)
    article.value = response.data
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}

onMounted(loadArticle)
watch(() => route.params.slug, loadArticle)
</script>

<template>
  <div>
  <PageBanner title="News & Publications" breadcrumb="News & Publications" />
  <article class="bg-white">
    <div class="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <RouterLink class="text-sm font-bold text-brand hover:text-brand-dark" to="/news">← All insights</RouterLink>
      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-else-if="loading" class="mt-8 text-muted" role="status">Loading article…</p>
      <template v-else-if="article">
        <time v-if="article.published_at" class="mt-10 block text-xs font-bold uppercase tracking-widest text-brand">{{ new Date(article.published_at).toLocaleDateString() }}</time>
        <h2 class="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{{ article.title }}</h2>
        <p v-if="article.excerpt" class="mt-6 border-b border-line pb-8 text-xl leading-8 text-muted">{{ article.excerpt }}</p>
        <div class="mt-8 whitespace-pre-line text-base leading-8 text-ink">{{ article.body }}</div>
      </template>
    </div>
  </article>
  </div>
</template>
