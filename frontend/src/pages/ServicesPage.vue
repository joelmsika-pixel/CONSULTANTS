<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageBanner from '../components/PageBanner.vue'
import ServiceCard from '../components/ServiceCard.vue'
import { coreServices } from '../data/coreServices'
import { apiRequest } from '../services/api'

gsap.registerPlugin(ScrollTrigger)

const services = ref([])
const error = ref('')
const loading = ref(true)
const servicesGrid = ref(null)
let servicesAnimationContext
const additionalServices = computed(() => {
  const coreServiceNames = new Set(coreServices.map((service) => service.name.trim().toLowerCase()))
  return services.value.filter((service) => !coreServiceNames.has(service.name.trim().toLowerCase()))
})

onMounted(async () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    await nextTick()
    if (servicesGrid.value) {
      servicesAnimationContext = gsap.context(() => {
        gsap.fromTo('.service-card', {
          autoAlpha: 0,
          y: 64,
          rotateX: -10,
          scale: 0.94,
        }, {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: 'back.out(1.25)',
          scrollTrigger: {
            trigger: servicesGrid.value,
            start: 'top 82%',
            once: true,
          },
        })
      }, servicesGrid.value)
    }
  }

  try {
    const response = await apiRequest('/services?per_page=50')
    services.value = response.data.data
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
})

onUnmounted(() => servicesAnimationContext?.revert())
</script>

<template>
  <div>
  <PageBanner
    title="What We Do"
    breadcrumb="What We Do"
    subtitle="Expertise, innovation and impact."
    background-image="/digitalization-business.jpg"
    large
  />
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-5 py-12 md:py-16 lg:px-8">
      <h2 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">Expertise that moves work forward.</h2>
      <p class="mt-4 max-w-2xl leading-7 text-muted">We provide a wide range of consulting services tailored to your needs.</p>

      <p v-if="error" class="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{{ error }}</p>
      <div ref="servicesGrid" class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ServiceCard
          v-for="(service, index) in coreServices"
          :key="service.name"
          class="service-card"
          :service="service"
          :index="index"
        />
      </div>

      <template v-if="additionalServices.length">
        <h3 class="mt-12 text-2xl font-bold tracking-tight text-ink">More services</h3>
        <div class="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="(service, index) in additionalServices" :id="service.slug" :key="service.slug" class="content-card p-6">
            <span class="grid size-11 place-items-center rounded-lg bg-brand-soft text-sm font-bold text-brand" aria-hidden="true">{{ String(index + coreServices.length + 1).padStart(2, '0') }}</span>
            <h4 class="mt-4 text-lg font-bold text-ink">{{ service.name }}</h4>
            <p v-if="service.summary" class="mt-2 text-sm leading-6 text-muted">{{ service.summary }}</p>
            <p v-if="service.description" class="mt-4 text-sm leading-6 text-muted">{{ service.description }}</p>
            <RouterLink class="mt-5 inline-flex text-sm font-bold text-brand" :to="{ name: 'consultation', query: { service: service.slug } }">Discuss this service <span class="ml-2" aria-hidden="true">→</span></RouterLink>
          </article>
        </div>
      </template>
      <p v-else-if="loading" class="mt-8 text-sm text-muted" role="status">Loading additional services…</p>

      <RouterLink class="mt-10 inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-dark" to="/contact">Contact our team</RouterLink>
    </div>
  </section>
  </div>
</template>
