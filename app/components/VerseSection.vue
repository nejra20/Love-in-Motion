<template>
  <section class="section-cream" style="padding:80px 0">
    <div class="inner" ref="el">
      <div style="text-align:center;max-width:600px;margin:0 auto">
        <div class="ornament" style="margin-bottom:32px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D49128" stroke-width="1.5" opacity="0.8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <blockquote class="serif-heading verse-text">
          "Ljubav ne zahtijeva da dvoje ljudi gledaju jedno u drugo, već da zajedno gledaju u istom pravcu."
        </blockquote>

        <p class="serif-heading" style="font-size:0.9rem;color:#c9a96e;font-style:italic;margin-top:20px">Antoine de Saint-Exupéry</p>

        <div class="ornament" style="margin-top:32px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D49128" stroke-width="1.5" opacity="0.8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const el = ref<HTMLElement>()
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value, { opacity: 0, y: 30, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
})
</script>

<style scoped>
.verse-text {
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  line-height: 1.9;
  color: #f5f0e8;
  font-style: italic;
  font-weight: 400;
}
.ornament::before, .ornament::after {
  background: linear-gradient(to right, transparent, #D49128);
}
.ornament::after {
  background: linear-gradient(to left, transparent, #D49128);
}
</style>
