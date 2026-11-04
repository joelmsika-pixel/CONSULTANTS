<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const form = reactive({ name: '', email: '', password: '', password_confirmation: '' })
const error = ref('')
const submitting = ref(false)

async function submit() {
  error.value = ''
  submitting.value = true
  try {
    await auth.register({ ...form })
    await router.push('/forum')
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="bg-paper px-5 py-6 md:py-8">
    <div class="mx-auto grid max-w-4xl overflow-hidden rounded-xl border border-line bg-white shadow-lg md:grid-cols-2">
      <div class="relative isolate flex min-h-48 flex-col justify-end overflow-hidden bg-navy p-5 md:min-h-[25rem] md:p-7">
        <img src="/image_de46462f%20(1).jpg" alt="" class="absolute inset-0 -z-10 size-full object-cover" loading="lazy">
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-[#052b57]/95 via-[#052b57]/55 to-[#052b57]/20"></div>
        <p class="register-brand text-xs font-bold uppercase tracking-[0.2em] text-blue-100">CLM Consultants</p>
        <h1 class="register-hero-title mt-2 text-2xl font-bold text-white md:text-3xl">Join the conversation</h1>
        <p class="register-hero-copy mt-2 max-w-sm text-sm leading-6 text-blue-50">Create an account to participate in thoughtful, moderated forum discussions.</p>
      </div>
      <div class="p-5 md:p-6">
      <p class="register-kicker text-xs font-bold uppercase tracking-[0.16em] text-brand">Join the community</p>
      <h2 class="register-title mt-1.5 text-xl font-bold tracking-tight text-ink">Create an account</h2>
      <p class="register-intro mt-1 text-sm leading-5 text-muted">Accounts let members participate in moderated forum discussions.</p>
      <p v-if="error" class="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{{ error }}</p>
      <form class="mt-4 grid gap-3 sm:grid-cols-2" @submit.prevent="submit">
        <label class="field-label">
          <span class="field-control">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.7" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
            <input v-model="form.name" class="field-input" autocomplete="name" placeholder=" " required maxlength="255" />
            <span class="field-floating-label">Name</span>
          </span>
        </label>
        <label class="field-label">
          <span class="field-control">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7" /><path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <input v-model="form.email" class="field-input" type="email" autocomplete="email" placeholder=" " required maxlength="255" />
            <span class="field-floating-label">Email address</span>
          </span>
        </label>
        <label class="field-label">
          <span class="field-control">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.7" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
            <input v-model="form.password" class="field-input" type="password" autocomplete="new-password" placeholder=" " required minlength="12" />
            <span class="field-floating-label">Password</span>
          </span>
        </label>
        <label class="field-label">
          <span class="field-control">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.7" /><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
            <input v-model="form.password_confirmation" class="field-input" type="password" autocomplete="new-password" placeholder=" " required />
            <span class="field-floating-label">Confirm password</span>
          </span>
        </label>
        <button class="col-span-full w-full rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="submitting">
          {{ submitting ? 'Creating account…' : 'Create account' }}
        </button>
      </form>
      <p class="register-footer mt-4 text-sm text-muted"><span>Already registered?</span> <RouterLink class="font-bold text-brand hover:text-brand-dark" to="/login">Sign in</RouterLink></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.register-brand {
  color: #dbeafe;
  letter-spacing: 0.18em;
  text-shadow: 0 1px 8px rgb(3 23 48 / 45%);
}

.register-hero-title {
  line-height: 1.12;
  letter-spacing: -0.025em;
  text-shadow: 0 2px 12px rgb(3 23 48 / 35%);
}

.register-hero-copy {
  color: #eff6ff;
  text-wrap: pretty;
}

.register-kicker {
  letter-spacing: 0.16em;
}

.register-title {
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.register-intro {
  max-width: 27rem;
  text-wrap: pretty;
}

.register-footer {
  color: #536984;
}

.register-footer a {
  text-decoration: underline;
  text-decoration-color: rgb(8 117 225 / 35%);
  text-underline-offset: 3px;
  transition: color 150ms ease, text-decoration-color 150ms ease;
}

.register-footer a:hover {
  text-decoration-color: currentColor;
}

.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: var(--color-ink);
  font-size: 0.875rem;
  font-weight: 600;
}

.field-control {
  position: relative;
  display: block;
  min-width: 0;
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

.field-floating-label {
  position: absolute;
  top: 50%;
  left: 2.5rem;
  z-index: 1;
  max-width: calc(100% - 3.25rem);
  overflow: hidden;
  padding: 0 0.25rem;
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 400;
  pointer-events: none;
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

.field-control:focus-within .field-icon {
  color: var(--color-brand-dark);
}

.field-control:not(:focus-within) .field-input:not(:placeholder-shown) + .field-floating-label {
  background: #f7f9ff;
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
  transition: border-color 150ms ease, background-color 150ms ease;
}

.field-input:focus {
  border-color: var(--color-brand-dark);
  outline: none;
  background: #fff;
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .field-input,
  .field-floating-label,
  .register-footer a {
    transition: none;
  }
}
</style>
