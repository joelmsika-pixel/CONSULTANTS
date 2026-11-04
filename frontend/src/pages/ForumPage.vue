<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const topics = ref([])
const categories = ref([])
const error = ref('')
const success = ref('')
const loading = ref(true)
const submitting = ref(false)
const showTopicForm = ref(false)
const form = ref({ category_id: '', title: '', body: '' })

onMounted(async () => {
  try {
    const [topicResponse, categoryResponse] = await Promise.all([
      apiRequest('/forum/topics'),
      apiRequest('/forum/categories'),
    ])
    topics.value = topicResponse.data.data
    categories.value = categoryResponse.data
    if (categories.value.length) form.value.category_id = String(categories.value[0].id)
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
})

async function submitTopic() {
  error.value = ''
  success.value = ''
  submitting.value = true
  try {
    await apiRequest('/forum/topics', {
      method: 'POST',
      body: { ...form.value, category_id: Number(form.value.category_id) },
    })
    showTopicForm.value = false
    form.value.title = ''
    form.value.body = ''
    success.value = 'Your topic was submitted for moderation.'
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
  <PageBanner title="Discussion Forum" breadcrumb="Forum" subtitle="Connect · Share · Learn" />
  <section class="bg-paper">
    <div class="mx-auto max-w-7xl px-5 py-12 md:py-16 lg:px-8">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Community discussions</p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">Join the conversation</h2>
          <p class="mt-3 max-w-2xl leading-7 text-muted">A space for thoughtful questions and shared learning.</p>
        </div>
        <button
          v-if="auth.isAuthenticated"
          class="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white hover:bg-brand-dark"
          type="button"
          @click="showTopicForm = !showTopicForm"
        >
          {{ showTopicForm ? 'Close form' : 'Start a discussion' }}
        </button>
        <RouterLink
          v-else
          class="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white hover:bg-brand-dark"
          to="/login"
        >
          Sign in to participate
        </RouterLink>
      </div>

      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-if="success" class="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">{{ success }}</p>
      <p v-if="loading" class="mt-10 text-muted" role="status">Loading discussions…</p>

      <form v-if="showTopicForm" class="content-card mt-8 grid gap-4 p-6" @submit.prevent="submitTopic">
        <h2 class="text-xl font-semibold text-ink">Start a discussion</h2>
        <label class="flex flex-col gap-2 text-sm font-semibold text-ink">Category
          <select v-model="form.category_id" class="rounded-xl border border-line bg-white px-4 py-3" required>
            <option v-for="category in categories" :key="category.id" :value="String(category.id)">{{ category.name }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-ink">Title
          <input v-model="form.title" class="rounded-xl border border-line bg-white px-4 py-3" required minlength="8" maxlength="180" />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-ink">Discussion
          <textarea v-model="form.body" class="min-h-32 rounded-xl border border-line bg-white px-4 py-3" required minlength="20" maxlength="10000"></textarea>
        </label>
        <p class="text-xs leading-5 text-muted">New topics are reviewed by a moderator before they become public.</p>
        <button class="w-fit rounded-full bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="submitting || !categories.length">
          {{ submitting ? 'Submitting…' : 'Submit topic' }}
        </button>
      </form>

      <div v-if="!loading && topics.length" class="mt-8 space-y-3">
        <article v-for="topic in topics" :key="topic.id" class="content-card grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-brand">{{ topic.category?.name }}</p>
            <h2 class="mt-2 text-xl font-semibold text-ink">
              <RouterLink class="hover:text-brand" :to="{ name: 'forum-topic', params: { id: topic.id } }">{{ topic.title }}</RouterLink>
            </h2>
            <p class="mt-2 line-clamp-2 leading-7 text-muted">{{ topic.body }}</p>
            <p class="mt-3 text-xs text-muted">Started by {{ topic.user?.name }} · {{ new Date(topic.created_at).toLocaleDateString() }}</p>
          </div>
          <span class="text-sm text-muted">{{ topic.posts_count }} replies</span>
        </article>
      </div>
      <p v-if="!loading && !topics.length && !error" class="mt-8 rounded-xl border border-dashed border-line bg-white p-8 leading-7 text-muted">
        There are no published discussions yet. Members can start a conversation after signing in.
      </p>
    </div>
  </section>
  </div>
</template>
