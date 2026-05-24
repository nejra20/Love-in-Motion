<template>
  <section class="section-dark" style="padding:80px 0;position:relative;overflow:hidden">
    <div class="bg-texture" />
    <div class="inner" ref="el">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:48px">
        <p class="sec-label" style="color:rgba(201,169,110,0.6);margin-bottom:12px">Bismillahirrahmanirrahim</p>
        <p class="serif-heading invite-text">
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami.
        </p>
        <div class="divider-h" style="opacity:0.18;margin-top:32px;max-width:300px;margin-left:auto;margin-right:auto" />
      </div>

      <!-- Couple cards — side by side on desktop -->
      <div class="couple-grid">
        <div class="profile-card" ref="groomEl">
          <div class="card-img-wrap">
            <img src="/images/gallery-1.jpg" alt="Rizky" class="card-img" @error="groomErr = true" />
            <div v-if="groomErr" class="card-img-fallback" style="background:linear-gradient(160deg,#c9a96e,#a07840)" />
            <div class="card-img-vign" />
            <p class="card-script script-heading">Rizky</p>
          </div>
          <div class="card-body">
            <p class="serif-heading card-fullname">Muhammad Rizky Pratama, S.T.</p>
            <p class="card-sub">Putra pertama dari</p>
            <p class="card-parents">Bapak Ahmad Fauzi &amp; Ibu Siti Rahayu</p>
          </div>
        </div>

        <!-- Heart divider -->
        <div class="heart-sep">
          <div style="width:1px;flex:1;background:linear-gradient(to bottom,transparent,rgba(201,169,110,0.4),transparent)" />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#c9a96e" opacity="0.65">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <div style="width:1px;flex:1;background:linear-gradient(to bottom,transparent,rgba(201,169,110,0.4),transparent)" />
        </div>

        <div class="profile-card" ref="brideEl">
          <div class="card-img-wrap">
            <img src="/images/gallery-2.jpg" alt="Anisa" class="card-img" @error="brideErr = true" />
            <div v-if="brideErr" class="card-img-fallback" style="background:linear-gradient(160deg,#e8c4c4,#c9a096)" />
            <div class="card-img-vign" />
            <p class="card-script script-heading">Anisa</p>
          </div>
          <div class="card-body">
            <p class="serif-heading card-fullname">Anisa Ramadhani, S.Pd.</p>
            <p class="card-sub">Putri pertama dari</p>
            <p class="card-parents">Bapak Budi Santoso &amp; Ibu Dewi Lestari</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el       = ref<HTMLElement>()
const groomEl  = ref<HTMLElement>()
const brideEl  = ref<HTMLElement>()
const groomErr = ref(false)
const brideErr = ref(false)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value?.querySelector('.invite-text'), { opacity: 0, y: 24, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
  gsap.from(groomEl.value, { opacity: 0, x: -50, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: groomEl.value, start: 'top 85%' } })
  gsap.from(brideEl.value, { opacity: 0, x: 50,  duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: brideEl.value, start: 'top 85%' } })
})
</script>

<style scoped>
.bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a96e' fill-opacity='0.025'%3E%3Cpath d='M40 0L43 13H57L46 21L49 34L40 26L31 34L34 21L23 13H37L40 0Z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.invite-text {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.8;
  color: rgba(245,240,232,0.7);
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}

.couple-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0 24px;
}
@media (max-width: 640px) {
  .couple-grid {
    grid-template-columns: 1fr;
    gap: 16px 0;
    max-width: 360px;
    margin: 0 auto;
  }
  .heart-sep { flex-direction: row; padding: 8px 0; }
}

.card-img-wrap {
  position: relative;
  height: 280px;
  overflow: hidden;
}
@media (min-width: 768px) {
  .card-img-wrap { height: 340px; }
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.6s ease;
}
.profile-card:hover .card-img { transform: scale(1.04); }
.card-img-fallback { width: 100%; height: 100%; }
.card-img-vign {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 130px;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%);
}
.card-script {
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
  padding: 18px 20px 22px;
  text-align: center;
}
.card-fullname {
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  color: #3d1010;
  margin-bottom: 8px;
}
.card-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  color: rgba(61,16,16,0.45);
  margin-bottom: 2px;
}
.card-parents {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: rgba(61,16,16,0.65);
  font-weight: 500;
}

.heart-sep {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: 140px;
}
</style>
