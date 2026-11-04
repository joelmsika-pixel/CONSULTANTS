<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

async function logout() {
  try {
    await auth.logout()
    await router.push('/')
  } catch (error) {
    auth.error = error.message
  }
}

</script>

<style scoped>
.mobile-nav-link {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  color: rgb(255 255 255 / 68%);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  transition: color 150ms ease;
}

.mobile-nav-link.router-link-exact-active,
.mobile-nav-link[aria-expanded="true"] {
  color: white;
}

.mobile-nav-link.router-link-exact-active .mobile-nav-icon,
.mobile-nav-link[aria-expanded="true"] .mobile-nav-icon {
  color: #7dd3fc;
}

.mobile-nav-icon {
  width: 1.65rem;
  height: 1.65rem;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-nav-link {
    transition: none;
  }
}
</style>

<template>
  <div class="min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-20 sm:pt-[5.5rem] xl:pb-0 xl:pt-0" :class="{ 'bg-paper': route.name === 'register' }">
    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/95 text-white shadow-md backdrop-blur-none xl:sticky xl:inset-x-auto xl:backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
        <RouterLink class="shrink-0" to="/" aria-label="CLM Consultants home">
          <img class="h-12 w-36 object-contain brightness-0 invert min-[380px]:h-14 min-[380px]:w-44 sm:h-16 sm:w-64 xl:h-20 xl:w-80" src="/clm-logo%20(2).png" alt="CLM Consultants — transforming community-led monitoring data for better services">
        </RouterLink>

        <RouterLink
          class="inline-flex min-h-10 shrink-0 items-center justify-center gap-1 rounded-md bg-brand px-2 text-[0.65rem] font-bold text-white shadow-sm transition hover:bg-brand-dark min-[380px]:px-2.5 min-[380px]:text-[0.7rem] xl:hidden"
          to="/consultation"
        >
          Request consultation
        </RouterLink>

        <nav class="ml-auto hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <RouterLink class="nav-link" to="/about">Who we are</RouterLink>
          <RouterLink class="nav-link" to="/services">What we do</RouterLink>
          <RouterLink class="nav-link" to="/news">News</RouterLink>
          <RouterLink class="nav-link" to="/faq">FAQs</RouterLink>
          <RouterLink class="nav-link" to="/contact">Contact us</RouterLink>
          <RouterLink class="nav-link" to="/forum">Forum</RouterLink>
          <RouterLink v-if="auth.user?.can_manage_consultations" class="nav-link" to="/admin">Admin</RouterLink>
          <RouterLink v-else-if="auth.user?.can_manage_content" class="nav-link" to="/admin/content">Content</RouterLink>
          <RouterLink v-else-if="auth.user?.can_moderate_forum" class="nav-link" to="/admin/forum">Moderation</RouterLink>
          <RouterLink v-if="!auth.isAuthenticated" class="nav-link" to="/login">Sign in</RouterLink>
          <button v-else class="nav-link text-left" type="button" @click="logout">Sign out</button>
          <RouterLink
            class="consultation-link ml-2 inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-dark"
            to="/consultation"
          >
            Request Consultation
          </RouterLink>
        </nav>
      </div>
    </header>

    <nav class="fixed inset-x-0 bottom-0 z-[65] border-t border-white/10 bg-navy/95 px-2 pt-2 text-white shadow-[0_-8px_24px_rgba(2,12,27,0.18)] backdrop-blur-xl xl:hidden" aria-label="Mobile navigation">
      <div class="mx-auto grid max-w-lg grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        <RouterLink class="mobile-nav-link min-h-16" to="/" aria-label="Home">
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>
          <span>Home</span>
        </RouterLink>
        <RouterLink class="mobile-nav-link min-h-16" to="/about" aria-label="About">
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.7" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
          <span>About</span>
        </RouterLink>
        <RouterLink class="mobile-nav-link min-h-16" to="/services" aria-label="What We Do">
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7" /><rect x="13.5" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7" /><rect x="3.5" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7" /><rect x="13.5" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.7" /></svg>
          <span>What We Do</span>
        </RouterLink>
        <RouterLink class="mobile-nav-link min-h-16" to="/news" aria-label="News">
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h13a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
          <span>News</span>
        </RouterLink>
        <RouterLink class="mobile-nav-link min-h-16" to="/faq" aria-label="Frequently asked questions">
          <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7" /><path d="M9.6 9a2.45 2.45 0 1 1 4.2 1.7c-1.1 1.1-1.8 1.4-1.8 2.8M12 17.1v.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
          <span>FAQs</span>
        </RouterLink>
      </div>
    </nav>

    <p v-if="auth.error" class="mx-auto max-w-7xl px-5 py-2 text-sm text-red-700" role="status">
      {{ auth.error }}
    </p>

    <main>
      <slot />
    </main>

    <div v-if="route.name !== 'login' && route.name !== 'register'" class="bg-paper pt-8">
      <footer class="relative overflow-hidden bg-[#041d3b] text-white">
        <div class="h-1 bg-gradient-to-r from-brand via-sky-400 to-emerald-300"></div>
        <div class="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 sm:py-10 lg:grid-cols-[1.25fr_1fr_0.8fr] lg:gap-12 lg:px-8 lg:py-10">
          <section>
            <h2 class="text-sm font-bold tracking-[0.16em] text-white">CLM CONSULTANTS</h2>
            <p class="mt-5 max-w-lg text-sm leading-7 text-slate-300">
              Our research services help businesses and organizations collect quality data, conduct advanced data analysis and interpret the results, develop business and program data demand and use, and identify promising practices to nurture into best practices.
            </p>
          </section>

          <section>
            <h2 class="text-sm font-bold tracking-[0.16em] text-white">OFFICE CONTACTS</h2>
            <address class="mt-5 space-y-6 text-sm not-italic text-slate-300">
              <div>
                <h3 class="mb-2 text-xs font-bold tracking-[0.14em] text-white">VISIT US</h3>
                <p class="flex items-start gap-3">
                  <svg class="mt-0.5 h-5 w-5 shrink-0 text-sky-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                    <circle cx="12" cy="10" r="2.2" stroke="currentColor" stroke-width="1.7" />
                  </svg>
                  <span>Dar es Salaam, Tanzania</span>
                </p>
              </div>
              <div>
                <h3 class="mb-2 text-xs font-bold tracking-[0.14em] text-white">CALL</h3>
                <p class="flex items-start gap-3">
                  <svg class="mt-0.5 h-5 w-5 shrink-0 text-sky-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7.2 3.5h2.5l1.2 4.1-1.8 1.8a15 15 0 0 0 5.5 5.5l1.8-1.8 4.1 1.2v2.5a2 2 0 0 1-2.2 2A16.3 16.3 0 0 1 5.2 5.7a2 2 0 0 1 2-2.2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="flex flex-col gap-2">
                    <a class="transition-colors hover:text-white" href="tel:+255765785383">+255 765 785 383</a>
                    <a class="transition-colors hover:text-white" href="tel:+255734766128">+255 734 766 128</a>
                  </span>
                </p>
              </div>
              <div>
                <h3 class="mb-2 text-xs font-bold tracking-[0.14em] text-white">EMAIL</h3>
                <p class="flex items-start gap-3">
                  <svg class="mt-0.5 h-5 w-5 shrink-0 text-sky-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7" />
                    <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="flex min-w-0 flex-col gap-2">
                    <a class="break-all transition-colors hover:text-white" href="mailto:info@clmconsultants.co.tz">info@clmconsultants.co.tz</a>
                    <a class="break-all transition-colors hover:text-white" href="mailto:pshoki@clmconsultants.co.tz">pshoki@clmconsultants.co.tz</a>
                    <a class="break-all transition-colors hover:text-white" href="mailto:shokipn2000@gmail.com">shokipn2000@gmail.com</a>
                  </span>
                </p>
              </div>
            </address>
          </section>

          <nav aria-label="Useful links">
            <h2 class="text-sm font-bold tracking-[0.16em] text-white">USEFUL LINKS</h2>
            <ul class="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-slate-300 sm:grid-cols-1">
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/">Home</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/about">Who we are</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/services">What we do</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/news">News</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/faq">FAQs</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/contact">Contact us</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/consultation">Request consultation</RouterLink></li>
              <li><RouterLink class="transition-colors hover:text-sky-200" to="/forum">Forum</RouterLink></li>
            </ul>
          </nav>

          <div class="border-t border-white/10 pt-4 sm:col-span-2 lg:col-span-3">
            <p class="text-xs text-slate-400">
              © {{ new Date().getFullYear() }} CLM Consultants. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 2.9rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid transparent;
  border-radius: 0.6rem;
  color: rgb(255 255 255 / 85%);
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  transition: color 150ms ease, background-color 150ms ease, border-color 150ms ease;
}

.nav-link::after {
  display: none;
  position: absolute;
  right: 0.5rem;
  bottom: 0.25rem;
  left: 0.5rem;
  height: 2px;
  background: #fff;
  content: "";
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.nav-link:hover {
  color: #fff;
  background-color: rgb(255 255 255 / 7%);
  border-color: rgb(255 255 255 / 8%);
}

@media (min-width: 1280px) {
  .nav-link {
    min-height: auto;
    padding: 0.7rem 0.55rem;
    border-color: transparent;
    border-radius: 0.5rem;
    font-size: 0.73rem;
  }

  .nav-link::after {
    display: block;
  }

  .nav-link:hover {
    background-color: transparent;
    border-color: transparent;
  }

  .nav-link:hover::after,
  .router-link-exact-active.nav-link::after {
    transform: scaleX(1);
  }
}

.router-link-exact-active.nav-link {
  color: #fff;
  background-color: rgb(255 255 255 / 10%);
  border-color: rgb(255 255 255 / 12%);
}

@media (min-width: 1280px) {
  .router-link-exact-active.nav-link {
    background-color: transparent;
    border-color: transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .nav-link::after {
    transition: none;
  }
}

.consultation-link {
  white-space: nowrap;
}
</style>
