<script setup>
import { onMounted, ref } from 'vue'
import { apiRequest } from '../services/api'

const pendingTopics = ref([])
const pendingPosts = ref([])
const reports = ref([])
const error = ref('')
const success = ref('')
const loading = ref(true)
const updating = ref(null)

async function loadQueue() {
  loading.value = true
  error.value = ''
  try {
    const [queueResponse, reportResponse] = await Promise.all([
      apiRequest('/admin/forum/pending'),
      apiRequest('/admin/forum/reports'),
    ])
    pendingTopics.value = queueResponse.data.topics.data
    pendingPosts.value = queueResponse.data.posts.data
    reports.value = reportResponse.data.data
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}

async function moderate(path, id, status) {
  updating.value = `${path}-${id}`
  error.value = ''
  success.value = ''
  try {
    await apiRequest(`/admin/forum/${path}/${id}`, { method: 'PATCH', body: { status } })
    success.value = 'Moderation decision saved.'
    await loadQueue()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    updating.value = null
  }
}

onMounted(loadQueue)
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-5 py-16 md:py-24 lg:px-8">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Staff area</p>
      <h1 class="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Forum moderation</h1>
      <p class="mt-4 max-w-2xl leading-7 text-muted">Review pending posts and member reports. Every decision is authorized and recorded by the API.</p>
      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-if="success" class="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">{{ success }}</p>
      <p v-if="loading" class="mt-8 text-muted" role="status">Loading moderation queue…</p>

      <template v-else>
        <section class="mt-9" aria-labelledby="topics-heading">
          <h2 id="topics-heading" class="text-2xl font-semibold text-ink">Pending topics</h2>
          <div v-if="pendingTopics.length" class="mt-4 space-y-3">
            <article v-for="topic in pendingTopics" :key="topic.id" class="rounded-2xl border border-line bg-paper p-5">
              <p class="text-xs font-semibold text-brand">{{ topic.category?.name }} · {{ topic.user?.name }}</p>
              <h3 class="mt-2 text-lg font-semibold text-ink">{{ topic.title }}</h3>
              <p class="mt-3 whitespace-pre-line leading-7 text-muted">{{ topic.body }}</p>
              <div class="mt-5 flex gap-3">
                <button class="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white disabled:opacity-60" type="button" :disabled="updating === `topics-${topic.id}`" @click="moderate('topics', topic.id, 'published')">Publish</button>
                <button class="rounded-full border border-line px-4 py-2 text-xs font-bold text-ink disabled:opacity-60" type="button" :disabled="updating === `topics-${topic.id}`" @click="moderate('topics', topic.id, 'hidden')">Hide</button>
              </div>
            </article>
          </div>
          <p v-else class="mt-3 text-sm text-muted">No pending topics.</p>
        </section>

        <section class="mt-10" aria-labelledby="posts-heading">
          <h2 id="posts-heading" class="text-2xl font-semibold text-ink">Pending replies</h2>
          <div v-if="pendingPosts.length" class="mt-4 space-y-3">
            <article v-for="post in pendingPosts" :key="post.id" class="rounded-2xl border border-line bg-paper p-5">
              <p class="text-xs font-semibold text-brand">{{ post.topic?.title }} · {{ post.user?.name }}</p>
              <p class="mt-3 whitespace-pre-line leading-7 text-ink">{{ post.body }}</p>
              <div class="mt-5 flex gap-3">
                <button class="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white disabled:opacity-60" type="button" :disabled="updating === `posts-${post.id}`" @click="moderate('posts', post.id, 'published')">Publish</button>
                <button class="rounded-full border border-line px-4 py-2 text-xs font-bold text-ink disabled:opacity-60" type="button" :disabled="updating === `posts-${post.id}`" @click="moderate('posts', post.id, 'hidden')">Hide</button>
              </div>
            </article>
          </div>
          <p v-else class="mt-3 text-sm text-muted">No pending replies.</p>
        </section>

        <section class="mt-10" aria-labelledby="reports-heading">
          <h2 id="reports-heading" class="text-2xl font-semibold text-ink">Open reports</h2>
          <div v-if="reports.length" class="mt-4 space-y-3">
            <article v-for="report in reports" :key="report.id" class="rounded-2xl border border-line p-5">
              <p class="text-xs font-semibold text-brand">Reported by {{ report.reporter?.name }}</p>
              <p class="mt-2 text-sm leading-6 text-ink">{{ report.reason }}</p>
              <p v-if="report.topic" class="mt-2 text-sm text-muted">Topic: {{ report.topic.title }}</p>
              <div class="mt-4 flex gap-3">
                <button class="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white disabled:opacity-60" type="button" :disabled="updating === `reports-${report.id}`" @click="moderate('reports', report.id, 'reviewed')">Mark reviewed</button>
                <button class="rounded-full border border-line px-4 py-2 text-xs font-bold text-ink disabled:opacity-60" type="button" :disabled="updating === `reports-${report.id}`" @click="moderate('reports', report.id, 'dismissed')">Dismiss</button>
              </div>
            </article>
          </div>
          <p v-else class="mt-3 text-sm text-muted">No open reports.</p>
        </section>
      </template>
    </div>
  </section>
</template>
