<script setup>
import { reactive, ref } from 'vue'
import PageBanner from '../components/PageBanner.vue'
import { apiRequest } from '../services/api'

const form = reactive({ first_name: '', last_name: '', email: '', phone: '', message: '', company_website: '' })
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
    const response = await apiRequest('/contact-messages', {
      method: 'POST',
      body: {
        name: `${form.first_name} ${form.last_name}`.trim(),
        email: form.email,
        phone: form.phone,
        subject: 'Contact Us Inquiry',
        message: form.message,
        company_website: form.company_website,
      },
    })
    reference.value = response.data.reference
    Object.assign(form, { first_name: '', last_name: '', email: '', phone: '', message: '', company_website: '' })
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
  <PageBanner
    title="Contact Us"
    subtitle="We are ready to hear from you. Reach out to us through any of the channels below."
    background-image="/181231.jpg"
    large
    full-background
    :show-breadcrumb="false"
  />
  <section class="bg-paper px-5 py-8 md:py-12 lg:px-8">
    <div class="mx-auto grid max-w-7xl items-start gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div class="pt-2">
        <h2 class="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
          We’d love to hear from you.
        </h2>
        <div class="mt-5 space-y-4 text-sm leading-7 text-muted md:text-base">
          <p>
            Welcome to the <span class="font-semibold text-ink">Contact Us</span> page of CLM Consultants! We’re thrilled to have you here and are eager to assist you with any questions, inquiries, or support you may need.
          </p>
          <p>
            Looking to <span class="font-semibold text-ink">start a new project</span>, need <span class="font-semibold text-ink">expert consultation</span>, or simply want to learn more about our services? You’re in the right place.
          </p>
        </div>
        <div class="mt-5 flex gap-3 rounded-xl border border-brand/10 bg-white p-4 shadow-sm">
          <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2v-6a7.5 7.5 0 1 1 17-3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
              <path d="M8 11h8M8 14h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </span>
          <p class="text-sm leading-6 text-muted">
            Our team is dedicated to providing <span class="font-semibold text-ink">prompt, personalized assistance</span>. Don’t hesitate to reach out—we look forward to connecting with you!
          </p>
        </div>
      </div>

      <form class="w-full max-w-lg justify-self-end overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_36px_rgba(18,53,95,0.09)]" @submit.prevent="submit">
        <div class="border-b border-line bg-gradient-to-r from-white to-brand-soft/60 px-5 py-3.5">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-brand">Send us a message</p>
          <h3 class="mt-1 text-lg font-bold tracking-tight text-ink">Let’s talk about your needs</h3>
        </div>

        <div class="p-4 md:p-5">
          <div v-if="reference" class="mb-3 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900" role="status">
            <svg class="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p>Thanks — your message has been received. Reference: <span class="font-mono font-semibold">{{ reference }}</span></p>
          </div>
          <p v-if="error" class="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{{ error }}</p>

          <div class="grid gap-x-3 gap-y-3 sm:grid-cols-2">
            <label class="field-label">
              <span class="field-control">
                <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.7" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
                <input v-model="form.first_name" class="field-input" autocomplete="given-name" placeholder=" " required maxlength="100" />
                <span class="field-floating-label">First Name</span>
              </span>
              <span v-if="errors.name" class="field-error">{{ errors.name[0] }}</span>
            </label>
            <label class="field-label">
              <span class="field-control">
                <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.7" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
                <input v-model="form.last_name" class="field-input" autocomplete="family-name" placeholder=" " required maxlength="100" />
                <span class="field-floating-label">Last Name</span>
              </span>
            </label>
            <label class="field-label">
              <span class="field-control">
                <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7" /><path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <input v-model="form.email" class="field-input" type="email" autocomplete="email" placeholder=" " required maxlength="255" />
                <span class="field-floating-label">Email address</span>
              </span>
              <span v-if="errors.email" class="field-error">{{ errors.email[0] }}</span>
            </label>
            <label class="field-label">
              <span class="field-control">
                <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.2 3.5h2.5l1.2 4.1-1.8 1.8a15 15 0 0 0 5.5 5.5l1.8-1.8 4.1 1.2v2.5a2 2 0 0 1-2.2 2A16.3 16.3 0 0 1 5.2 5.7a2 2 0 0 1 2-2.2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <input v-model="form.phone" class="field-input" type="tel" autocomplete="tel" placeholder=" " required maxlength="40" />
                <span class="field-floating-label">Phone Number</span>
              </span>
              <span v-if="errors.phone" class="field-error">{{ errors.phone[0] }}</span>
            </label>
            <label class="field-label">
              <span class="field-control field-control--textarea">
                <svg class="field-icon field-icon--textarea" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h14v11H9l-4 3V5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><path d="M8 9h8M8 12h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
                <textarea v-model="form.message" class="field-input field-textarea" placeholder=" " required minlength="10" maxlength="5000"></textarea>
                <span class="field-floating-label field-floating-label--textarea">Your Message</span>
              </span>
              <span v-if="errors.message" class="field-error">{{ errors.message[0] }}</span>
            </label>
          </div>
          <p v-if="errors.subject" class="mt-4 text-sm text-red-700">{{ errors.subject[0] }}</p>
          <label class="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            Leave this field empty
            <input v-model="form.company_website" tabindex="-1" autocomplete="off" />
          </label>
          <button class="button-quiet contact-submit mt-4" type="submit" :disabled="submitting">
            <span class="svg-wrapper-1" aria-hidden="true">
              <span class="svg-wrapper">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </span>
            </span>
            <span>{{ submitting ? 'Sending…' : 'Send message' }}</span>
          </button>
        </div>
      </form>
    </div>
  </section>
  </div>
</template>

<style scoped>
.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  color: var(--color-ink);
  font-size: 0.875rem;
  font-weight: 600;
}

.field-control {
  position: relative;
  display: block;
  min-width: 0;
  border-radius: 0;
}

.field-floating-label {
  position: absolute;
  top: 50%;
  left: 2.5rem;
  z-index: 1;
  max-width: calc(100% - 3.25rem);
  overflow: hidden;
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 400;
  pointer-events: none;
  padding: 0 0.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translateY(-50%);
  transform-origin: left center;
  transition: top 180ms ease, color 180ms ease, font-size 180ms ease, background-color 180ms ease;
}

.field-input:focus + .field-floating-label,
.field-input:not(:placeholder-shown) + .field-floating-label {
  top: 0.38rem;
  color: var(--color-brand-dark);
  font-size: 0.67rem;
  font-weight: 600;
  line-height: 1;
  transform: none;
}

.field-control:focus-within .field-floating-label {
  background: #fff;
}

.field-control:not(:focus-within) .field-input:not(:placeholder-shown) + .field-floating-label {
  background: #f7f9ff;
}

.field-icon {
  position: absolute;
  top: 50%;
  left: 0.9rem;
  width: 1.15rem;
  height: 1.15rem;
  color: royalblue;
  pointer-events: none;
  transform: translateY(-50%);
}

.field-input {
  width: 100%;
  min-height: 3.25rem;
  border: 1px solid #b8c6f2;
  border-radius: 0;
  background: #f7f9ff;
  padding: 1.15rem 0.8rem 0.35rem 2.5rem;
  color: var(--color-ink);
  font-size: 0.875rem;
  font-weight: 400;
  transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
}

.field-control:focus-within .field-icon {
  color: var(--color-brand-dark);
}

.field-input:focus {
  border-color: var(--color-brand-dark);
  outline: none;
  background: #fff;
  box-shadow: none;
}

.field-control--textarea {
  display: flex;
}

.field-icon--textarea {
  top: 1rem;
  transform: none;
}

.field-floating-label--textarea {
  top: 1.1rem;
  transform: none;
}

.field-textarea:focus + .field-floating-label--textarea,
.field-textarea:not(:placeholder-shown) + .field-floating-label--textarea {
  top: 0.38rem;
}

.field-textarea {
  min-height: 6rem;
  resize: vertical;
  padding-top: 1.45rem;
  padding-bottom: 0.85rem;
}

.field-error {
  color: #b91c1c;
  font-size: 0.75rem;
  font-weight: 500;
}

.contact-submit {
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: royalblue;
  padding: 0.55em 0.85em 0.55em 0.75em;
  color: #fff;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 200ms ease, transform 200ms ease, opacity 200ms ease;
}

.contact-submit:hover:not(:disabled) {
  background: #3156c8;
}

.contact-submit:active:not(:disabled) {
  transform: scale(0.95);
}

.contact-submit:disabled {
  cursor: wait;
  opacity: 0.65;
}

.contact-submit > span:last-child {
  display: block;
  margin-left: 0.3em;
  transition: transform 300ms ease-in-out;
}

.svg-wrapper-1 {
  display: block;
}

.svg-wrapper {
  display: block;
  transform-origin: center center;
}

.svg-wrapper svg {
  display: block;
  transition: transform 300ms ease-in-out;
}

.contact-submit:hover:not(:disabled) .svg-wrapper {
  animation: fly-1 600ms ease-in-out infinite alternate;
}

.contact-submit:hover:not(:disabled) .svg-wrapper svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.contact-submit:hover:not(:disabled) > span:last-child {
  transform: translateX(5em);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

@media (prefers-reduced-motion: reduce) {
  .field-input,
  .field-floating-label,
  .contact-submit,
  .contact-submit > span:last-child,
  .svg-wrapper svg {
    transition: none;
  }

  .contact-submit:hover:not(:disabled) .svg-wrapper {
    animation: none;
  }

  .contact-submit:hover:not(:disabled) .svg-wrapper svg,
  .contact-submit:hover:not(:disabled) > span:last-child {
    transform: none;
  }
}
</style>
