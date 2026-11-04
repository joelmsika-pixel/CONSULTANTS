<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import bannerImage from '../assets/clm-consultation.jpg'

const props = defineProps({
  title: { type: String, required: true },
  breadcrumb: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImage: { type: String, default: bannerImage },
  large: { type: Boolean, default: false },
  fullBackground: { type: Boolean, default: false },
  showBreadcrumb: { type: Boolean, default: true },
})

const bannerElement = ref(null)
let animationContext

onMounted(() => {
  if (!props.large || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  animationContext = gsap.context(() => {
    const timeline = gsap.timeline()
    timeline.fromTo('.page-banner-image', {
      autoAlpha: 0.65,
      scale: 1.08,
    }, {
      autoAlpha: 1,
      scale: 1,
      duration: 1.1,
      ease: 'power3.out',
    })
    timeline.fromTo('h1', {
      autoAlpha: 0,
      y: 42,
      rotateX: -8,
    }, {
      autoAlpha: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'back.out(1.4)',
    }, '-=0.72')
    timeline.fromTo('p', {
      autoAlpha: 0,
      x: -24,
    }, {
      autoAlpha: 1,
      x: 0,
      duration: 0.65,
      ease: 'power2.out',
    }, '-=0.45')
  }, bannerElement.value)
})

onUnmounted(() => animationContext?.revert())
</script>

<template>
  <section
    ref="bannerElement"
    class="page-banner"
    :class="{ 'page-banner--large flex min-h-[20rem] items-center md:min-h-[25rem]': large }"
    :style="{
      backgroundImage: large ? 'none' : `linear-gradient(90deg, rgba(4, 33, 72, .94), rgba(4, 33, 72, .58)), url(${backgroundImage})`,
    }"
  >
    <div
      v-if="large"
      class="page-banner-image"
      :class="{ 'page-banner-image--full': fullBackground }"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
      aria-hidden="true"
    ></div>
    <div v-if="large && fullBackground" class="page-banner-overlay" aria-hidden="true"></div>
    <div class="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8" :class="large ? 'py-12 md:py-16' : 'py-10'">
      <div v-if="large" class="max-w-xl">
        <h1 class="max-w-lg text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-white drop-shadow-sm sm:text-5xl md:text-6xl">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-5 max-w-sm border-l-2 border-white/80 pl-4 text-base leading-7 text-blue-50 md:text-lg">
          {{ subtitle }}
        </p>
      </div>
      <template v-else>
        <h1 class="text-3xl font-bold tracking-tight text-white md:text-4xl">{{ title }}</h1>
        <p v-if="subtitle" class="mt-2 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">{{ subtitle }}</p>
        <nav v-if="showBreadcrumb" class="mt-4 flex items-center gap-2 text-xs font-medium text-blue-100" aria-label="Breadcrumb">
          <RouterLink class="transition hover:text-white" to="/">Home</RouterLink>
          <span aria-hidden="true">›</span>
          <span aria-current="page" class="text-white">{{ breadcrumb || title }}</span>
        </nav>
      </template>
    </div>
  </section>
</template>
