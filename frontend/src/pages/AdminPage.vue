<script setup>
import { onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { apiRequest } from '../services/api'

const consultations = ref([])
const messages = ref([])
const statuses = reactive({})
const messageStatuses = reactive({})
const error = ref('')
const success = ref('')
const loading = ref(true)
const updating = ref(null)
const statusOptions = ['new', 'reviewing', 'contacted', 'closed']

async function loadConsultations() {
  loading.value = true
  error.value = ''
  try {
    const [consultationResponse, messageResponse] = await Promise.all([
      apiRequest('/admin/consultations?per_page=50'),
      apiRequest('/admin/contact-messages?per_page=50'),
    ])
    consultations.value = consultationResponse.data.data
    messages.value = messageResponse.data.data
    for (const consultation of consultations.value) {
      statuses[consultation.id] = consultation.status
    }
    for (const message of messages.value) {
      messageStatuses[message.id] = message.status
    }
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}

async function updateStatus(consultation) {
  updating.value = consultation.id
  error.value = ''
  success.value = ''
  try {
    await apiRequest(`/admin/consultations/${consultation.id}`, {
      method: 'PATCH',
      body: { status: statuses[consultation.id] },
    })
    success.value = `Request ${consultation.reference} updated.`
    await loadConsultations()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    updating.value = null
  }
}

async function updateMessageStatus(message) {
  updating.value = `message-${message.id}`
  error.value = ''
  success.value = ''
  try {
    await apiRequest(`/admin/contact-messages/${message.id}`, {
      method: 'PATCH',
      body: { status: messageStatuses[message.id] },
    })
    success.value = `Message ${message.reference} updated.`
    await loadConsultations()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    updating.value = null
  }
}

onMounted(loadConsultations)
</script>

<template>
  <section class="bg-paper">
    <div class="mx-auto max-w-7xl px-5 py-12 md:py-16 lg:px-8">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Staff area</p>
      <h1 class="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">Dashboard</h1>
      <p class="mt-4 max-w-2xl leading-7 text-muted">Review submitted inquiries and keep their workflow status up to date. Access is enforced by Laravel policies.</p>
      <div class="mt-6 flex flex-wrap gap-4 text-sm font-bold text-brand">
        <RouterLink to="/admin/content">Manage website content →</RouterLink>
        <RouterLink to="/admin/forum">Review forum activity →</RouterLink>
      </div>

      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-if="success" class="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">{{ success }}</p>
      <p v-if="loading" class="mt-8 text-muted" role="status">Loading requests…</p>
      <div v-if="!loading" class="mt-8 grid gap-4 sm:grid-cols-3">
        <article class="content-card p-5">
          <p class="text-xs font-bold uppercase tracking-wider text-muted">Consultation requests</p>
          <p class="mt-3 text-3xl font-bold text-ink">{{ consultations.length }}</p>
          <p class="mt-1 text-xs text-muted">All submitted requests</p>
        </article>
        <article class="content-card p-5">
          <p class="text-xs font-bold uppercase tracking-wider text-muted">New requests</p>
          <p class="mt-3 text-3xl font-bold text-brand">{{ consultations.filter((item) => item.status === 'new').length }}</p>
          <p class="mt-1 text-xs text-muted">Awaiting first review</p>
        </article>
        <article class="content-card p-5">
          <p class="text-xs font-bold uppercase tracking-wider text-muted">Contact messages</p>
          <p class="mt-3 text-3xl font-bold text-ink">{{ messages.length }}</p>
          <p class="mt-1 text-xs text-muted">All submitted messages</p>
        </article>
      </div>
      <section v-if="!loading" aria-labelledby="consultations-heading">
        <h2 id="consultations-heading" class="mt-8 text-2xl font-semibold text-ink">Consultation requests</h2>
        <div v-if="consultations.length" class="mt-4 space-y-4">
        <article v-for="consultation in consultations" :key="consultation.id" class="content-card p-6">
          <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p class="font-mono text-xs font-semibold text-brand">{{ consultation.reference }}</p>
              <h2 class="mt-2 text-lg font-semibold text-ink">{{ consultation.first_name }} {{ consultation.last_name }}</h2>
              <a class="mt-1 inline-block text-sm text-brand hover:underline" :href="`mailto:${encodeURIComponent(consultation.email)}`">{{ consultation.email }}</a>
              <p v-if="consultation.phone" class="mt-1 text-sm text-muted">{{ consultation.phone }}</p>
            </div>
            <time class="text-xs text-muted">{{ new Date(consultation.created_at).toLocaleString() }}</time>
          </div>
          <p class="mt-5 whitespace-pre-line leading-7 text-ink">{{ consultation.message }}</p>
          <p v-if="consultation.services?.length" class="mt-4 text-xs text-muted">Services: {{ consultation.services.map((service) => service.name).join(', ') }}</p>
          <form class="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4" @submit.prevent="updateStatus(consultation)">
            <label class="sr-only" :for="`status-${consultation.id}`">Request status</label>
            <select :id="`status-${consultation.id}`" v-model="statuses[consultation.id]" class="rounded-lg border border-line bg-white px-3 py-2 text-sm">
              <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
            </select>
            <button class="rounded-md bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="updating === consultation.id || statuses[consultation.id] === consultation.status">
              {{ updating === consultation.id ? 'Saving…' : 'Update status' }}
            </button>
          </form>
        </article>
        </div>
        <p v-else class="mt-4 rounded-2xl border border-dashed border-line bg-paper p-8 text-muted">There are no consultation requests yet.</p>
      </section>

      <section v-if="!loading" class="mt-12" aria-labelledby="messages-heading">
        <h2 id="messages-heading" class="text-2xl font-semibold text-ink">Contact messages</h2>
        <div v-if="messages.length" class="mt-4 space-y-4">
          <article v-for="message in messages" :key="message.id" class="content-card p-6">
            <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p class="font-mono text-xs font-semibold text-brand">{{ message.reference }}</p>
                <h3 class="mt-2 text-lg font-semibold text-ink">{{ message.subject }}</h3>
                <p class="mt-2 text-sm text-muted">{{ message.name }} · <a class="text-brand hover:underline" :href="`mailto:${encodeURIComponent(message.email)}`">{{ message.email }}</a></p>
              </div>
              <time class="text-xs text-muted">{{ new Date(message.created_at).toLocaleString() }}</time>
            </div>
            <p class="mt-5 whitespace-pre-line leading-7 text-ink">{{ message.message }}</p>
            <form class="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4" @submit.prevent="updateMessageStatus(message)">
              <label class="sr-only" :for="`message-status-${message.id}`">Message status</label>
              <select :id="`message-status-${message.id}`" v-model="messageStatuses[message.id]" class="rounded-lg border border-line bg-white px-3 py-2 text-sm">
                <option v-for="status in ['new', 'reviewing', 'responded', 'closed']" :key="status" :value="status">{{ status }}</option>
              </select>
              <button class="rounded-md bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="updating === `message-${message.id}` || messageStatuses[message.id] === message.status">
                {{ updating === `message-${message.id}` ? 'Saving…' : 'Update status' }}
              </button>
            </form>
          </article>
        </div>
        <p v-else class="mt-4 rounded-2xl border border-dashed border-line bg-paper p-8 text-muted">There are no contact messages yet.</p>
      </section>
    </div>
  </section>
</template>
