<script setup>
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const auth = useAuthStore()
const topic = ref(null)
const posts = ref([])
const error = ref('')
const success = ref('')
const loading = ref(true)
const submitting = ref(false)
const form = reactive({ body: '', reason: '' })

onMounted(async () => {
  try {
    const response = await apiRequest(`/forum/topics/${encodeURIComponent(route.params.id)}`)
    topic.value = response.data.topic
    posts.value = response.data.posts.data
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
})

async function submitReply() {
  submitting.value = true
  error.value = ''
  success.value = ''
  try {
    await apiRequest(`/forum/topics/${encodeURIComponent(route.params.id)}/posts`, {
      method: 'POST',
      body: { body: form.body },
    })
    form.body = ''
    success.value = 'Your reply was submitted for moderation.'
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}

async function reportTopic() {
  submitting.value = true
  error.value = ''
  success.value = ''
  try {
    await apiRequest(`/forum/topics/${encodeURIComponent(route.params.id)}/reports`, {
      method: 'POST',
      body: { reason: form.reason },
    })
    form.reason = ''
    success.value = 'Thank you. The report was sent to a moderator.'
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
  <PageBanner v-if="topic" :title="topic.title" :breadcrumb="topic.category?.name || 'Forum'" />
  <section class="bg-paper">
    <div class="mx-auto max-w-4xl px-5 py-12 md:py-16">
      <RouterLink class="text-sm font-bold text-brand hover:text-brand-dark" to="/forum">← Forum discussions</RouterLink>
      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-if="success" class="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">{{ success }}</p>
      <p v-if="loading" class="mt-8 text-muted" role="status">Loading discussion…</p>

      <template v-if="topic">
        <p class="mt-10 text-xs font-bold uppercase tracking-widest text-brand">{{ topic.category?.name }}</p>
        <h2 class="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{{ topic.title }}</h2>
        <p class="mt-4 text-sm text-muted">Started by {{ topic.user?.name }} · {{ new Date(topic.created_at).toLocaleDateString() }}</p>
        <div class="mt-8 whitespace-pre-line border-b border-line pb-8 text-lg leading-8 text-ink">{{ topic.body }}</div>

        <section class="mt-10" aria-labelledby="replies-heading">
          <h2 id="replies-heading" class="text-2xl font-semibold text-ink">Replies</h2>
          <div v-if="posts.length" class="mt-5 divide-y divide-line border-y border-line">
            <article v-for="(post, index) in posts" :key="`${post.created_at}-${index}`" class="py-5">
              <p class="whitespace-pre-line leading-7 text-ink">{{ post.body }}</p>
              <p class="mt-3 text-xs text-muted">{{ post.user?.name }} · {{ new Date(post.created_at).toLocaleDateString() }}</p>
            </article>
          </div>
          <p v-else class="mt-4 text-muted">No replies yet.</p>
        </section>

        <form v-if="auth.isAuthenticated" class="mt-10 grid gap-4 rounded-2xl border border-line bg-paper p-6" @submit.prevent="submitReply">
          <h2 class="text-lg font-semibold text-ink">Add a reply</h2>
          <textarea v-model="form.body" class="min-h-32 rounded-xl border border-line bg-white px-4 py-3" required minlength="2" maxlength="10000" aria-label="Your reply"></textarea>
          <p class="text-xs leading-5 text-muted">Replies are reviewed by a moderator before they appear publicly.</p>
          <button class="w-fit rounded-full bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="submitting">
            {{ submitting ? 'Submitting…' : 'Submit reply' }}
          </button>
        </form>
        <RouterLink v-else class="mt-8 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark" to="/login">Sign in to reply</RouterLink>

        <form v-if="auth.isAuthenticated" class="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row" @submit.prevent="reportTopic">
          <input v-model="form.reason" class="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm" required minlength="10" maxlength="2000" placeholder="Why should a moderator review this topic?" aria-label="Report reason" />
          <button class="button-danger rounded-full border border-line px-5 py-3 text-sm font-bold text-ink hover:border-red-300 hover:text-red-700 disabled:opacity-60" type="submit" :disabled="submitting">Report topic</button>
        </form>
      </template>
    </div>
  </section>
  </div>
</template>
