<script setup>
import { onMounted, reactive, ref } from 'vue'
import { apiRequest } from '../services/api'

const services = ref([])
const articles = ref([])
const faqs = ref([])
const activeTab = ref('services')
const error = ref('')
const success = ref('')
const submitting = ref(false)
const editing = reactive({ service: null, article: null, faq: null })
const serviceForm = reactive({ name: '', slug: '', summary: '', description: '', is_active: false, sort_order: 0 })
const articleForm = reactive({ title: '', slug: '', excerpt: '', body: '', status: 'draft', published_at: '' })
const faqForm = reactive({ question: '', answer: '', is_active: false, sort_order: 0 })

async function loadContent() {
  error.value = ''
  try {
    const [serviceResponse, newsResponse, faqResponse] = await Promise.all([
      apiRequest('/admin/services'),
      apiRequest('/admin/news'),
      apiRequest('/admin/faqs'),
    ])
    services.value = serviceResponse.data.data
    articles.value = newsResponse.data.data
    faqs.value = faqResponse.data.data
  } catch (requestError) {
    error.value = requestError.message
  }
}

function resetService() {
  editing.service = null
  Object.assign(serviceForm, { name: '', slug: '', summary: '', description: '', is_active: false, sort_order: 0 })
}

function editService(service) {
  editing.service = service.id
  Object.assign(serviceForm, service)
}

async function saveService() {
  submitting.value = true
  error.value = ''
  success.value = ''
  try {
    const editingId = editing.service
    await apiRequest(editingId ? `/admin/services/${editingId}` : '/admin/services', {
      method: editingId ? 'PATCH' : 'POST',
      body: { ...serviceForm },
    })
    success.value = editingId ? 'Service updated.' : 'Service created.'
    resetService()
    await loadContent()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}

function resetArticle() {
  editing.article = null
  Object.assign(articleForm, { title: '', slug: '', excerpt: '', body: '', status: 'draft', published_at: '' })
}

function editArticle(article) {
  editing.article = article.id
  const publishedAt = article.published_at ? new Date(article.published_at) : null
  if (publishedAt) publishedAt.setMinutes(publishedAt.getMinutes() - publishedAt.getTimezoneOffset())
  Object.assign(articleForm, {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || '',
    body: article.body,
    status: article.status,
    published_at: publishedAt ? publishedAt.toISOString().slice(0, 16) : '',
  })
}

async function saveArticle() {
  submitting.value = true
  error.value = ''
  success.value = ''
  try {
    const editingId = editing.article
    const body = {
      ...articleForm,
      published_at: articleForm.published_at ? new Date(articleForm.published_at).toISOString() : null,
    }
    await apiRequest(editingId ? `/admin/news/${editingId}` : '/admin/news', {
      method: editingId ? 'PATCH' : 'POST',
      body,
    })
    success.value = editingId ? 'Article updated.' : 'Article created.'
    resetArticle()
    await loadContent()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}

function resetFaq() {
  editing.faq = null
  Object.assign(faqForm, { question: '', answer: '', is_active: false, sort_order: 0 })
}

function editFaq(faq) {
  editing.faq = faq.id
  Object.assign(faqForm, faq)
}

async function saveFaq() {
  submitting.value = true
  error.value = ''
  success.value = ''
  try {
    const editingId = editing.faq
    await apiRequest(editingId ? `/admin/faqs/${editingId}` : '/admin/faqs', {
      method: editingId ? 'PATCH' : 'POST',
      body: { ...faqForm },
    })
    success.value = editingId ? 'FAQ updated.' : 'FAQ created.'
    resetFaq()
    await loadContent()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}

onMounted(loadContent)
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-5 py-16 md:py-24 lg:px-8">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Staff area</p>
      <h1 class="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Website content</h1>
      <p class="mt-4 max-w-2xl leading-7 text-muted">Manage the published information shown to visitors. Content is plain text and output is safely escaped in the website.</p>
      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <p v-if="success" class="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">{{ success }}</p>

      <div class="mt-8 flex flex-wrap gap-2 border-b border-line pb-3" role="tablist" aria-label="Content type">
        <button v-for="tab in ['services', 'articles', 'faqs']" :key="tab" class="rounded-full px-4 py-2 text-sm font-bold capitalize" :class="activeTab === tab ? 'bg-brand text-white' : 'bg-paper text-muted hover:text-ink'" type="button" role="tab" :aria-selected="activeTab === tab" @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'services'" class="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form class="grid content-start gap-4 rounded-2xl border border-line bg-paper p-6" @submit.prevent="saveService">
          <h2 class="text-xl font-semibold text-ink">{{ editing.service ? 'Edit service' : 'Add service' }}</h2>
          <label class="field-label">Name<input v-model="serviceForm.name" class="field-input" required maxlength="255" /></label>
          <label class="field-label">URL slug<input v-model="serviceForm.slug" class="field-input" required pattern="[A-Za-z0-9_-]+" maxlength="255" /></label>
          <label class="field-label">Summary<input v-model="serviceForm.summary" class="field-input" maxlength="500" /></label>
          <label class="field-label">Description<textarea v-model="serviceForm.description" class="field-input min-h-32" required maxlength="10000"></textarea></label>
          <label class="flex items-center gap-2 text-sm font-semibold text-ink"><input v-model="serviceForm.is_active" type="checkbox" /> Publish on website</label>
          <div class="flex gap-3">
            <button class="rounded-full bg-brand px-5 py-3 text-sm font-bold text-white disabled:opacity-60" type="submit" :disabled="submitting">{{ submitting ? 'Saving…' : 'Save service' }}</button>
            <button v-if="editing.service" class="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink" type="button" @click="resetService">Cancel</button>
          </div>
        </form>
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-ink">Services ({{ services.length }})</h2>
          <article v-for="service in services" :key="service.id" class="flex items-start justify-between gap-4 rounded-xl border border-line p-4">
            <div><h3 class="font-semibold text-ink">{{ service.name }}</h3><p class="mt-1 text-xs text-muted">{{ service.slug }} · {{ service.is_active ? 'Published' : 'Draft' }}</p></div>
            <button class="button-quiet text-sm font-bold text-brand hover:text-brand-dark" type="button" @click="editService(service)">Edit</button>
          </article>
          <p v-if="!services.length" class="text-sm text-muted">No services have been added.</p>
        </div>
      </div>

      <div v-else-if="activeTab === 'articles'" class="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form class="grid content-start gap-4 rounded-2xl border border-line bg-paper p-6" @submit.prevent="saveArticle">
          <h2 class="text-xl font-semibold text-ink">{{ editing.article ? 'Edit article' : 'Add article' }}</h2>
          <label class="field-label">Title<input v-model="articleForm.title" class="field-input" required maxlength="255" /></label>
          <label class="field-label">URL slug<input v-model="articleForm.slug" class="field-input" required pattern="[A-Za-z0-9_-]+" maxlength="255" /></label>
          <label class="field-label">Excerpt<input v-model="articleForm.excerpt" class="field-input" maxlength="500" /></label>
          <label class="field-label">Article body<textarea v-model="articleForm.body" class="field-input min-h-40" required maxlength="100000"></textarea></label>
          <label class="field-label">Publication status
            <select v-model="articleForm.status" class="field-input"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select>
          </label>
          <div class="flex gap-3">
            <button class="rounded-full bg-brand px-5 py-3 text-sm font-bold text-white disabled:opacity-60" type="submit" :disabled="submitting">{{ submitting ? 'Saving…' : 'Save article' }}</button>
            <button v-if="editing.article" class="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink" type="button" @click="resetArticle">Cancel</button>
          </div>
        </form>
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-ink">Articles ({{ articles.length }})</h2>
          <article v-for="article in articles" :key="article.id" class="flex items-start justify-between gap-4 rounded-xl border border-line p-4">
            <div><h3 class="font-semibold text-ink">{{ article.title }}</h3><p class="mt-1 text-xs text-muted">{{ article.slug }} · {{ article.status }}</p></div>
            <button class="button-quiet text-sm font-bold text-brand hover:text-brand-dark" type="button" @click="editArticle(article)">Edit</button>
          </article>
          <p v-if="!articles.length" class="text-sm text-muted">No articles have been added.</p>
        </div>
      </div>

      <div v-else class="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form class="grid content-start gap-4 rounded-2xl border border-line bg-paper p-6" @submit.prevent="saveFaq">
          <h2 class="text-xl font-semibold text-ink">{{ editing.faq ? 'Edit FAQ' : 'Add FAQ' }}</h2>
          <label class="field-label">Question<input v-model="faqForm.question" class="field-input" required maxlength="255" /></label>
          <label class="field-label">Answer<textarea v-model="faqForm.answer" class="field-input min-h-32" required maxlength="10000"></textarea></label>
          <label class="flex items-center gap-2 text-sm font-semibold text-ink"><input v-model="faqForm.is_active" type="checkbox" /> Publish on website</label>
          <div class="flex gap-3">
            <button class="rounded-full bg-brand px-5 py-3 text-sm font-bold text-white disabled:opacity-60" type="submit" :disabled="submitting">{{ submitting ? 'Saving…' : 'Save FAQ' }}</button>
            <button v-if="editing.faq" class="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink" type="button" @click="resetFaq">Cancel</button>
          </div>
        </form>
        <div class="space-y-3">
          <h2 class="text-lg font-semibold text-ink">FAQs ({{ faqs.length }})</h2>
          <article v-for="faq in faqs" :key="faq.id" class="flex items-start justify-between gap-4 rounded-xl border border-line p-4">
            <div><h3 class="font-semibold text-ink">{{ faq.question }}</h3><p class="mt-1 text-xs text-muted">{{ faq.is_active ? 'Published' : 'Draft' }}</p></div>
            <button class="button-quiet text-sm font-bold text-brand hover:text-brand-dark" type="button" @click="editFaq(faq)">Edit</button>
          </article>
          <p v-if="!faqs.length" class="text-sm text-muted">No FAQs have been added.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color-ink);
  font-size: 0.875rem;
  font-weight: 600;
}

.field-input {
  width: 100%;
  border: 1px solid var(--color-line);
  border-radius: 0.75rem;
  background: #fff;
  padding: 0.75rem 1rem;
  color: var(--color-ink);
  font-size: 0.875rem;
  font-weight: 400;
}

.field-input:focus {
  border-color: var(--color-brand);
  outline: 2px solid transparent;
}
</style>
