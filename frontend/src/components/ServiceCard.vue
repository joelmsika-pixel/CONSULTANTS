<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <article class="group relative flex h-full min-h-60 cursor-pointer flex-col overflow-hidden border border-line bg-white p-5 shadow-[0_0_15px_rgba(6,44,89,0.08)] transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(6,44,89,0.15)] md:p-6">
    <div class="absolute -right-4 -top-5 size-20 rounded-full bg-brand" aria-hidden="true">
      <span class="absolute bottom-4 left-5 text-xl font-semibold text-white">{{ String(index + 1).padStart(2, '0') }}</span>
    </div>
    <div class="mb-1 w-10 text-brand" aria-hidden="true">
      <svg v-if="index === 0" class="size-8 fill-current" viewBox="0 0 24 24">
        <path d="M4 3h16v18H4zM7 7h10v2H7zm0 4h10v2H7zm0 4h6v2H7z" />
      </svg>
      <svg v-else-if="index === 1" class="size-8 fill-current" viewBox="0 0 24 24">
        <path d="M10 2a8 8 0 1 0 4.9 14.32L21 22l1-1-5.68-6.1A8 8 0 0 0 10 2m0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12" />
      </svg>
      <svg v-else-if="index === 2" class="size-8 fill-current" viewBox="0 0 24 24">
        <path d="M3 3h2v16h16v2H3zm4 10h3v4H7zm5-5h3v9h-3zm5-4h3v13h-3z" />
      </svg>
      <svg v-else class="size-8 fill-current" viewBox="0 0 24 24">
        <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 3v13h12V5zm5 14h2v1h-2z" />
      </svg>
    </div>
    <h3 class="mt-1 max-w-[85%] text-lg font-bold leading-snug text-ink">{{ service.name }}</h3>
    <p class="mt-2 flex-1 text-sm leading-5 text-muted">{{ service.description }}</p>
  </article>
</template>
