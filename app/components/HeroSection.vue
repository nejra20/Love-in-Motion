<template>
  <section class="section-dark relative overflow-hidden" style="padding-bottom:60px">
    <!-- Texture overlay -->
    <div class="texture-overlay" />

    <!-- Couple illustration top -->
    <div class="hero-img-wrap">
      <img src="/images/couple.jpg" alt="Rizky & Anisa" class="hero-img" @error="imgErr = true" />
      <div v-if="imgErr" class="hero-img-fallback" />
      <div class="hero-img-vignette" />
    </div>

    <!-- Monogram + Names -->
    <div class="hero-content">
      <p class="sec-label" style="color:rgba(201,169,110,0.7);margin-bottom:12px">THE WEDDING OF</p>

      <div class="monogram">
        <span>R</span>
        <span class="sep">|</span>
        <span>A</span>
      </div>

      <p class="serif-heading" style="font-size:1.9rem;color:#f5f0e8;margin:8px 0 4px">Rizky &amp; Anisa</p>
      <p class="sec-label" style="color:rgba(201,169,110,0.5);letter-spacing:0.2em;font-size:10px">14 · 02 · 2026</p>

      <!-- Countdown -->
      <div class="countdown-row">
        <div v-for="unit in countdown" :key="unit.label" class="cd-box">
          <p class="cd-num serif-heading">{{ unit.value }}</p>
          <p class="cd-label">{{ unit.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const imgErr = ref(false)

const WEDDING = new Date('2026-02-14T08:00:00')
const countdown = ref([
  { label: 'Hari',  value: '000' },
  { label: 'Jam',   value: '00'  },
  { label: 'Menit', value: '00'  },
  { label: 'Detik', value: '00'  },
])

function tick() {
  const diff = WEDDING.getTime() - Date.now()
  const d = Math.max(0, Math.floor(diff / 86400000))
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000))
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000))
  const s = Math.max(0, Math.floor((diff % 60000) / 1000))
  countdown.value = [
    { label: 'Hari',  value: String(d).padStart(3, '0') },
    { label: 'Jam',   value: String(h).padStart(2, '0') },
    { label: 'Menit', value: String(m).padStart(2, '0') },
    { label: 'Detik', value: String(s).padStart(2, '0') },
  ]
}

let timer: ReturnType<typeof setInterval>
onMounted(() => { tick(); timer = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.texture-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}
.hero-img-wrap {
  position: relative;
  height: 360px;
  overflow: hidden;
}
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}
.hero-img-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(90,26,26,0.5) 0%, rgba(26,5,7,0.8) 100%);
}
.hero-img-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, #2a080a 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px 24px;
  margin-top: -40px;
}

.monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 400;
  color: #f5f0e8;
  letter-spacing: 0.05em;
}
.monogram .sep {
  color: #c9a96e;
  font-size: 1.5rem;
  margin-bottom: 6px;
}

.countdown-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
}
.cd-num {
  font-size: 1.6rem;
  color: #3d1010;
  margin: 0;
  line-height: 1;
}
.cd-label {
  font-family: 'Poppins', sans-serif;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(61,16,16,0.5);
  margin-top: 4px;
}
</style>
