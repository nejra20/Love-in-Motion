<template>
  <section class="section-cream" style="padding:64px 32px">
    <div ref="el" class="text-center">
      <!-- Gold ornament -->
      <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:28px">
        <div style="height:1px;width:40px;background:linear-gradient(to right,transparent,#c9a96e)" />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 0L8.5 5.5H14L9.5 8.5L11 14L7 11L3 14L4.5 8.5L0 5.5H5.5L7 0Z" fill="#c9a96e" opacity="0.7"/>
        </svg>
        <div style="height:1px;width:40px;background:linear-gradient(to left,transparent,#c9a96e)" />
      </div>

      <blockquote
        class="serif-heading"
        style="font-size:1.05rem;line-height:1.8;color:#3d1010;font-style:italic;max-width:340px;margin:0 auto 20px"
      >
        "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
      </blockquote>

      <p class="serif-heading" style="font-size:0.85rem;color:#c9a96e;font-style:italic">(Ar-Rum: 21)</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el = ref<HTMLElement>()
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value, {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: { trigger: el.value, start: 'top 85%' },
  })
})
</script>
