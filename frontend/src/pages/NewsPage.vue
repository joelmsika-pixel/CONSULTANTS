<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'

const articles = ref([])
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await apiRequest('/news')
    articles.value = response.data.data
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
  <PageBanner title="News & Publications" breadcrumb="News & Publications" subtitle="Updates, research and publications from CLM Consultants." />
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-5 py-12 md:py-16 lg:px-8">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Latest updates</p>
      <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">News &amp; Publications</h2>
      <p class="mt-4 max-w-2xl leading-7 text-muted">Perspectives, news, and learning from our work.</p>

      <p v-if="error" class="mt-10 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-else-if="loading" class="mt-10 text-muted" role="status">Loading articles…</p>
      <div v-else-if="articles.length" class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="article in articles" :key="article.slug" class="content-card p-6">
          <time v-if="article.published_at" class="inline-flex rounded bg-brand-soft px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">{{ new Date(article.published_at).toLocaleDateString() }}</time>
          <h3 class="mt-4 text-lg font-bold leading-snug text-ink">
            <RouterLink class="hover:text-brand" :to="{ name: 'news-detail', params: { slug: article.slug } }">{{ article.title }}</RouterLink>
          </h3>
          <p class="mt-3 text-sm leading-6 text-muted">{{ article.excerpt }}</p>
          <RouterLink class="mt-5 inline-flex text-xs font-bold text-brand" :to="{ name: 'news-detail', params: { slug: article.slug } }">Read more <span class="ml-2" aria-hidden="true">→</span></RouterLink>
        </article>
      </div>
      <p v-else class="mt-10 rounded-2xl border border-dashed border-line bg-paper p-8 leading-7 text-muted">
        New insights will be published here. Check back soon.
      </p>
    </div>
  </section>
  </div>
</template>
