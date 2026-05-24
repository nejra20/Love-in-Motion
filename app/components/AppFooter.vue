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

      <p class="serif-heading" style="font-size:0.75rem;color:rgba(245,240,232,0.4);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:28px">
        Terima Kasih
      </p>

      <!-- Couple photo -->
      <div class="footer-photo-wrap">
        <img src="/images/couple.jpg" alt="Rizky & Anisa" class="footer-photo" @error="imgErr = true" />
        <div v-if="imgErr" class="footer-photo-fallback" />
      </div>

      <!-- Names -->
      <p class="sec-label" style="color:rgba(201,169,110,0.55);margin-bottom:6px">KAMI YANG BERBAHAGIA</p>
      <h2 class="script-heading" style="font-size:clamp(2rem,5vw,3rem);color:#f5f0e8;margin-bottom:20px">Rizky &amp; Anisa</h2>

      <!-- Closing text -->
      <p class="closing-text">
        Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do'a restu kepada kami.
      </p>

      <div class="divider-h" style="opacity:0.12;margin:28px auto;max-width:240px" />

      <!-- Social -->
      <div class="social-row">
        <a href="#" class="social-btn" aria-label="Instagram"><Instagram :size="16" /></a>
        <a href="#" class="social-btn" aria-label="WhatsApp"><MessageCircle :size="16" /></a>
      </div>

      <p class="made-with">Made with love · Love in Motion</p>
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
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a96e' fill-opacity='0.025'%3E%3Cpath d='M40 0L43 13H57L46 21L49 34L40 26L31 34L34 21L23 13H37L40 0Z'/%3E%3C/g%3E%3C/svg%3E");
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
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 24px;
  border: 2px solid rgba(201,169,110,0.3);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
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
.footer-photo-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5a1a1a 0%, #3d1010 100%);
}

.closing-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  line-height: 1.9;
  color: rgba(245,240,232,0.5);
  max-width: 420px;
  margin: 0 auto;
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
