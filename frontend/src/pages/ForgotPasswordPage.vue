<template>
  <section class="bg-paper px-5 py-10 md:py-14">
    <div class="mx-auto max-w-xl overflow-hidden rounded-xl border border-line bg-white shadow-lg">
      <div class="relative isolate overflow-hidden bg-navy px-6 py-8 text-white md:px-8">
        <img src="/black.jpg" alt="" class="absolute inset-0 -z-10 size-full object-cover" loading="lazy">
        <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#052b57]/90 to-[#052b57]/65"></div>
        <span class="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white" aria-hidden="true">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.7" />
            <path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          </svg>
        </span>
        <h1 class="mt-4 text-2xl font-bold tracking-tight md:text-3xl">Forgot your password?</h1>
        <p class="mt-2 max-w-md text-sm leading-6 text-blue-50">
          We’ll help you get back to your CLM Consultants account.
        </p>
      </div>

      <div class="p-6 md:p-8">
        <div class="flex items-start gap-3 border border-line bg-paper p-4">
          <svg class="mt-0.5 h-5 w-5 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7" />
            <path d="M12 11v5m0-8h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          </svg>
          <p class="text-sm leading-6 text-muted">
            Password reset is not available yet. Please contact our team and we’ll assist you with access to your account.
          </p>
        </div>

        <a
          class="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark sm:w-auto"
          href="mailto:info@clmconsultants.co.tz?subject=Help%20with%20my%20account"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7" />
            <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Contact support
        </a>

        <p class="mt-5 border-t border-line pt-4 text-sm text-muted">
          Remembered your password?
          <RouterLink class="font-bold text-brand hover:text-brand-dark" to="/login">Return to sign in</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
