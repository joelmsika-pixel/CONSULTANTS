<script setup>
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import consultingTeam from '../assets/consulting-team.jpg'
import { apiRequest } from '../services/api'

const route = useRoute()
const services = ref([])
const loadingServices = ref(true)
const serviceError = ref('')
const errors = ref({})
const error = ref('')
const reference = ref('')
const submitting = ref(false)
const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
  service_ids: [],
  company_website: '',
})

onMounted(async () => {
  try {
    const response = await apiRequest('/services?per_page=50')
    services.value = response.data.data
    const selected = services.value.find((service) => service.slug === route.query.service)
    if (selected) form.service_ids = [String(selected.id)]
  } catch (requestError) {
    serviceError.value = requestError.message
  } finally {
    loadingServices.value = false
  }
})

async function submit() {
  errors.value = {}
  error.value = ''
  reference.value = ''
  submitting.value = true

  try {
    const response = await apiRequest('/consultations', { method: 'POST', body: { ...form } })
    reference.value = response.data.reference
    Object.assign(form, {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      message: '',
      service_ids: [],
      company_website: '',
    })
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
  <PageBanner title="Request a Consultation" breadcrumb="Consultation" subtitle="Your ideas. Our expertise. Real impact." />
  <section class="bg-white">
    <div class="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16 lg:px-8">
      <form class="content-card order-2 p-6 md:order-1 md:p-8" @submit.prevent="submit">
        <div v-if="reference" class="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900" role="status">
          Your request has been received. Reference: <span class="font-mono font-semibold">{{ reference }}</span>
        </div>
        <p v-if="error" class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
        <p v-if="serviceError" class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ serviceError }}</p>

        <div class="grid gap-5 sm:grid-cols-2">
          <label class="field-label">First name
            <input v-model="form.first_name" class="field-input" autocomplete="given-name" required maxlength="100" />
            <span v-if="errors.first_name" class="field-error">{{ errors.first_name[0] }}</span>
          </label>
          <label class="field-label">Last name
            <input v-model="form.last_name" class="field-input" autocomplete="family-name" required maxlength="100" />
            <span v-if="errors.last_name" class="field-error">{{ errors.last_name[0] }}</span>
          </label>
          <label class="field-label">Email address
            <input v-model="form.email" class="field-input" type="email" autocomplete="email" required maxlength="255" />
            <span v-if="errors.email" class="field-error">{{ errors.email[0] }}</span>
          </label>
          <label class="field-label">Phone <span class="font-normal text-muted">(optional)</span>
            <input v-model="form.phone" class="field-input" type="tel" autocomplete="tel" maxlength="40" />
            <span v-if="errors.phone" class="field-error">{{ errors.phone[0] }}</span>
          </label>
          <label class="field-label sm:col-span-2">What would you like to discuss?
            <select v-model="form.service_ids" class="field-input min-h-28" multiple required :disabled="loadingServices || !services.length">
              <option v-for="service in services" :key="service.slug" :value="String(service.id)">{{ service.name }}</option>
            </select>
            <span v-if="loadingServices" class="text-xs font-normal text-muted">Loading services…</span>
            <span v-else-if="!services.length && !serviceError" class="text-xs font-normal text-muted">
              No services are available yet. Please use the <RouterLink class="font-semibold text-brand underline" to="/contact">contact form</RouterLink> instead.
            </span>
            <span v-if="errors.service_ids" class="field-error">{{ errors.service_ids[0] }}</span>
          </label>
          <label class="field-label sm:col-span-2">A little context
            <textarea v-model="form.message" class="field-input min-h-36 resize-y" required minlength="20" maxlength="5000"></textarea>
            <span v-if="errors.message" class="field-error">{{ errors.message[0] }}</span>
          </label>
        </div>
        <label class="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          Leave this field empty
          <input v-model="form.company_website" tabindex="-1" autocomplete="off" />
        </label>
        <button class="mt-6 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60" type="submit" :disabled="submitting || loadingServices || !services.length">
          {{ submitting ? 'Sending…' : 'Submit Request' }}
        </button>
        <p class="mt-4 text-xs leading-5 text-muted">Your information is used to respond to this request. Do not include passwords or sensitive personal information.</p>
      </form>

      <div>
        <img :src="consultingTeam" alt="Professionals discussing a consulting project" class="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy">
        <div class="mt-5 rounded-xl bg-paper p-6">
          <h2 class="text-lg font-bold text-ink">Why consult with CLM?</h2>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li>Evidence-led advice and practical expertise</li>
            <li>Solutions shaped around your context</li>
            <li>Collaborative support from first steps to delivery</li>
          </ul>
          <RouterLink class="mt-5 inline-flex text-sm font-bold text-brand" to="/services">Explore our services <span class="ml-2" aria-hidden="true">→</span></RouterLink>
        </div>
      </div>
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

.field-input:focus {
  border-color: var(--color-brand);
  outline: 2px solid transparent;
}

.field-input:disabled {
  cursor: not-allowed;
  background: #f3f4f6;
}

.field-error {
  color: #b91c1c;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
