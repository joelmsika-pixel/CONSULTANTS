<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import consultingTeam from '../assets/consulting-team.jpg'
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
  <section class="bg-paper px-5 py-12 md:py-16">
    <div class="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-line bg-white shadow-lg md:grid-cols-2">
      <div class="relative isolate flex min-h-64 flex-col justify-end overflow-hidden bg-navy p-8 md:min-h-[39rem] md:p-10">
        <img :src="consultingTeam" alt="" class="absolute inset-0 -z-10 size-full object-cover" loading="lazy">
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-[#052b57]/95 via-[#052b57]/55 to-[#052b57]/20"></div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">CLM Consultants</p>
        <h1 class="mt-3 text-3xl font-bold text-white">Join the conversation</h1>
        <p class="mt-3 max-w-sm text-sm leading-6 text-blue-50">Create an account to participate in thoughtful, moderated forum discussions.</p>
      </div>
      <div class="p-7 md:p-10">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Join the community</p>
      <h2 class="mt-3 text-2xl font-bold tracking-tight text-ink">Create an account</h2>
      <p class="mt-2 leading-7 text-muted">Accounts let members participate in moderated forum discussions.</p>
      <p v-if="error" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <form class="mt-7 space-y-5" @submit.prevent="submit">
        <label class="field-label">Name
          <input v-model="form.name" class="field-input" autocomplete="name" required maxlength="255" />
        </label>
        <label class="field-label">Email address
          <input v-model="form.email" class="field-input" type="email" autocomplete="email" required maxlength="255" />
        </label>
        <label class="field-label">Password
          <input v-model="form.password" class="field-input" type="password" autocomplete="new-password" required minlength="12" />
          <span class="text-xs font-normal leading-5 text-muted">Use at least 12 characters with upper- and lowercase letters, a number, and a symbol.</span>
        </label>
        <label class="field-label">Confirm password
          <input v-model="form.password_confirmation" class="field-input" type="password" autocomplete="new-password" required />
        </label>
        <button class="w-full rounded-md bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="submitting">
          {{ submitting ? 'Creating account…' : 'Create account' }}
        </button>
      </form>
      <p class="mt-6 text-sm text-muted">Already registered? <RouterLink class="font-bold text-brand hover:text-brand-dark" to="/login">Sign in</RouterLink></p>
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
