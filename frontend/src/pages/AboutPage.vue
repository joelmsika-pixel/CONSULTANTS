<script setup>
import PageBanner from '../components/PageBanner.vue'
import studioWorkspace from '../assets/studio-workspace.jpg'
</script>

<template>
  <div>
  <PageBanner title="About Us" breadcrumb="About Us" />
  <section class="bg-white">
    <div class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Who we are</p>
        <h2 class="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">Independent thinking. Work that moves things forward.</h2>
        <div class="mt-6 space-y-5 leading-7 text-muted">
          <p class="text-lg font-semibold text-ink">A good partnership starts with curiosity and grows through shared purpose.</p>
          <p>CLM Consultants works with organizations to make sense of complex questions and take practical next steps. We bring structure to uncertainty while keeping the people affected by the work at the centre.</p>
          <p>Our approach is collaborative: understand the context, design work that fits, and learn together as it develops. We value clear communication, thoughtful analysis, and useful outcomes.</p>
          <p class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Please review this starter copy against CLM Consultants' approved company profile before publication.</p>
        </div>
      </div>
      <figure class="relative overflow-hidden rounded-[2rem] bg-paper">
        <img
          :src="studioWorkspace"
          alt="A bright, welcoming space for conversation and collaborative work"
          class="aspect-[4/3] w-full object-cover"
          loading="lazy"
        >
        <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-6 pb-6 pt-16 text-sm font-semibold text-white">
          Thoughtful work starts with listening.
        </figcaption>
      </figure>
    </div>
  </section>
  <section class="bg-paper">
    <div class="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-3 lg:px-8">
      <article class="content-card p-5">
        <h3 class="font-bold text-ink">Integrity</h3>
        <p class="mt-2 text-sm leading-6 text-muted">We uphold ethical standards and communicate with care.</p>
      </article>
      <article class="content-card p-5">
        <h3 class="font-bold text-ink">Excellence</h3>
        <p class="mt-2 text-sm leading-6 text-muted">We focus on thoughtful analysis and useful outcomes.</p>
      </article>
      <article class="content-card p-5">
        <h3 class="font-bold text-ink">Collaboration</h3>
        <p class="mt-2 text-sm leading-6 text-muted">We work alongside partners to build practical solutions.</p>
      </article>
    </div>
  </section>
  </div>
</template>
