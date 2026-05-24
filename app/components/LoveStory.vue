<template>
  <section class="section-cream" style="padding:80px 0">
    <div class="inner" ref="el">
      <div style="text-align:center;margin-bottom:56px">
        <h2 class="script-heading" style="font-size:clamp(2.4rem,5vw,3.6rem);color:#3d1010">Love Story</h2>
        <div class="ornament" style="margin-top:14px">
          <div style="width:6px;height:6px;border-radius:50%;background:#c9a96e;opacity:0.7" />
        </div>
      </div>

      <!-- On desktop: 3 columns. On mobile: vertical timeline -->
      <div class="chapters">
        <div v-for="(ch, i) in chapters" :key="i" class="chapter">
          <div class="chapter-dot-wrap">
            <div class="chapter-num serif-heading">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="chapter-dot" />
          </div>
          <div class="chapter-body">
            <h3 class="serif-heading" style="font-size:1.15rem;color:#3d1010;font-weight:600;margin-bottom:12px">{{ ch.title }}</h3>
            <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;line-height:1.85;color:rgba(61,16,16,0.68)">{{ ch.text }}</p>
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
    text: 'Kami dipertemukan di sebuah acara kampus yang sederhana. Dua orang yang awalnya hanya saling mengenal dari jauh, namun takdir punya rencana yang lebih indah. Dari pertemuan singkat, lahirlah percakapan, lalu perhatian, lalu rasa.',
  },
  {
    title: 'Lamaran',
    text: 'Pada suatu sore di antara keluarga tercinta, sebuah niat tulus disampaikan, cincin disematkan, dan doa dipanjatkan. Kami sepakat menjaga yang halal sambil menata langkah bersama menuju hari bahagia.',
  },
  {
    title: 'Pernikahan',
    text: 'Bismillah, 14 Februari 2026 - kami mengikat janji suci, memohon ridha Allah dan restu orang tua, untuk bersama membangun rumah yang penuh kasih dan selalu kembali pada doa.',
  },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value?.querySelectorAll('.chapter') ?? [], {
    opacity: 0, y: 40, stagger: 0.2, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: el.value, start: 'top 82%' },
  })
})
</script>

<style scoped>
/* Desktop: horizontal 3 columns */
.chapters {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
@media (min-width: 768px) {
  .chapters {
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
  }
}

.chapter {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
@media (max-width: 767px) {
  .chapter {
    flex-direction: row;
    gap: 20px;
  }
}

.chapter-dot-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
@media (min-width: 768px) {
  .chapter-dot-wrap {
    flex-direction: row;
    gap: 14px;
    margin-bottom: 8px;
    align-items: center;
  }
}

.chapter-num {
  font-size: 2.5rem;
  color: rgba(201,169,110,0.25);
  line-height: 1;
  user-select: none;
}
@media (max-width: 767px) {
  .chapter-num { font-size: 1.5rem; padding-top: 2px; }
}

.chapter-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c9a96e;
  border: 2px solid rgba(201,169,110,0.3);
  box-shadow: 0 0 10px rgba(201,169,110,0.35);
  flex-shrink: 0;
}

.chapter-body { flex: 1; }
</style>
