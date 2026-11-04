<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageBanner from '../components/PageBanner.vue'
import { faqSections } from '../data/faqSections'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()
const faqPage = ref(null)
const faqTimeline = ref(null)
let faqAnimationContext

watch(() => route.hash, async (hash) => {
  if (!hash) return

  await router.replace({ path: route.path, query: route.query })
  await nextTick()
  window.requestAnimationFrame(() => window.scrollTo(0, 0))
}, { immediate: true })

onMounted(() => {
  window.requestAnimationFrame(() => window.scrollTo(0, 0))
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && faqPage.value) {
    faqAnimationContext = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro.fromTo('.faq-intro-copy > *', {
        autoAlpha: 0,
        y: 20,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      })
      intro.fromTo('.faq-topic-plank', {
        autoAlpha: 0,
        x: 16,
      }, {
        autoAlpha: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.08,
      }, '-=0.25')

      gsap.to('.faq-timeline-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: faqTimeline.value,
          start: 'top 58%',
          end: 'bottom 58%',
          scrub: true,
        },
      })

      gsap.utils.toArray('.faq-category').forEach((section) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 15%',
            scrub: true,
          },
        })

        timeline.fromTo(section.querySelector('.faq-timeline-marker'), {
          autoAlpha: 0,
          scale: 0.55,
          y: 12,
        }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
        })
        timeline.fromTo(section.querySelector('.faq-category-content'), {
          autoAlpha: 0,
          x: 24,
        }, {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: 0.7,
        })
        timeline.fromTo(section.querySelector('.faq-category-heading'), {
          autoAlpha: 0,
          y: 12,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        })
        timeline.fromTo(section.querySelectorAll('.faq-question'), {
          autoAlpha: 0,
          y: 14,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.22,
        })
      })
    }, faqPage.value)
  }

})

onUnmounted(() => faqAnimationContext?.revert())
</script>

<template>
  <div ref="faqPage">
    <PageBanner
      title="Frequently Asked Questions"
      subtitle="Clear answers about our services and working together."
      background-image="/FAQ.jpg"
      :large="true"
      :full-background="true"
      :show-breadcrumb="false"
    />
    <main class="bg-paper px-5 py-10 md:py-14 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <section class="grid gap-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:items-center lg:gap-12">
          <div class="faq-intro-copy">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand">Here to help</p>
            <h1 class="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
              Our Frequently Asked Questions
            </h1>
            <p class="mt-4 max-w-2xl leading-7 text-muted">
              Welcome to CLM Consultants Limited’s FAQs! Here, we answer common questions about our management consulting services, IT and business intelligence solutions, and MEL digitization. Whether you’re looking to enhance efficiency, integrate digital tools, or explore data-driven decision-making, this section will guide you.
            </p>
          </div>
          <section class="faq-topic-board" aria-labelledby="faq-board-title">
            <h2 id="faq-board-title" class="faq-topic-title text-sm font-bold text-ink">
              Browse a topic
            </h2>
            <ul class="space-y-2.5">
              <li
                v-for="(section, index) in faqSections"
                :key="section.id"
                class="faq-topic-plank"
              >
                <span class="faq-topic-number">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ section.title }}</span>
              </li>
            </ul>
          </section>
        </section>

        <div ref="faqTimeline" class="faq-timeline relative mt-10 space-y-7 md:mt-12 md:space-y-9">
          <div class="faq-timeline-track" aria-hidden="true">
            <div class="faq-timeline-progress"></div>
          </div>
          <section
            v-for="(section, index) in faqSections"
            :id="section.id"
            :key="section.id"
            class="faq-category scroll-mt-24 grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-6"
            :aria-labelledby="`${section.id}-title`"
          >
            <div class="relative z-10 flex justify-center">
              <span class="faq-timeline-marker flex h-10 w-10 items-center justify-center rounded-full border-4 border-paper bg-brand text-xs font-bold text-white shadow-md shadow-brand/20 md:h-12 md:w-12 md:text-sm" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>
            <div class="faq-category-content rounded-2xl border border-line bg-white p-4 shadow-sm md:p-7">
              <div class="faq-category-heading mb-5 flex items-start gap-3 border-b border-line pb-4 md:items-center md:gap-4">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand md:h-11 md:w-11" aria-hidden="true">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
                    <path d="M9.6 9a2.45 2.45 0 1 1 4.2 1.7c-1.1 1.1-1.8 1.4-1.8 2.8M12 17.1v.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                </span>
                <div>
                  <p class="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand">Frequently asked</p>
                <h2 :id="`${section.id}-title`" class="mt-1 text-lg font-bold leading-snug text-ink md:text-xl">
                  {{ section.title }}
                </h2>
                </div>
              </div>
              <div class="space-y-3">
                <details
                  v-for="(item, questionIndex) in section.questions"
                  :key="item.question"
                  class="faq-question group rounded-xl border border-line bg-white transition-colors open:border-brand/35 open:bg-brand-soft/30 hover:border-brand/35"
                >
                  <summary class="flex cursor-pointer list-none items-center gap-3 p-4 font-semibold leading-6 text-ink marker:hidden md:px-5">
                    <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper text-xs font-bold text-muted group-open:bg-brand group-open:text-white">
                      {{ String(questionIndex + 1).padStart(2, '0') }}
                    </span>
                    <span class="flex-1">{{ item.question }}</span>
                    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p class="ml-10 border-t border-line px-4 py-4 text-sm leading-7 text-muted md:ml-12 md:px-5">
                    {{ item.answer }}
                  </p>
                </details>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.faq-topic-board {
  display: grid;
  gap: 0.75rem;
  border-radius: 0.5rem;
  background: #f1f5f9;
  padding: 1rem;
}

.faq-topic-title {
  background: #fff2b8;
  padding: 1rem 1.25rem;
  box-shadow: 0 5px 10px rgb(46 37 22 / 18%);
  transform: rotate(-1deg);
}

.faq-topic-plank {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #fff;
  padding: 0.75rem 1rem;
  box-shadow: 0 1px 2px rgb(46 37 22 / 8%);
  color: #3e4c5d;
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.35;
  transform: rotate(var(--sticker-rotation, 0deg));
}

.faq-topic-plank:nth-child(1) {
  --sticker-rotation: 0.5deg;
}

.faq-topic-plank:nth-child(2) {
  --sticker-rotation: -0.4deg;
  background: #fefce8;
}

.faq-topic-plank:nth-child(3) {
  --sticker-rotation: 0.35deg;
  background: #eff6ff;
}

.faq-topic-plank:nth-child(4) {
  --sticker-rotation: -0.5deg;
}

.faq-topic-number {
  flex: 0 0 auto;
  padding-top: 0.125rem;
  color: #0875e1;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

@media (prefers-reduced-motion: reduce) {
  .faq-topic-title,
  .faq-topic-plank {
    transform: none;
  }
}

.faq-timeline-track {
  position: absolute;
  top: 1.25rem;
  bottom: 1.25rem;
  left: 1.3125rem;
  width: 2px;
  overflow: hidden;
}

.faq-timeline-progress {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0875e1, rgb(8 117 225 / 48%));
  transform: scaleY(0);
  transform-origin: top;
}

@media (min-width: 768px) {
  .faq-timeline-track {
    left: 2.4375rem;
  }
}
</style>
