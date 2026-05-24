<template>
  <section class="section-dark" style="padding:80px 0;position:relative;overflow:hidden">
    <div class="bg-texture" />
    <div class="inner" ref="el">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:56px">
        <p class="sec-label" style="color:rgba(201,169,110,0.6);margin-bottom:10px">Save the Date</p>
        <h2 class="script-heading" style="font-size:clamp(2.4rem,5vw,3.6rem);color:#f5f0e8">Detail Acara</h2>
        <div class="ornament" style="margin-top:14px">
          <div style="width:6px;height:6px;border-radius:50%;background:#c9a96e;opacity:0.5" />
        </div>
      </div>

      <!-- Event cards: side by side on desktop -->
      <div class="events-grid">
        <div v-for="ev in events" :key="ev.id" class="event-card">
          <!-- Arch top -->
          <div class="arch-top">
            <div class="arch-circle" />
            <p class="script-heading arch-title">{{ ev.title }}</p>
          </div>
          <!-- Body -->
          <div class="event-body">
            <p class="serif-heading event-date">{{ ev.date }}</p>
            <div class="divider-h" style="opacity:0.2;margin:14px 0" />
            <p class="event-detail"><span>Pukul :</span> {{ ev.time }}</p>
            <p class="event-detail" style="margin-top:6px"><span>Tempat :</span> <strong>{{ ev.venue }}</strong></p>
            <p class="event-detail" style="opacity:0.65">{{ ev.address }}</p>
            <div style="margin-top:22px;text-align:center">
              <button class="btn-pill" style="font-size:10px" @click="openMap(ev.mapUrl)">
                <MapPin :size="11" />
                Lokasi Acara
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div ref="mapEl" style="margin-top:40px;border-radius:20px;overflow:hidden;height:240px;border:1px solid rgba(201,169,110,0.15);box-shadow:0 8px 40px rgba(0,0,0,0.4)">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8158!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDgnNTYuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
          width="100%" height="100%" style="border:0;filter:saturate(0.55) sepia(0.25)"
          allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Lokasi Acara"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el    = ref<HTMLElement>()
const mapEl = ref<HTMLElement>()

const events = [
  { id: 'akad',    title: 'Akad Nikah', date: 'Sabtu, 14 Februari 2026', time: '08.00 WIB - selesai', venue: 'Masjid Al-Ikhlas',          address: 'Jl. Kebon Jeruk No. 12, Jakarta Barat', mapUrl: 'https://maps.google.com' },
  { id: 'resepsi', title: 'Resepsi',    date: 'Sabtu, 14 Februari 2026', time: '11.00 - 15.00 WIB',   venue: 'Ballroom Grand Sahid Jaya', address: 'Jl. Jend. Sudirman Kav. 86, Jakarta',   mapUrl: 'https://maps.google.com' },
]

function openMap(url: string) { window.open(url, '_blank', 'noopener,noreferrer') }

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value?.querySelectorAll('.event-card') ?? [], {
    opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: el.value, start: 'top 82%' },
  })
  gsap.from(mapEl.value, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: mapEl.value, start: 'top 88%' } })
})
</script>

<style scoped>
.bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a96e' fill-opacity='0.025'%3E%3Cpath d='M40 0L43 13H57L46 21L49 34L40 26L31 34L34 21L23 13H37L40 0Z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 640px) {
  .events-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
}

.event-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(201,169,110,0.18);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.arch-top {
  position: relative;
  height: 130px;
  background: linear-gradient(160deg, #1a0507 0%, #2a080a 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 14px;
  overflow: hidden;
}
.arch-circle {
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 1px solid rgba(201,169,110,0.15);
  background: rgba(201,169,110,0.04);
}
.arch-title {
  position: relative;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: #c9a96e;
  text-align: center;
  z-index: 1;
}

.event-body {
  padding: 22px 24px 26px;
  text-align: center;
}
.event-date {
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
  color: #f5f0e8;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.event-detail {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: rgba(245,240,232,0.7);
  line-height: 1.7;
}
.event-detail span { color: rgba(245,240,232,0.4); }
.event-detail strong { color: rgba(245,240,232,0.9); }
</style>
