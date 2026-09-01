<template>
  <div class="cover" :class="{ opening }">
    <!-- Full bg -->
    <div class="cover-bg" />

    <!-- Desktop: side by side | Mobile: stacked -->
    <div class="cover-layout">
      <!-- Image side -->
      <div class="cover-img-side">
        <img src="/images/backdrop1.jpg" alt="Background" class="cover-img" @error="imgErr = true" />
        <div v-if="imgErr" class="cover-img-fallback" />
        <div class="cover-img-overlay" />
      </div>

      <!-- Content side -->
      <div class="cover-content">
        <!-- Gold ornament top -->
        <div class="ornament" style="margin-bottom:28px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5e6c8" stroke-width="1.5" opacity="0.8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <p class="sec-label" style="color:#D49128;margin-bottom:10px">VJENČANJE</p>
        <h1 class="serif-heading cover-names">Nejre &amp; Riada</h1>
        <p class="cover-date sec-label">17 · 10 · 2026</p>

        <div class="divider-h" style="opacity:0.18;margin:24px 0" />

        <p class="cover-guest serif-heading">{{ guestName }}</p>
        <p class="sec-label" style="color:rgba(245,240,232,0.6);margin-bottom:4px">Pozivamo te da svojim prisustvom uljepšaš naš poseban dan.</p>

        <button class="btn-pill cover-btn" @click="handleOpen">
          <MailOpen :size="14" />
          Otvori pozivnicu
        </button>

        <!-- Decorative bottom -->
        <div class="ornament" style="margin-top:32px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5e6c8" stroke-width="1.5" opacity="0.8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MailOpen } from 'lucide-vue-next'

const emit   = defineEmits<{ open: [] }>()
const opening = ref(false)
const imgErr  = ref(false)

const guestName = computed(() => {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('to') || ''
})

function handleOpen() {
  opening.value = true
  setTimeout(() => emit('open'), 650)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap');

.cover {
  position: fixed;
  inset: 0;
  z-index: 100;
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  font-family: 'Montserrat', sans-serif;
  /* Sprečava da se stranica pomjera ako sadržaj na mobitelu bude prevelik */
  overflow-y: auto;
}
.cover.opening { opacity: 0; transform: scale(1.05); }

/* Pozadina */
.cover-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(315deg, #14311f 0%, #1c4329 50%, #0f2b1a 100%);
}
.cover-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 50%, rgba(10, 25, 15, 0.6) 100%);
  pointer-events: none;
}

/* Layout */
.cover-layout {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
@media (min-width: 768px) {
  .cover-layout { flex-direction: row; }
}

/* Lijeva strana (Slika) */
.cover-img-side {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 45vh;
  -webkit-mask-image: linear-gradient(to right, black 60%, transparent 100%);
  mask-image: linear-gradient(to right, black 60%, transparent 100%);
}
@media (min-width: 768px) {
  .cover-img-side { min-height: 100vh; flex: 0 0 55%; }
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  filter: contrast(1.05) saturate(0.9);
}

/* Gradijent preko slike */
.cover-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(20,49,31,0) 0%, rgba(20,49,31,0.5) 60%, rgba(20,49,31,0.9) 100%);
}
@media (min-width: 768px) {
  .cover-img-overlay {
    background: linear-gradient(to right,
    rgba(20,49,31,0) 0%,
    rgba(20,49,31,0) 40%,
    rgba(20,49,31,0.35) 65%,
    rgba(20,49,31,0.85) 85%,
    #14311f 100%
    );
  }
}

/* Desna strana (Sadržaj) */
.cover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px 32px 50px;
  flex: 0 0 auto;
  position: relative;
}
@media (min-width: 768px) {
  .cover-content {
    flex: 0 0 45%;
    padding: 60px 64px;
  }
}

/* Ornamenti */
.ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  color: #f5e6c8;
}
.ornament-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, #f5e6c8, transparent);
}
.ornament svg { width: 16px; height: 16px; fill: #f5e6c8; }

.cover-title-small {
  color: #f5e6c8;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 12px;
}

.cover-names {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 6vw, 4.5rem);
  color: #f5f0e8;
  line-height: 1.1;
  margin-bottom: 20px;
  font-weight: 500;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.cover-date {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #D49128;
  letter-spacing: 0.3em;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 40px;
}
.cover-date::before, .cover-date::after {
  content: '';
  width: 40px;
  height: 1px;
  background-color: rgba(201, 169, 110, 0.5);
}

.cover-guest {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  color: rgba(245, 240, 232, 0.8);
  margin-bottom: 40px;
  line-height: 1.5;
  max-width: 300px;
}

/* Dugme */
.cover-btn {
  margin-top: 10px;
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(201, 169, 110, 0.6);
  border-radius: 50px;
  color: #f5f0e8;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
.cover-btn:hover {
  background: rgba(201, 169, 110, 0.2);
  border-color: #D49128;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 169, 110, 0.2);
}

/* =========================================
   RESPONZIVNI DIO (MOBITELI)
   ========================================= */
@media (max-width: 767px) {
  .cover {
    /* Omogućava skrolanje ako sadržaj bude prevelik za mali ekran */
    overflow-y: auto;
  }

  .cover-layout {
    /* Postavlja visinu na auto kako bi se sadržaj mogao skrolati */
    height: auto;
    min-height: 100vh;
  }

  /* Slika na mobitelu: Manja, i "otapa" se prema dolje */
  .cover-img-side {
    flex: 0 0 38vh; /* Zauzima samo 38% ekrana, ostalo ostaje tekstu */
    min-height: 38vh;
    /* Maskiranje sa vrha na dno kako bi se spojila sa tekstom */
    -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
  }

  .cover-img-overlay {
    background: linear-gradient(to bottom, rgba(20,49,31,0) 0%, rgba(20,49,31,0.7) 80%, #14311f 100%);
  }

  /* Sadržaj: Manji padding, centriranje */
  .cover-content {
    flex: 1;
    padding: 20px 24px 50px;
    justify-content: flex-start; /* Počinje odmah ispod slike */
    padding-top: 40px;
  }

  /* Smanjivanje elemenata radi boljeg uklapanja */
  .ornament { margin-bottom: 16px; }
  .cover-names {
    font-size: clamp(2.4rem, 10vw, 3.5rem); /* Manje ime na mobitelu */
    margin-bottom: 14px;
  }
  .cover-date { font-size: 11px; margin-bottom: 28px; }
  .cover-guest { font-size: 1.1rem; margin-bottom: 30px; }

  .cover-btn {
    padding: 12px 24px;
    font-size: 11px;
  }
}
</style>