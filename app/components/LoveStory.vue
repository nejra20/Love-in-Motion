<template>
  <section class="section-cream" style="padding:64px 32px 72px">
    <div ref="el">
      <!-- Heading -->
      <div class="text-center" style="margin-bottom:48px">
        <h2 class="script-heading" style="font-size:2.8rem;color:#3d1010">Love Story</h2>
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:12px">
          <div style="height:1px;width:32px;background:linear-gradient(to right,transparent,#c9a96e)" />
          <div style="width:5px;height:5px;border-radius:50%;background:#c9a96e;opacity:0.7" />
          <div style="height:1px;width:32px;background:linear-gradient(to left,transparent,#c9a96e)" />
        </div>
      </div>

      <!-- Timeline chapters -->
      <div class="chapters">
        <div v-for="(ch, i) in chapters" :key="i" class="chapter">
          <div class="chapter-dot">
            <div class="dot-inner" />
          </div>
          <div class="chapter-body">
            <h3 class="serif-heading" style="font-size:1.1rem;color:#3d1010;font-weight:600;margin-bottom:10px">
              {{ ch.title }}
            </h3>
            <p style="font-family:'Poppins',sans-serif;font-size:0.8rem;line-height:1.8;color:rgba(61,16,16,0.7)">
              {{ ch.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el = ref<HTMLElement>()

const chapters = [
  {
    title: 'Awal Cerita',
    text:  'Kami dipertemukan di sebuah acara kampus yang sederhana — dua orang yang awalnya hanya saling mengenal dari jauh, namun takdir punya rencana yang lebih indah. Dari pertemuan singkat itu, lahirlah percakapan, lalu perhatian, lalu rasa.',
  },
  {
    title: 'Lamaran',
    text:  'Pada suatu sore di antara keluarga tercinta, sebuah niat tulus disampaikan, cincin disematkan, dan doa dipanjatkan. Kami sepakat untuk menjaga yang halal sambil menata langkah bersama menuju hari bahagia.',
  },
  {
    title: 'Pernikahan',
    text:  'Bismillah, 14 Februari 2026 - kami mengikat janji suci, memohon ridha Allah dan restu orang tua, untuk bersama membangun rumah yang penuh kasih dan selalu kembali pada doa.',
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value?.querySelectorAll('.chapter') ?? [], {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: el.value, start: 'top 82%' },
  })
})
</script>

<style scoped>
.chapters {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.chapter {
  display: flex;
  gap: 20px;
  padding-bottom: 36px;
  position: relative;
}
/* Vertical line connecting dots */
.chapter:not(:last-child) .chapter-dot::after {
  content: '';
  position: absolute;
  top: 28px;
  left: 9px;
  width: 1px;
  height: calc(100% - 12px);
  background: linear-gradient(to bottom, rgba(201,169,110,0.4), transparent);
}
.chapter-dot {
  position: relative;
  flex-shrink: 0;
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}
.dot-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c9a96e;
  border: 2px solid rgba(201,169,110,0.4);
  box-shadow: 0 0 8px rgba(201,169,110,0.4);
}
.chapter-body {
  flex: 1;
  padding-top: 0;
}
</style>
