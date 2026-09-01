<template>
  <section class="hero section-dark">
    <!-- Full-width hero image with overlay -->
    <div class="hero-banner" ref="bannerEl">
      <img src="/images/backdrop1.jpg" alt="Nejra & Riad" class="hero-banner-img" @error="imgErr = true" />
      <div v-if="imgErr" class="hero-banner-fallback" />
      <div class="hero-banner-overlay" />

      <!-- Text overlay on image for mobile -->
      <div class="hero-banner-text">
        <p class="sec-label" style="color:#D49128;margin-bottom:8px">Pozivamo Vas na vjenčanje</p>
        <div class="monogram">
          <span>N</span>
          <span class="sep">|</span>
          <span>R</span>
        </div>
        <p class="serif-heading hero-names" style="color:#f5f0e8">Nejre &amp; Riada</p>
        <p class="sec-label" style="color:#D49128;letter-spacing:0.25em;margin-top:6px">17 · 10 · 2026</p>
      </div>
    </div>

    <!-- Countdown row -->
    <div class="hero-countdown" ref="countEl">
      <div class="inner" style="padding-top:80px;padding-bottom:80px">

        <div class="cd-row">
          <div v-for="unit in countdown" :key="unit.label" class="cd-box">
            <p class="cd-num serif-heading">{{ unit.value }}</p>
            <p class="cd-label sec-label">{{ unit.label }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const imgErr   = ref(false)
const bannerEl = ref<HTMLElement>()
const countEl  = ref<HTMLElement>()

const WEDDING = new Date('2026-10-17T08:00:00')
const countdown = ref([
  { label: 'Dani',  value: '00' },
  { label: 'Sati',   value: '00' },
  { label: 'Minute', value: '00' },
  { label: 'Sekunde', value: '00' },
])

function tick() {
  const diff = WEDDING.getTime() - Date.now()
  const d = Math.max(0, Math.floor(diff / 86400000))
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000))
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000))
  const s = Math.max(0, Math.floor((diff % 60000) / 1000))
  countdown.value = [
    { label: 'Dani',  value: String(d).padStart(2, '0') },
    { label: 'Sati',   value: String(h).padStart(2, '0') },
    { label: 'Minute', value: String(m).padStart(2, '0') },
    { label: 'Sekunde', value: String(s).padStart(2, '0') },
  ]
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  tick()
  timer = setInterval(tick, 1000)

  gsap.from(bannerEl.value?.querySelector('.hero-banner-text'), {
    opacity: 0, y: 40, duration: 1.2, ease: 'power2.out', delay: 0.2
  })
  gsap.from(countEl.value?.querySelectorAll('.cd-box') ?? [], {
    opacity: 0, y: 30, scale: 0.9, stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: countEl.value, start: 'top 85%' }
  })
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.hero { overflow: hidden; }

/* Banner */
.hero-banner {
  position: relative;
  height: 70vh;
  min-height: 400px;
  max-height: 700px;
  overflow: hidden;
}
@media (min-width: 768px) {
  .hero-banner { height: 85vh; max-height: 900px; }
}
.hero-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}
.hero-banner-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, #1c4329 0%, #0f2b1a 100%);
}
.hero-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(26,5,7,0.2) 0%, rgba(26,5,7,0.5) 100%);
}

.hero-banner-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 40px 24px 48px;
}
@media (min-width: 768px) {
  .hero-banner-text { padding: 60px 48px 72px; }
}

.monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 8vw, 6rem);
  font-weight: 400;
  color: #f5f0e8;
}
.monogram .sep {
  color: #D49128;
  font-size: 0.5em;
  margin-bottom: 8px;
  opacity: 0.8;
}
.hero-names {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color:#0f2b1a;
  margin: 4px 0 0;
  letter-spacing: 0.06em;
}

/* Countdown */
.hero-countdown {
  background: #f5f0e8;
}
.cd-box{
  background-color: #1c4329;
}
.cd-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
@media (min-width: 768px) {
  .cd-row { gap: 20px; }
}
.cd-num {
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  color: #f5f0e8;
  margin: 0;
  line-height: 1;
}
.cd-label {
  color: #f5f0e8;
  margin-top: 5px;
  font-size: 9px;
}
.ornament::before, .ornament::after {
  background: linear-gradient(to right, transparent, #D49128);
}
.ornament::after {
  background: linear-gradient(to left, transparent, #D49128);
}

</style>
