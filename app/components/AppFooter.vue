<template>
  <footer class="section-dark footer-root" ref="el">
    <div class="texture-overlay" />
    <div class="inner footer-inner">

      <!-- Top ornament -->
      <div class="gold-divider">
        <div class="gold-line" />
        <Heart :size="14" fill="#c9a96e" style="color:#c9a96e;opacity:0.7;flex-shrink:0" />
        <div class="gold-line" />
      </div>

      <!-- Couple photo -->
      <div class="footer-photo-wrap">
        <img src="/images/dove.png" alt="Riad & Nejra" class="footer-photo" @error="imgErr = true" />
        <div v-if="imgErr" class="footer-photo-fallback" />
      </div>

      <!-- Names -->
      <p class="sec-label" style="color:#D49128;margin-bottom:6px">S ljubavlju</p>
      <h2 class="script-heading" style="font-size:clamp(2rem,5vw,3rem);color:#f5f0e8;margin-bottom:20px">Riad &amp; Nejra</h2>

      <div class="divider-h" style="opacity:0.12;margin:28px auto;max-width:240px" />

      <p class="made-with">Made with love</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Heart, Instagram, MessageCircle } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el     = ref<HTMLElement>()
const imgErr = ref(false)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value, { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 88%' } })
})
</script>

<style scoped>
.footer-root {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 72px 0 64px;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.texture-overlay {
  position: absolute;
  inset: 0;
   pointer-events: none;
}

.gold-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 280px;
}
.gold-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(201,169,110,0.5), transparent);
}

.footer-photo-wrap {
  width: 140px;
  height: 140px;
  overflow: hidden;
  margin: 0 auto 24px;
}
@media (min-width: 640px) {
  .footer-photo-wrap { width: 160px; height: 160px; }
}
.footer-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 28px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(245,240,232,0.18);
  color: rgba(245,240,232,0.45);
  transition: all 0.25s;
  text-decoration: none;
}
.social-btn:hover {
  background: rgba(255,255,255,0.07);
  color: rgba(245,240,232,0.85);
  border-color: rgba(245,240,232,0.35);
}

.made-with {
  font-family: 'Poppins', sans-serif;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.18);
}
</style>
