<template>
  <section class="section-dark" style="padding:64px 24px 72px;position:relative;overflow:hidden">
    <div class="texture-overlay" />

    <div ref="el" class="relative z-10">
      <!-- Header -->
      <div class="text-center" style="margin-bottom:40px">
        <p class="sec-label" style="color:rgba(201,169,110,0.6);margin-bottom:10px">Save the Date</p>
        <h2 class="script-heading" style="font-size:2.5rem;color:#f5f0e8">Detail Acara</h2>
        <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:12px">
          <div style="height:1px;width:32px;background:linear-gradient(to right,transparent,#c9a96e)" />
          <div style="width:5px;height:5px;border-radius:50%;background:#c9a96e;opacity:0.6" />
          <div style="height:1px;width:32px;background:linear-gradient(to left,transparent,#c9a96e)" />
        </div>
      </div>

      <!-- Event cards (arch style) -->
      <div style="display:flex;flex-direction:column;gap:20px">
        <div v-for="ev in events" :key="ev.id" ref="cardEls" class="event-arch-card">
          <!-- Arch header with dark bg -->
          <div class="arch-header">
            <div class="arch-shape" />
            <p class="script-heading arch-title">{{ ev.scriptTitle }}</p>
          </div>
          <!-- Card body -->
          <div class="arch-body">
            <p class="serif-heading" style="font-size:1.1rem;color:#f5f0e8;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">
              {{ ev.date }}
            </p>
            <div class="divider-h" style="opacity:0.2;margin-bottom:14px" />
            <p class="arch-detail"><span>PUKUL :</span> {{ ev.time }}</p>
            <p class="arch-detail" style="margin-top:6px">
              <span>Tempat :</span> <strong>{{ ev.venue }}</strong>
            </p>
            <p class="arch-detail" style="opacity:0.7">{{ ev.address }}</p>

            <div style="margin-top:20px;display:flex;justify-content:center">
              <button class="btn-pill" @click="openMap(ev.mapUrl)" style="font-size:10px">
                <MapPin :size="11" />
                Lokasi Acara
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Map embed -->
      <div ref="mapEl" style="margin-top:28px;border-radius:16px;overflow:hidden;height:200px;border:1px solid rgba(201,169,110,0.15)">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8158!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDgnNTYuOSJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
          width="100%" height="100%"
          style="border:0;filter:saturate(0.6) sepia(0.3)"
          allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          title="Lokasi Acara"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el      = ref<HTMLElement>()
const cardEls = ref<HTMLElement[]>([])
const mapEl   = ref<HTMLElement>()

const events = [
  {
    id:          'akad',
    scriptTitle: 'Akad Nikah',
    date:        'Sabtu, 14 Februari 2026',
    time:        '08.00 WIB - selesai',
    venue:       'Masjid Al-Ikhlas',
    address:     'Jl. Kebon Jeruk No. 12, Jakarta Barat',
    mapUrl:      'https://maps.google.com',
  },
  {
    id:          'resepsi',
    scriptTitle: 'Resepsi',
    date:        'Sabtu, 14 Februari 2026',
    time:        '11.00 - 15.00 WIB',
    venue:       'Ballroom Grand Sahid Jaya',
    address:     'Jl. Jend. Sudirman Kav. 86, Jakarta',
    mapUrl:      'https://maps.google.com',
  },
]

function openMap(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
  cardEls.value.forEach((card, i) => {
    gsap.from(card, { opacity: 0, y: 40, duration: 0.8, delay: i * 0.15, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%' } })
  })
  gsap.from(mapEl.value, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: mapEl.value, start: 'top 88%' } })
})
</script>

<style scoped>
.texture-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.event-arch-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: 16px;
  overflow: hidden;
}
.arch-header {
  position: relative;
  height: 120px;
  background: linear-gradient(160deg, #2a080a 0%, #1a0507 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  overflow: hidden;
}
/* The arch shape decorative bg circle */
.arch-shape {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(201,169,110,0.06);
  border: 1px solid rgba(201,169,110,0.12);
}
.arch-title {
  position: relative;
  font-size: 2.2rem;
  color: #c9a96e;
  text-align: center;
  z-index: 1;
}
.arch-body {
  padding: 20px 24px 24px;
  text-align: center;
}
.arch-detail {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: rgba(245,240,232,0.7);
  line-height: 1.6;
}
.arch-detail span { color: rgba(245,240,232,0.45); }
.arch-detail strong { color: rgba(245,240,232,0.9); }
</style>
