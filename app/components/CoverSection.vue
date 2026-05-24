<template>
  <div class="cover" :class="{ opening }">
    <!-- Full bg -->
    <div class="cover-bg" />

    <!-- Desktop: side by side | Mobile: stacked -->
    <div class="cover-layout">
      <!-- Image side -->
      <div class="cover-img-side">
        <img src="/images/couple.jpg" alt="Couple" class="cover-img" @error="imgErr = true" />
        <div v-if="imgErr" class="cover-img-fallback" />
        <div class="cover-img-overlay" />
      </div>

      <!-- Content side -->
      <div class="cover-content">
        <!-- Gold ornament top -->
        <div class="ornament" style="margin-bottom:28px">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#c9a96e" opacity="0.7">
            <path d="M6 0L7.2 4.4H12L8.4 7.1L9.6 11.6L6 8.9L2.4 11.6L3.6 7.1L0 4.4H4.8L6 0Z"/>
          </svg>
        </div>

        <p class="sec-label" style="color:rgba(201,169,110,0.65);margin-bottom:10px">THE WEDDING OF</p>
        <h1 class="serif-heading cover-names">Rizky &amp; Anisa</h1>
        <p class="cover-date sec-label">14 · 02 · 2026</p>

        <div class="divider-h" style="opacity:0.18;margin:24px 0" />

        <p class="sec-label" style="color:rgba(245,240,232,0.4);margin-bottom:4px">Kepada Yth.</p>
        <p class="cover-guest serif-heading">{{ guestName }}</p>

        <button class="btn-pill cover-btn" @click="handleOpen">
          <MailOpen :size="14" />
          Buka Undangan
        </button>

        <!-- Decorative bottom -->
        <div class="ornament" style="margin-top:32px">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#c9a96e" opacity="0.4">
            <path d="M6 0L7.2 4.4H12L8.4 7.1L9.6 11.6L6 8.9L2.4 11.6L3.6 7.1L0 4.4H4.8L6 0Z"/>
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
  if (typeof window === 'undefined') return 'Tamu Undangan'
  return new URLSearchParams(window.location.search).get('to') || 'Tamu Undangan'
})

function handleOpen() {
  opening.value = true
  setTimeout(() => emit('open'), 650)
}
</script>

<style scoped>
.cover {
  position: fixed;
  inset: 0;
  z-index: 100;
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.cover.opening { opacity: 0; transform: scale(1.03); }

.cover-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a0507 0%, #3d1010 60%, #2a080a 100%);
}
.cover-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a96e' fill-opacity='0.03'%3E%3Cpath d='M40 0L43 13H57L46 21L49 34L40 26L31 34L34 21L23 13H37L40 0Z'/%3E%3C/g%3E%3C/svg%3E");
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

/* Image side */
.cover-img-side {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 45vh;
}
@media (min-width: 768px) {
  .cover-img-side { min-height: 100vh; flex: 0 0 55%; }
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
}
.cover-img-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, #5a1a1a 0%, #2a080a 100%);
}
.cover-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(26,5,7,0.85) 100%);
}
@media (min-width: 768px) {
  .cover-img-overlay {
    background: linear-gradient(to right, transparent 50%, rgba(26,5,7,0.9) 100%);
  }
}

/* Content side */
.cover-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 36px 48px;
  flex: 0 0 auto;
}
@media (min-width: 768px) {
  .cover-content {
    flex: 0 0 45%;
    padding: 60px 56px;
    min-height: 100vh;
  }
}

.cover-names {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: #f5f0e8;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}
.cover-date {
  color: rgba(201,169,110,0.55);
  letter-spacing: 0.25em;
  font-size: 11px;
}
.cover-guest {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: rgba(245,240,232,0.7);
  margin-bottom: 28px;
  font-style: italic;
}
.cover-btn { margin-top: 4px; }
</style>
