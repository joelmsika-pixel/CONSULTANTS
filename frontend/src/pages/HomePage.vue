<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceCard from '../components/ServiceCard.vue'
import consultingTeam from '../assets/consulting-team.jpg'
import { coreServices } from '../data/coreServices'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const heroSection = ref(null)
const historySection = ref(null)
const servicesGrid = ref(null)
const melSection = ref(null)
const melBackgroundImage = ref(null)
const historyParallax = ref(0)
const publications = [
  {
    title: 'Digital Solutions That Drive Results: Elevate Your Organization with CLM Consultants Limited BI & IT Expertise',
    image: '/IT.jpg',
  },
  {
    title: 'From Monitoring to Impact: Unlocking the Power of MEL Systems with CLM Consultants Limited',
    image: '/monitor.jpg',
  },
  {
    title: 'Transforming Data into Decisions: How CLM Consultants Limited Empowers Smarter Business Growth',
    image: '/Data.jpg',
  },
]
const activePublicationIndex = ref(0)
const publicationDirection = ref(1)
const isExploreAnimating = ref(false)
let parallaxFrame = 0
let publicationTimer
let publicationAnimation
let exploreNavigationTimer
let heroAnimationContext
let historyAnimationContext
let servicesAnimationContext
let melAnimationContext

function showPublication(index) {
  publicationDirection.value = index > activePublicationIndex.value ? 1 : -1
  activePublicationIndex.value = (index + publications.length) % publications.length
}

function handleExploreClick() {
  if (
    !window.matchMedia('(max-width: 767px)').matches
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    router.push('/news')
    return
  }

  if (isExploreAnimating.value) return

  isExploreAnimating.value = true
  window.clearTimeout(exploreNavigationTimer)
  exploreNavigationTimer = window.setTimeout(() => {
    router.push('/news')
  }, 650)
}

function handleExploreAnimationEnd(event) {
  if (
    !isExploreAnimating.value
    || event.pseudoElement !== '::before'
    || event.propertyName !== 'transform'
  ) return

  window.clearTimeout(exploreNavigationTimer)
  router.push('/news')
}

function animatePublicationLeave(element, done) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    done()
    return
  }

  publicationAnimation?.kill()
  publicationAnimation = gsap.to(element, {
    x: publicationDirection.value * -28,
    autoAlpha: 0,
    scale: 0.985,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done,
  })
}

function animatePublicationEnter(element, done) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    done()
    return
  }

  const image = element.querySelector('.publication-image')
  const title = element.querySelector('.publication-title')
  const direction = publicationDirection.value
  const timeline = gsap.timeline({ onComplete: done })

  publicationAnimation?.kill()
  publicationAnimation = timeline
  timeline.fromTo(element, {
    x: direction * 32,
    autoAlpha: 0,
  }, {
    x: 0,
    autoAlpha: 1,
    duration: 0.48,
    ease: 'power3.out',
  })
  if (image) {
    timeline.fromTo(image, {
      scale: 1.1,
    }, {
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '<')
  }
  if (title) {
    timeline.fromTo(title, {
      y: 18,
      autoAlpha: 0,
    }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.45,
      ease: 'power3.out',
    }, '<0.12')
  }
}

function startPublicationTimer() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || publicationTimer) return

  publicationTimer = window.setInterval(() => {
    showPublication(activePublicationIndex.value + 1)
  }, 6000)
}

function stopPublicationTimer() {
  window.clearInterval(publicationTimer)
  publicationTimer = undefined
}

function updateHistoryParallax() {
  cancelAnimationFrame(parallaxFrame)
  parallaxFrame = requestAnimationFrame(() => {
    if (!historySection.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      historyParallax.value = 0
      return
    }

    const sectionTop = historySection.value.getBoundingClientRect().top
    historyParallax.value = Math.max(-70, Math.min(70, -sectionTop * 0.08))
  })
}

onMounted(async () => {
  publications.forEach(({ image }) => {
    const preloadedImage = new Image()
    preloadedImage.src = image
  })
  startPublicationTimer()

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && heroSection.value) {
    heroAnimationContext = gsap.context(() => {
      gsap.fromTo('.hero-background', {
        y: 0,
      }, {
        y: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      timeline.fromTo('.hero-copy > *', {
        autoAlpha: 0,
        y: 24,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.14,
      }, '-=0.75')
    }, heroSection.value)
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && historySection.value) {
    historyAnimationContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: historySection.value,
          start: 'top 78%',
          once: true,
        },
      })

      timeline.fromTo('.history-copy-line', {
        autoAlpha: 0,
        x: -28,
      }, {
        autoAlpha: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.16,
        ease: 'power2.out',
      })
      timeline.fromTo('.history-sticker-title', {
        autoAlpha: 0,
        y: 22,
        rotation: 0,
      }, {
        autoAlpha: 1,
        y: 0,
        rotation: -1,
        duration: 0.55,
        ease: 'back.out(1.4)',
      }, 0.2)
      timeline.fromTo('.history-sticker-note', {
        autoAlpha: 0,
        y: 18,
        rotation: 0,
      }, {
        autoAlpha: 1,
        y: 0,
        rotation: (index) => [0.5, -0.4, 0.35, -0.5][index],
        duration: 0.55,
        stagger: 0.12,
        ease: 'back.out(1.3)',
      }, 0.38)
    }, historySection.value)
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && servicesGrid.value) {
    servicesAnimationContext = gsap.context(() => {
      gsap.fromTo('.home-service-card', {
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

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && melSection.value) {
    melAnimationContext = gsap.context(() => {
      gsap.fromTo(melBackgroundImage.value, {
        yPercent: 0,
        scale: 1.12,
      }, {
        yPercent: 40,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: melSection.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: melSection.value,
          start: 'top 78%',
          once: true,
        },
      })

      timeline.fromTo('.mel-heading', {
        autoAlpha: 0,
        y: 24,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
      })
      timeline.fromTo('.mel-description', {
        autoAlpha: 0,
        x: 24,
      }, {
        autoAlpha: 1,
        x: 0,
        duration: 0.65,
        ease: 'power2.out',
      }, '<0.12')
      timeline.fromTo('.mel-principle', {
        autoAlpha: 0,
        y: 30,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.14,
        ease: 'power2.out',
      }, '-=0.15')
    }, melSection.value)
  }

  window.addEventListener('scroll', updateHistoryParallax, { passive: true })
  updateHistoryParallax()

})

onUnmounted(() => {
  stopPublicationTimer()
  window.clearTimeout(exploreNavigationTimer)
  publicationAnimation?.kill()
  window.removeEventListener('scroll', updateHistoryParallax)
  cancelAnimationFrame(parallaxFrame)
  heroAnimationContext?.revert()
  historyAnimationContext?.revert()
  servicesAnimationContext?.revert()
  melAnimationContext?.revert()
})
</script>

<style scoped>
.history-visual {
  transform: translate3d(0, var(--history-parallax, 0), 0);
}

.history-sticker-title {
  --sticker-rotation: -1deg;
  transform: rotate(var(--sticker-rotation));
  box-shadow: 0 5px 10px rgba(46, 37, 22, 0.18);
}

.history-sticker-note {
  --sticker-rotation: 0deg;
  transform: rotate(var(--sticker-rotation));
}

.history-sticker-note:nth-child(1) {
  --sticker-rotation: 0.5deg;
}

.history-sticker-note:nth-child(2) {
  --sticker-rotation: -0.4deg;
}

.history-sticker-note:nth-child(3) {
  --sticker-rotation: 0.35deg;
}

.history-sticker-note:nth-child(4) {
  --sticker-rotation: -0.5deg;
}

.mel-background-overlay {
  background:
    radial-gradient(ellipse at 82% 16%, rgb(56 189 248 / 28%), transparent 42%),
    linear-gradient(112deg, rgb(4 24 55 / 82%), rgb(5 69 132 / 74%) 56%, rgb(4 115 148 / 64%));
}

.mel-principle {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: rgb(255 255 255 / 93%);
  box-shadow: 0 16px 40px rgb(3 20 44 / 18%);
  cursor: pointer;
}

.mel-principle::before {
  position: absolute;
  top: -1.75rem;
  right: -1.75rem;
  z-index: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background: var(--color-brand);
  content: "";
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.mel-principle:hover::before,
.mel-principle:focus-within::before {
  transform: scale(24);
}

.mel-principle > h3,
.mel-principle > p {
  position: relative;
  z-index: 1;
}

.mel-principle h3,
.mel-principle p {
  transition: color 600ms ease-out;
}

.mel-principle:hover h3,
.mel-principle:focus-within h3 {
  color: #fff;
}

.mel-principle:hover p,
.mel-principle:focus-within p {
  color: rgb(255 255 255 / 82%);
}

@media (prefers-reduced-motion: reduce) {
  .history-visual {
    transform: none !important;
  }

  .mel-principle::before,
  .mel-principle h3,
  .mel-principle p {
    transition: none;
  }

  .hero-background {
    transform: none !important;
  }

  .history-sticker-title,
  .history-sticker-note {
    transform: none;
  }
}
</style>

<template>
  <div>
  <section ref="heroSection" class="relative isolate min-h-[31rem] overflow-hidden bg-navy md:min-h-[36rem]">
    <img :src="consultingTeam" alt="Colleagues working together around a table" class="hero-background absolute inset-x-0 -top-[200%] -z-10 h-[500%] w-full object-cover object-center" fetchpriority="high">
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#052b57]/95 via-[#052b57]/75 to-[#052b57]/20"></div>
    <div class="mx-auto flex min-h-[31rem] max-w-7xl items-center px-5 py-16 md:min-h-[36rem] lg:px-8">
      <div class="hero-copy max-w-2xl">
        <h1 class="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
          Building Better Solutions for a Sustainable Future
        </h1>
        <p class="mt-6 max-w-xl text-base leading-7 text-blue-50 md:text-lg">
          CLM Consultants provides expert consulting, research and digital solutions to help organizations and communities achieve sustainable growth and development.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink class="rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark" to="/services">
            Explore Our Services
          </RouterLink>
          <RouterLink class="button-animated rounded-md border border-white/70 px-5 py-3 text-sm font-bold text-white" to="/contact">
            Get in Touch
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section ref="historySection" class="bg-white">
    <div class="mx-auto max-w-7xl px-5 py-14 md:py-16 lg:px-8">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Our history</p>
        <span class="mx-auto mt-3 block h-0.5 w-12 bg-brand" aria-hidden="true"></span>
      </div>
      <div class="mt-9 grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
        <div>
          <h2 class="history-copy-line max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            A growing team, bringing many fields together.
          </h2>
          <div class="mt-5 max-w-2xl space-y-4 text-base leading-7 text-muted">
            <p class="history-copy-line">
              CLM Consultants is a rapidly expanding company with a highly motivated team of specialists from many fields and specialties working together. CLM Consultants Limited offers you a range of management consulting services.
            </p>
            <p class="history-copy-line">
              As part of our information technology (IT) and business intelligence (BI) solutions, we offer consulting services in the areas of monitoring, evaluation, and learning digitization, as well as user-friendly digital technologies.
            </p>
          </div>
        </div>
        <div
          class="history-visual space-y-3 rounded-lg bg-[#f1f5f9] p-4"
          :style="{ '--history-parallax': `${historyParallax * 0.3}px` }"
        >
          <div class="history-sticker-title relative bg-[#fff2b8] px-5 py-4 shadow-md">
            <h3 class="text-lg font-bold leading-snug text-ink">Different disciplines.<br>Shared purpose.</h3>
          </div>
          <ol class="space-y-2.5">
            <li class="history-sticker-note flex gap-3 bg-white px-4 py-3 shadow-sm">
              <span class="pt-0.5 text-xs font-bold tracking-wider text-brand">01</span>
              <div>
                <h4 class="text-sm font-bold text-ink">Management consulting</h4>
                <p class="mt-1 text-xs leading-5 text-muted">Guidance shaped around organizational needs.</p>
              </div>
            </li>
            <li class="history-sticker-note flex gap-3 bg-[#fefce8] px-4 py-3 shadow-sm">
              <span class="pt-0.5 text-xs font-bold tracking-wider text-brand">02</span>
              <div>
                <h4 class="text-sm font-bold text-ink">Research &amp; analysis</h4>
                <p class="mt-1 text-xs leading-5 text-muted">Evidence and insight to support decisions.</p>
              </div>
            </li>
            <li class="history-sticker-note flex gap-3 bg-[#eff6ff] px-4 py-3 shadow-sm">
              <span class="pt-0.5 text-xs font-bold tracking-wider text-brand">03</span>
              <div>
                <h4 class="text-sm font-bold text-ink">IT &amp; business intelligence</h4>
                <p class="mt-1 text-xs leading-5 text-muted">User-friendly digital tools and solutions.</p>
              </div>
            </li>
            <li class="history-sticker-note flex gap-3 bg-white px-4 py-3 shadow-sm">
              <span class="pt-0.5 text-xs font-bold tracking-wider text-brand">04</span>
              <div>
                <h4 class="text-sm font-bold text-ink">Monitoring, evaluation &amp; learning</h4>
                <p class="mt-1 text-xs leading-5 text-muted">Digitized approaches that support learning.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-paper">
    <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div class="text-center">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">What We Do</p>
          <span class="mx-auto mt-3 block h-0.5 w-12 bg-brand" aria-hidden="true"></span>
      </div>
      <div class="mt-9">
        <h2 class="text-3xl font-bold tracking-tight text-ink md:text-4xl">Expertise that moves work forward.</h2>
        <p class="mt-3 max-w-2xl leading-7 text-muted">We provide a wide range of consulting services tailored to your needs.</p>
      </div>

    <div ref="servicesGrid" class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ServiceCard
        v-for="(service, index) in coreServices"
        :key="service.name"
        class="home-service-card"
        :service="service"
        :index="index"
      />
    </div>
    </div>
  </section>

  <section ref="melSection" class="relative isolate overflow-hidden bg-[#071b35] px-5 py-12 md:py-16 lg:px-8">
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <img
        ref="melBackgroundImage"
        src="/176106.png"
        alt=""
        class="absolute left-0 top-[-60%] h-[220%] w-full object-cover opacity-70"
        loading="lazy"
      >
      <div class="mel-background-overlay absolute inset-0"></div>
    </div>
    <div class="relative z-10 mx-auto max-w-7xl border-t border-white/25 pt-10 md:pt-12">
      <div class="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <h2 class="mel-heading relative mt-3 pb-4 text-2xl font-bold leading-tight tracking-tight text-white after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-full after:bg-brand md:text-3xl">
            MEL consulting services for a functional MEL system
          </h2>
        </div>
        <p class="mel-description max-w-3xl border-l-2 border-sky-300/70 pl-5 leading-7 text-white md:self-end">
          CLM Consultants Ltd fosters the implementation of good MEL systems, which are premised on three key points: the culture and context of the organization, the theory of change, and learning moments where practical learning and adaptation occurs.
        </p>
      </div>

      <div class="mt-9 grid gap-4 md:grid-cols-3">
        <article class="mel-principle rounded-xl border border-white/70 p-5 md:p-6">
          <h3 class="text-lg font-semibold leading-snug text-ink">Organizational culture &amp; context</h3>
          <p class="mt-2 text-sm leading-6 text-muted">Shape MEL systems around an organization’s people, priorities, and realities.</p>
        </article>
        <article class="mel-principle rounded-xl border border-white/70 p-5 md:p-6">
          <h3 class="text-lg font-semibold leading-snug text-ink">Theory of change</h3>
          <p class="mt-2 text-sm leading-6 text-muted">Connect planned activities to the outcomes and impact they aim to achieve.</p>
        </article>
        <article class="mel-principle rounded-xl border border-white/70 p-5 md:p-6">
          <h3 class="text-lg font-semibold leading-snug text-ink">Learning moments</h3>
          <p class="mt-2 text-sm leading-6 text-muted">Practical learning and adaptation as the work progresses.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="bg-paper">
    <div class="mx-auto max-w-6xl px-5 py-10 md:py-12 lg:px-8">
      <p class="relative mx-auto mb-6 block w-fit pb-2 text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-10 after:-translate-x-1/2 after:bg-brand">
        Our News &amp; Publications
      </p>
      <div class="grid items-stretch gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div class="flex flex-col justify-center lg:-translate-y-6">
          <h2 class="text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">CLM Consultants Limited News &amp; Publications</h2>
          <p class="mt-4 text-sm leading-6 text-muted">
            CLM Consultants Limited News &amp; Publications showcases our latest insights, project updates, and thought leadership in monitoring, evaluation, and learning (MEL), data analytics, and digital transformation. Through our publications, we share practical experiences, research findings, and innovative solutions that support organizations in making evidence-based decisions and improving performance. Our news updates highlight key achievements, partnerships, and ongoing initiatives, reflecting our commitment to transparency, learning, and continuous improvement across all the sectors we serve.
          </p>
          <RouterLink
            class="button-animated button-animated-light group mt-4 ml-65 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
            :class="{ 'is-activating': isExploreAnimating }"
            to="/news"
            @click.capture.prevent="handleExploreClick"
            @transitionend="handleExploreAnimationEnd"
          >
            Explore
            <svg
              class="h-7 w-7 rotate-45 rounded-full border border-brand p-1.5 text-brand transition duration-300 ease-linear group-hover:rotate-90 group-hover:border-white group-hover:bg-white"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 18V1M1 8l7-7 7 7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>
        </div>
        <div>
          <div
            class="content-card overflow-hidden"
            role="region"
            aria-label="Featured publications"
            aria-roledescription="carousel"
            aria-live="off"
            tabindex="0"
            @mouseenter="stopPublicationTimer"
            @mouseleave="startPublicationTimer"
            @focusin="stopPublicationTimer"
            @focusout="startPublicationTimer"
          >
            <Transition
              mode="out-in"
              @leave="animatePublicationLeave"
              @enter="animatePublicationEnter"
            >
              <div :key="activePublicationIndex" class="publication-slide">
                <div class="relative">
                  <img
                    :src="publications[activePublicationIndex].image"
                    :alt="publications[activePublicationIndex].title"
                    class="publication-image block aspect-[4/3] w-full bg-slate-200 object-cover"
                    loading="eager"
                    decoding="sync"
                    fetchpriority="high"
                  >
                  <div class="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-950/65 to-transparent px-4 pb-8 pt-4 text-xs font-semibold tracking-wide text-white">
                    <span class="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">Featured publication</span>
                    <span aria-label="Slide number">{{ String(activePublicationIndex + 1).padStart(2, '0') }} / {{ String(publications.length).padStart(2, '0') }}</span>
                  </div>
                  <button
                    class="button-quiet absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-slate-950/45 text-2xl leading-none text-white shadow-lg backdrop-blur-sm transition hover:bg-slate-950/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    type="button"
                    aria-label="Previous publication"
                    @click="showPublication(activePublicationIndex - 1)"
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    class="button-quiet absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-slate-950/45 text-2xl leading-none text-white shadow-lg backdrop-blur-sm transition hover:bg-slate-950/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    type="button"
                    aria-label="Next publication"
                    @click="showPublication(activePublicationIndex + 1)"
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
                <div class="flex min-h-28 flex-1 items-center p-4 md:p-5">
                  <h3 class="publication-title text-base font-bold leading-snug text-ink md:text-lg">
                    {{ publications[activePublicationIndex].title }}
                  </h3>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>

  </div>
</template>
