<script setup>
import { reactive, ref } from 'vue'
import PageBanner from '../components/PageBanner.vue'
import consultingTeam from '../assets/consulting-team.jpg'
import { apiRequest } from '../services/api'

const form = reactive({ name: '', email: '', phone: '', subject: '', message: '', company_website: '' })
const errors = ref({})
const error = ref('')
const reference = ref('')
const submitting = ref(false)

async function submit() {
  errors.value = {}
  error.value = ''
  reference.value = ''
  submitting.value = true

  try {
    const response = await apiRequest('/contact-messages', { method: 'POST', body: { ...form } })
    reference.value = response.data.reference
    Object.assign(form, { name: '', email: '', phone: '', subject: '', message: '', company_website: '' })
  } catch (requestError) {
    error.value = requestError.message
    errors.value = requestError.errors
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
  <PageBanner title="Contact Us" breadcrumb="Contact" subtitle="We are ready to hear from you. Reach out to us through any of the channels below." />
  <section class="bg-white">
    <div class="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[0.85fr_1.15fr] md:py-16 lg:px-8">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Get in touch</p>
        <h2 class="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">Let's start with a conversation.</h2>
        <p class="mt-4 max-w-md leading-7 text-muted">We are always ready to hear from you. Tell us a little about what you are working on, and our team will follow up.</p>
        <div class="mt-6 border-t border-line pt-5">
          <p class="text-sm font-semibold text-ink">Prefer a focused conversation?</p>
          <RouterLink class="mt-2 inline-flex text-sm font-bold text-brand hover:text-brand-dark" to="/consultation">Request Consultation <span class="ml-2" aria-hidden="true">→</span></RouterLink>
        </div>
        <img :src="consultingTeam" alt="CLM colleagues working together" class="mt-6 aspect-[16/9] w-full rounded-xl object-cover" loading="lazy">
      </div>

      <form class="content-card p-6 md:p-8" @submit.prevent="submit">
        <div v-if="reference" class="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">
          Thanks — your message has been received. Reference: <span class="font-mono font-semibold">{{ reference }}</span>
        </div>
        <p v-if="error" class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>

        <div class="grid gap-5 sm:grid-cols-2">
          <label class="field-label">Your name
            <input v-model="form.name" class="field-input" autocomplete="name" required maxlength="200" />
            <span v-if="errors.name" class="field-error">{{ errors.name[0] }}</span>
          </label>
          <label class="field-label">Email address
            <input v-model="form.email" class="field-input" type="email" autocomplete="email" required maxlength="255" />
            <span v-if="errors.email" class="field-error">{{ errors.email[0] }}</span>
          </label>
          <label class="field-label">Phone <span class="font-normal text-muted">(optional)</span>
            <input v-model="form.phone" class="field-input" type="tel" autocomplete="tel" maxlength="40" />
            <span v-if="errors.phone" class="field-error">{{ errors.phone[0] }}</span>
          </label>
          <label class="field-label">Subject
            <input v-model="form.subject" class="field-input" required maxlength="200" />
            <span v-if="errors.subject" class="field-error">{{ errors.subject[0] }}</span>
          </label>
          <label class="field-label sm:col-span-2">How can we help?
            <textarea v-model="form.message" class="field-input min-h-36 resize-y" required minlength="10" maxlength="5000"></textarea>
            <span v-if="errors.message" class="field-error">{{ errors.message[0] }}</span>
          </label>
        </div>
        <label class="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          Leave this field empty
          <input v-model="form.company_website" tabindex="-1" autocomplete="off" />
        </label>
        <button class="mt-6 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60" type="submit" :disabled="submitting">
          {{ submitting ? 'Sending…' : 'Send message' }}
        </button>
        <p class="mt-4 text-xs leading-5 text-muted">Please do not include passwords or sensitive personal information in this form.</p>
      </form>
    </div>
  </section>
  </div>
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

.field-input::placeholder {
  color: var(--color-muted);
}

.field-input:focus {
  border-color: var(--color-brand);
  outline: 2px solid transparent;
}

.field-error {
  color: #b91c1c;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
