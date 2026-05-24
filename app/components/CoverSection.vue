<template>
  <div class="cover-wrap" :class="{ 'is-opening': opening }">
    <!-- Background texture -->
    <div class="cover-bg" />

    <!-- Couple illustration -->
    <div class="couple-art">
      <img src="/images/couple.jpg" alt="Couple" class="couple-img" @error="imgErr = true" />
      <div v-if="imgErr" class="couple-placeholder" />
      <!-- Vignette bottom -->
      <div class="vignette-bottom" />
    </div>

    <!-- Bottom content -->
    <div class="cover-footer">
      <p class="sec-label" style="color:rgba(245,240,232,0.55);margin-bottom:6px">THE WEDDING OF</p>
      <h1 class="serif-heading" style="font-size:2rem;color:#f5f0e8;margin-bottom:2px">Rizky &amp; Anisa</h1>
      <p class="sec-label" style="color:rgba(245,240,232,0.4);letter-spacing:0.15em;margin-bottom:6px;font-size:10px">14 · 02 · 2026</p>

      <div class="divider-h" style="opacity:0.2;margin:14px 0" />

      <p class="guest-label">Kepada Yth.</p>
      <p class="guest-name">{{ guestName }}</p>

      <button class="btn-pill open-btn" @click="handleOpen">
        <MailOpen :size="14" />
        Buka Undangan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MailOpen } from 'lucide-vue-next'

const emit = defineEmits<{ open: [] }>()
const opening = ref(false)
const imgErr  = ref(false)

const guestName = computed(() => {
  if (typeof window === 'undefined') return 'Tamu Undangan'
  const params = new URLSearchParams(window.location.search)
  return params.get('to') || 'Tamu Undangan'
})

function handleOpen() {
  opening.value = true
  // Brief delay so the CSS opening class shows before unmount
  setTimeout(() => emit('open'), 650)
}
</script>

<style scoped>
.cover-wrap {
  position: fixed;
  inset: 0;
  z-index: 100;
  max-width: 440px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -1px 0 0 rgba(196,120,100,0.25), 1px 0 0 rgba(196,120,100,0.25);
}
.cover-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #2a080a 0%, #3d1010 50%, #1a0507 100%);
}
/* Subtle texture overlay */
.cover-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.couple-art {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.couple-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.couple-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(90,26,26,0.3) 0%, transparent 100%);
}
.vignette-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 220px;
  background: linear-gradient(to top, #1a0507 0%, transparent 100%);
}

.cover-footer {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px 28px 40px;
  background: linear-gradient(to bottom, #1a0507 0%, #2a080a 100%);
}

.guest-label {
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  color: rgba(245,240,232,0.45);
  letter-spacing: 0.1em;
  margin-bottom: 2px;
}
.guest-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: rgba(245,240,232,0.75);
  margin-bottom: 20px;
  font-style: italic;
}

.open-btn {
  margin-top: 4px;
}

.cover-wrap {
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.cover-wrap.is-opening {
  opacity: 0;
  transform: translateX(-50%) scale(1.04);
}
</style>
