<template>
  <section class="section-dark" style="padding:60px 24px 72px">
    <div class="texture-overlay" />

    <div ref="el" class="relative z-10">
      <!-- Invitation text -->
      <div class="text-center" style="margin-bottom:40px">
        <p class="sec-label" style="color:rgba(201,169,110,0.6);margin-bottom:16px">Bismillahirrahmanirrahim</p>
        <p class="serif-heading" style="font-size:0.95rem;line-height:1.8;color:rgba(245,240,232,0.75);max-width:320px;margin:0 auto">
          Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami :
        </p>
      </div>

      <!-- Divider -->
      <div style="display:flex;justify-content:center;margin-bottom:40px">
        <div class="divider" />
      </div>

      <!-- Couple cards -->
      <div class="cards-wrap">
        <!-- Groom -->
        <div ref="groomEl" class="profile-card">
          <div class="card-img-wrap">
            <img src="/images/gallery-1.jpg" alt="Rizky" class="card-img" @error="groomErr = true" />
            <div v-if="groomErr" class="card-img-fallback groom-gradient" />
            <div class="card-img-vignette" />
            <p class="card-script-name script-heading">Rizky</p>
          </div>
          <div class="card-body">
            <p class="card-fullname serif-heading">Muhammad Rizky Pratama, S.T.</p>
            <p class="card-parent">Putra pertama dari</p>
            <p class="card-parent-name">Bapak Ahmad Fauzi &amp; Ibu Siti Rahayu</p>
          </div>
        </div>

        <!-- Heart divider -->
        <div class="heart-sep">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#c9a96e" opacity="0.6">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>

        <!-- Bride -->
        <div ref="brideEl" class="profile-card">
          <div class="card-img-wrap">
            <img src="/images/gallery-2.jpg" alt="Anisa" class="card-img" @error="brideErr = true" />
            <div v-if="brideErr" class="card-img-fallback bride-gradient" />
            <div class="card-img-vignette" />
            <p class="card-script-name script-heading">Anisa</p>
          </div>
          <div class="card-body">
            <p class="card-fullname serif-heading">Anisa Ramadhani, S.Pd.</p>
            <p class="card-parent">Putri pertama dari</p>
            <p class="card-parent-name">Bapak Budi Santoso &amp; Ibu Dewi Lestari</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el      = ref<HTMLElement>()
const groomEl = ref<HTMLElement>()
const brideEl = ref<HTMLElement>()
const groomErr = ref(false)
const brideErr = ref(false)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value, { opacity: 0, y: 40, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
  gsap.from(groomEl.value, { opacity: 0, x: -40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: groomEl.value, start: 'top 88%' } })
  gsap.from(brideEl.value, { opacity: 0, x: 40,  duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: brideEl.value, start: 'top 88%' } })
})
</script>

<style scoped>
.texture-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.cards-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.card-img-wrap {
  position: relative;
  height: 260px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.card-img-fallback {
  width: 100%;
  height: 100%;
}
.groom-gradient  { background: linear-gradient(160deg, #d4b06a 0%, #c9a96e 100%); }
.bride-gradient  { background: linear-gradient(160deg, #e8c4c4 0%, #c9a096 100%); }
.card-img-vignette {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%);
}
.card-script-name {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 2rem;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}
.card-body {
  padding: 16px 20px 20px;
  text-align: center;
}
.card-fullname {
  font-size: 1rem;
  color: #3d1010;
  margin-bottom: 8px;
}
.card-parent {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  color: rgba(61,16,16,0.5);
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.card-parent-name {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: rgba(61,16,16,0.7);
  font-weight: 500;
}
.heart-sep {
  display: flex;
  justify-content: center;
  padding: 4px 0;
}
</style>
