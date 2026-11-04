<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import PageBanner from '../components/PageBanner.vue'

const aboutIntro = ref(null)
let introAnimationContext

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !aboutIntro.value) {
    return
  }

  introAnimationContext = gsap.context(() => {
    const timeline = gsap.timeline()
    timeline.fromTo('.about-intro-copy', {
      autoAlpha: 0,
      y: 24,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    })
    timeline.fromTo('.founder-portrait', {
      autoAlpha: 0,
      y: 28,
      scale: 0.97,
    }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')
  }, aboutIntro.value)
})

onUnmounted(() => introAnimationContext?.revert())

const strategicServices = [
  {
    title: 'Monitoring, Evaluation, and Learning (MEL) Systems',
    items: [
      'Develop digital MEL systems using KoBoToolbox or Google Sheets with Microsoft Power BI.',
      'Develop digital monitoring and evaluation systems using KoBoToolbox or Google Sheets with Microsoft Power BI.',
      'Develop M&E data analytics and visualizations using Microsoft Power BI.',
      'Design Key Performance Indicators in Management Information Systems (KPI-MIS).',
      'Strengthen Key Performance Indicator Management Information Systems (KPI-MIS).',
      'Design data analytics and visualizations using Microsoft Power BI.',
    ],
  },
  {
    title: 'Community-led Monitoring Systems',
    items: [
      'Develop community-led monitoring (CLM) data analytics and visualizations using Microsoft Power BI.',
      'Develop Community-Led Monitoring, Evaluation, Accountability, and Learning (CoLMEAL) data analytics and visualizations using Microsoft Power BI.',
      'Facilitate CoLMEAL capacity-building frameworks for NGO staff and partners.',
      'Facilitate joint proposals that integrate CoLMEAL into project designs.',
      'Facilitate community-led updates and development of policies and guidance for CoLMEAL processes.',
    ],
  },
  {
    title: 'Data Management and Organizational Performance',
    items: [
      'Design and manage mobile M&E data collection.',
      'Perform thematic data analysis.',
      'Conduct evaluation research and project evaluations.',
      'Carry out Organizational Capacity Assessments (OCA).',
      'Develop organizational data management strategies.',
    ],
  },
]

const serviceAreas = [
  {
    title: 'Monitoring',
    description: 'Our monitoring expertise helps organizations manage, track, analyze, and report on progress. We help develop and implement effective business and program monitoring, strengthen research and evaluation capacity, and support evidence-based decisions.',
  },
  {
    title: 'Evaluation',
    description: 'Our rigorous evaluation methods reveal what works and why. We help organizations measure impact, improve programming, and monitor outcomes.',
  },
  {
    title: 'Digitalization',
    description: 'Our digital consultancy identifies your needs and develops client-centered concepts and solutions.',
  },
  {
    title: 'Business Intelligence (BI) Solutions',
    description: 'Tailored BI solutions help analyze the reach of your interventions and streamline data strategy and M&E for better results and learning.',
  },
  {
    title: 'Information Technology (IT) Solutions',
    description: 'Tailored IT solutions help you reach more people and make data management and M&E easier.',
  },
]

const monitoringSupport = [
  ['Theory of change and results models', 'Developing a solid theory of change as a basis for monitoring.'],
  ['Indicators', 'Identifying and formulating indicators to measure qualitative and quantitative data.'],
  ['Data collection', 'Identifying accessible data sources and developing efficient data collection methods.'],
  ['Data processing and analysis', 'Processing and analyzing collected data to produce useful insights.'],
  ['Reporting', 'Developing clear reports on progress and achievements.'],
  ['Organizational development', 'Assessing monitoring readiness and providing organizational recommendations.'],
  ['Results communication', 'Finding effective ways to communicate and visualize results.'],
  ['Capacity development', 'Building monitoring capabilities through tailored development measures.'],
  ['BI solutions', 'Developing business intelligence features that integrate data sources, support data preparation and analysis, manage access, and provide scheduled or ad-hoc reporting and interactive visualizations.'],
  ['IT solutions', 'Developing or selecting digital solutions—from customized spreadsheets to web-based systems and mobile apps—to make monitoring more user-friendly and effective.'],
]

const evaluationSupport = [
  ['Theory of change and results models', 'Developing models that help ensure an intervention can be evaluated, using existing information, surveys, and targeted data collection.'],
  ['International standards', 'Applying standards and approaches used by OECD-DAC, DCED, the EU, GIZ, the World Bank, SDC, and others.'],
  ['Counterfactual-based evaluations', 'Designing experimental and quasi-experimental evaluations.'],
  ['Theory-based evaluations', 'Applying behavioral models, including the Theory of Planned Behavior and Goal Setting Theory.'],
  ['Survey design', 'Developing surveys that build shared understanding between evaluation teams and clients, and support user-friendly data collection.'],
  ['Capacity development', 'Strengthening evaluation capabilities and making activity-tracking data useful for reporting.'],
  ['BI solutions', 'Using digital business intelligence features for M&E processes, routine data, scheduled and ad-hoc reporting, and interactive visualizations.'],
  ['IT solutions', 'Advising on online surveys and mobile data collection to improve evaluation data collection and analysis.'],
]

const learningApproaches = [
  'Develop adaptive strategies that support practical learning.',
  'Foster curiosity as a foundation for a learning culture.',
  'Facilitate the integration of information and communication technology (ICT) into data collection, reporting, and analysis.',
]
</script>

<template>
  <div>
    <PageBanner
      title="About Us"
      subtitle="Independent thinking, practical collaboration, and solutions that move communities forward."
      background-image="/image_1fdb8de1.jpg"
      large
      full-background
      :show-breadcrumb="false"
    />

    <main>
      <section ref="aboutIntro" class="bg-white px-5 py-10 md:py-12 lg:px-8">
        <div class="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.55fr_0.65fr] lg:gap-12">
          <div class="about-intro-copy">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-brand">About CLM Consultants</p>
            <h2 class="mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
              A motivated team bringing diverse expertise together.
            </h2>
            <div class="mt-5 max-w-3xl space-y-3 text-sm leading-6 text-muted">
              <p>
                CLM Consultants is a rapidly expanding company with a highly motivated team of specialists from many fields and specialties working together. CLM Consultants Limited offers a range of management consulting services.
              </p>
              <p>
                As part of our information technology (IT) and business intelligence (BI) solutions, we offer consulting in monitoring, evaluation, and learning digitalization, as well as user-friendly digital technologies.
              </p>
              <p>
                Our research services help businesses and organizations collect quality data, conduct advanced data analysis and interpret the results, develop business and program data demand and use, and identify promising practices to nurture into best practices.
              </p>
              <p>
                Many of our on-call professionals have worked with well-known companies. As we collaborate on more projects with international and bilateral funders and nonprofit organizations, we continue to seek excellent people to join our diverse team.
              </p>
            </div>
          </div>
          <figure class="founder-portrait mx-auto w-full max-w-[17rem] overflow-hidden rounded-2xl border border-line bg-white shadow-md lg:justify-self-end">
            <img
              src="/pantaleon.png"
              alt="Dr. Pantaleon Shoki, Founder and Director of CLM Consultants Ltd."
              class="aspect-[4/5] w-full object-cover object-center"
              loading="lazy"
            >
            <figcaption class="border-t border-line px-4 py-4 text-center">
              <h3 class="text-base font-bold tracking-tight text-ink">Dr. Pantaleon Shoki</h3>
              <p class="mt-1 text-sm leading-5 text-muted">Founder &amp; Director, CLM Consultants Ltd.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="bg-paper px-5 py-10 md:py-12 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-brand">How we help</p>
          <h2 class="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-ink md:text-3xl">Strategic, customer-centered services</h2>
          <div class="mt-7 grid gap-4 lg:grid-cols-3">
            <article v-for="group in strategicServices" :key="group.title" class="content-card p-5">
              <h3 class="text-base font-bold leading-snug text-ink md:text-lg">{{ group.title }}</h3>
              <ul class="mt-3 space-y-2.5">
                <li v-for="item in group.items" :key="item" class="flex gap-3 text-sm leading-5 text-muted">
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article v-for="area in serviceAreas" :key="area.title" class="rounded-xl border border-line bg-white p-4">
              <h3 class="text-sm font-bold text-ink md:text-base">{{ area.title }}</h3>
              <p class="mt-2 text-sm leading-5 text-muted">{{ area.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-white px-5 py-10 md:py-12 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-brand">Our approach</p>
          <h2 class="mt-3 max-w-4xl text-2xl font-bold tracking-tight text-ink md:text-3xl">MEL consulting services for a functional MEL system</h2>
          <p class="mt-4 max-w-4xl text-sm leading-6 text-muted">
            CLM Consultants Ltd fosters the implementation of effective MEL systems built around three key elements: the culture and context of the organization, its theory of change, and the moments where practical learning and adaptation occur.
          </p>

          <div class="mt-7 grid gap-5 lg:grid-cols-2">
            <article class="rounded-2xl border border-line bg-paper p-5 md:p-6">
              <span class="text-xs font-bold uppercase tracking-[0.16em] text-brand">01 · Monitor</span>
              <h3 class="mt-2 text-xl font-bold text-ink">Monitoring</h3>
              <div class="mt-3 space-y-3 text-sm leading-6 text-muted">
                <p>
                  Monitoring progress and impact supports transparent, accountable, and informed management. Whether you want to assess monitoring capability, improve existing mechanisms, or establish a new system, CLM Consultants Ltd can help.
                </p>
                <p>
                  We develop digital monitoring mechanisms and provide organizational development support to help you track and analyze progress, report achievements, and make evidence-based decisions.
                </p>
              </div>
              <ul class="mt-4 space-y-2.5">
                <li v-for="item in monitoringSupport" :key="item[0]" class="border-t border-line pt-2.5 text-sm leading-5 text-muted">
                  <strong class="text-ink">{{ item[0] }}:</strong> {{ item[1] }}
                </li>
              </ul>
            </article>

            <div class="space-y-6">
              <article class="rounded-2xl border border-line bg-white p-5 shadow-sm md:p-6">
                <span class="text-xs font-bold uppercase tracking-[0.16em] text-brand">02 · Evaluate</span>
                <h3 class="mt-2 text-xl font-bold text-ink">Evaluation</h3>
                <div class="mt-3 space-y-3 text-sm leading-6 text-muted">
                  <p>
                    Institutional learning requires evaluation against defined objectives. Preliminary, interim, and final evaluations using credible procedures are essential.
                  </p>
                  <p>
                    We evaluate projects, programs, strategies, and organizational performance to deliver practical lessons and recommendations, using the methodology best suited to your needs.
                  </p>
                </div>
                <ul class="mt-4 space-y-2.5">
                  <li v-for="item in evaluationSupport" :key="item[0]" class="border-t border-line pt-2.5 text-sm leading-5 text-muted">
                    <strong class="text-ink">{{ item[0] }}:</strong> {{ item[1] }}
                  </li>
                </ul>
              </article>

              <article class="rounded-2xl border border-line bg-brand-soft/60 p-5 md:p-6">
                <span class="text-xs font-bold uppercase tracking-[0.16em] text-brand">03 · Learn</span>
                <h3 class="mt-2 text-xl font-bold text-ink">Learning</h3>
                <p class="mt-3 text-sm leading-6 text-muted">
                  Learning moments help retain knowledge for future use, including valuable tacit knowledge. We help teams turn learning into practical action.
                </p>
                <ul class="mt-4 space-y-3">
                  <li v-for="approach in learningApproaches" :key="approach" class="flex gap-3 text-sm leading-6 text-ink">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true"></span>
                    <span>{{ approach }}</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
