<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="bg-white px-5 py-24 text-center">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">404 · Page not found</p>
    <h1 class="mt-5 text-4xl font-semibold tracking-tight text-ink">This page isn't here.</h1>
    <p class="mt-4 text-muted">The address may have changed, or the page may no longer be available.</p>
    <RouterLink class="mt-8 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-dark" to="/">Return to the homepage</RouterLink>
  </section>
</template>
