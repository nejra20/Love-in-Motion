<template>
  <section class="section-cream" style="padding:80px 0">
    <div class="inner" ref="el">
      <div style="text-align:center;max-width:600px;margin:0 auto">
        <div class="ornament" style="margin-bottom:32px">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#c9a96e" opacity="0.7">
            <path d="M6 0L7.2 4.4H12L8.4 7.1L9.6 11.6L6 8.9L2.4 11.6L3.6 7.1L0 4.4H4.8L6 0Z"/>
          </svg>
        </div>

        <blockquote class="serif-heading verse-text">
          "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </blockquote>

        <p class="serif-heading" style="font-size:0.9rem;color:#c9a96e;font-style:italic;margin-top:20px">(Ar-Rum: 21)</p>

        <div class="ornament" style="margin-top:32px">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#c9a96e" opacity="0.4">
            <path d="M6 0L7.2 4.4H12L8.4 7.1L9.6 11.6L6 8.9L2.4 11.6L3.6 7.1L0 4.4H4.8L6 0Z"/>
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
  color: #3d1010;
  font-style: italic;
  font-weight: 400;
}
</style>
