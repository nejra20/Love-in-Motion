<template>
  <section class="details-section">
    <div class="section-glow"></div>
    <div class="grain"></div>

    <div ref="el" class="details-inner">

      <!-- HEADER -->
      <header class="section-header">
        <p class="eyebrow">Rezervišite datum</p>

        <div class="heading-row">
          <span class="heading-line"></span>
          <span class="heading-symbol">✦</span>
          <span class="heading-line"></span>
        </div>

        <h2 class="section-title">
          Detalji proslave
        </h2>

        <p class="section-intro">
          Jedva čekamo da ovaj poseban dan provedemo zajedno s vama.
        </p>
      </header>


      <!-- EVENT -->
      <div class="events-grid">

        <article
            v-for="ev in events"
            :key="ev.id"
            class="event-card"
        >

          <!-- CARD HEADER -->
          <div class="event-header">

            <div class="arch-decoration">
              <div class="arch-ring arch-ring-large"></div>
              <div class="arch-ring arch-ring-small"></div>
            </div>

            <div class="event-header-content">

              <h3 class="event-title">
                {{ ev.title }}
              </h3>

              <span class="event-header-line"></span>
            </div>

          </div>


          <!-- CARD BODY -->
          <div class="event-body">

            <p class="event-date">
              {{ ev.date }}
            </p>

            <div class="event-info">

              <div class="info-item">
                <span class="info-label">Vrijeme</span>
                <span class="info-value">{{ ev.time }}</span>
              </div>

              <div class="info-divider"></div>

              <div class="info-item">
                <span class="info-label">Lokacija</span>
                <span class="info-value">{{ ev.venue }}</span>
                <span class="info-address">{{ ev.address }}</span>
              </div>

            </div>


            <!-- MAP BUTTON -->
            <button
                type="button"
                class="map-button"
                @click="openMap(ev.mapUrl)"
                aria-label="Otvori lokaciju na Google Maps"
            >
              <span class="map-icon">
                <MapPin :size="13" :stroke-width="1.5" />
              </span>

              <span>Otvori lokaciju</span>

              <span class="arrow">↗</span>
            </button>

          </div>
        </article>

      </div>


      <!-- MAP -->
      <div ref="mapEl" class="map-wrapper">

        <div class="map-heading">
          <div>
            <span class="map-eyebrow">Gdje se vidimo</span>
            <h3 class="map-title">Restoran Pino Nature</h3>
          </div>

          <button
              type="button"
              class="map-link"
              @click="openMap(events[0].mapUrl)"
          >
            Google Maps
            <span>↗</span>
          </button>
        </div>

        <div class="map-frame">
          <iframe
              src="https://www.google.com/maps?q=Pino+Nature+Hotel+Trebevic+Sarajevo&output=embed"
              width="100%"
              height="100%"
              style="border:0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Mapa lokacije restorana Pino Nature"
          ></iframe>

          <div class="map-overlay"></div>
        </div>

      </div>

    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { MapPin } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)

const events = [
  {
    id: 'restoran',
    title: 'Svadbena večera',
    date: 'Subota, 17. oktobar 2026.',
    time: '18:00h',
    venue: 'Restoran Pino Nature',
    address: 'Ravne 1, Trebević, Sarajevo',
    mapUrl:
        'https://www.google.com/maps?q=Pino+Nature+Hotel+Trebevic+Sarajevo',
  },
]

function openMap(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  if (!el.value) return

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.event-card')
    const map = mapEl.value

    gsap.from(cards, {
      opacity: 0,
      y: 35,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: el.value,
        start: 'top 82%',
        once: true,
      },
    })

    if (map) {
      gsap.from(map, {
        opacity: 0,
        y: 25,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: map,
          start: 'top 88%',
          once: true,
        },
      })
    }
  }, el)

  onUnmounted(() => {
    ctx.revert()
  })
})
</script>


<style scoped>

/* =========================================================
   SECTION
   ========================================================= */

.details-section {
  position: relative;
  overflow: hidden;

  padding: 110px 24px;

  background:
      linear-gradient(
          180deg,
          #10291a 0%,
          #14311f 50%,
          #10291a 100%
      );

  color: #f5f0e8;
}

.details-inner {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 760px;

  margin: 0 auto;
}


/* =========================================================
   BACKGROUND
   ========================================================= */

.section-glow {
  position: absolute;
  top: -250px;
  left: 50%;

  width: 650px;
  height: 650px;

  transform: translateX(-50%);

  border-radius: 50%;

  background: radial-gradient(
      circle,
      rgba(201, 169, 110, 0.08) 0%,
      rgba(201, 169, 110, 0) 68%
  );

  pointer-events: none;
}

.grain {
  position: absolute;
  inset: 0;

  opacity: 0.025;
  pointer-events: none;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
}


/* =========================================================
   HEADER
   ========================================================= */

.section-header {
  margin-bottom: 62px;

  text-align: center;
}

.eyebrow {
  margin: 0 0 17px;

  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 500;

  letter-spacing: 0.28em;
  text-transform: uppercase;

  color: #D49128;
}

.heading-row {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-bottom: 14px;
}

.heading-line {
  width: 55px;
  height: 1px;

  background: linear-gradient(
      90deg,
      transparent,
      rgba(201, 169, 110, 0.5)
  );
}

.heading-line:last-child {
  background: linear-gradient(
      90deg,
      rgba(201, 169, 110, 0.5),
      transparent
  );
}

.heading-symbol {
  font-family: serif;
  font-size: 10px;

  color: #c9a96e;
}

.section-title {
  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 7vw, 4.4rem);
  font-weight: 500;

  line-height: 0.95;
  letter-spacing: -0.025em;

  color: #f5f0e8;
}

.section-intro {
  max-width: 390px;

  margin: 20px auto 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.45;

  color: rgba(245, 240, 232, 0.55);
}


/* =========================================================
   EVENT CARD
   ========================================================= */

.events-grid {
  display: grid;
  grid-template-columns: 1fr;

  max-width: 500px;

  margin: 0 auto;
}

.event-card {
  overflow: hidden;

  border: 1px solid rgba(201, 169, 110, 0.22);
  border-radius: 2px;

  background: rgba(245, 240, 232, 0.035);

  box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.18);

  transition:
      transform 0.45s ease,
      box-shadow 0.45s ease,
      border-color 0.45s ease;
}

.event-card:hover {
  transform: translateY(-5px);

  border-color: rgba(201, 169, 110, 0.38);

  box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.28);
}


/* =========================================================
   EVENT HEADER
   ========================================================= */

.event-header {
  position: relative;

  height: 175px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background:
      linear-gradient(
          145deg,
          #193c25 0%,
          #14311f 65%,
          #10291a 100%
      );
}

.arch-decoration {
  position: absolute;
  top: -130px;
  left: 50%;

  width: 360px;
  height: 360px;

  transform: translateX(-50%);
}

.arch-ring {
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  border-radius: 50%;

  border: 1px solid rgba(201, 169, 110, 0.12);
}

.arch-ring-large {
  width: 330px;
  height: 330px;
}

.arch-ring-small {
  width: 250px;
  height: 250px;

  border-color: rgba(201, 169, 110, 0.07);
}

.event-header-content {
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-title {
  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.3rem, 6vw, 3rem);
  font-weight: 400;

  line-height: 1;

  color: #D49128;
}

.event-header-line {
  width: 35px;
  height: 1px;

  margin-top: 16px;

  background: rgba(201, 169, 110, 0.45);
}


/* =========================================================
   EVENT BODY
   ========================================================= */

.event-body {
  padding: 30px 30px 32px;

  text-align: center;
}

.event-date {
  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 500;

  letter-spacing: 0.06em;
  text-transform: uppercase;

  color: #f5f0e8;
}

.event-info {
  display: flex;
  align-items: stretch;
  justify-content: center;

  margin: 26px 0 25px;
}

.info-item {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-label {
  margin-bottom: 7px;

  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 500;

  letter-spacing: 0.2em;
  text-transform: uppercase;

  color: rgba(201, 169, 110, 0.55);
}

.info-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;

  color: rgba(245, 240, 232, 0.92);
}

.info-address {
  max-width: 180px;

  margin-top: 3px;

  font-family: 'Montserrat', sans-serif;
  font-size: 9px;

  line-height: 1.5;

  color: rgba(245, 240, 232, 0.4);
}

.info-divider {
  width: 1px;

  margin: 2px 18px;

  background: rgba(201, 169, 110, 0.15);
}


/* =========================================================
   MAP BUTTON
   ========================================================= */

.map-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  min-height: 40px;

  padding: 0 17px;

  border: 1px solid rgba(201, 169, 110, 0.3);
  border-radius: 999px;

  background: transparent;

  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 500;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: rgba(245, 240, 232, 0.75);

  cursor: pointer;

  transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;
}

.map-button:hover {
  background: rgba(201, 169, 110, 0.1);

  border-color: rgba(201, 169, 110, 0.6);

  color: #f5f0e8;
}

.map-icon {
  display: flex;

  color: #c9a96e;
}

.arrow {
  margin-left: 2px;

  font-size: 12px;

  color: #c9a96e;
}


/* =========================================================
   MAP
   ========================================================= */

.map-wrapper {
  margin-top: 46px;

  border: 1px solid rgba(201, 169, 110, 0.18);

  background: rgba(0, 0, 0, 0.12);

  box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.2);
}

.map-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 18px 20px;

  border-bottom: 1px solid rgba(201, 169, 110, 0.12);
}

.map-eyebrow {
  display: block;

  margin-bottom: 3px;

  font-family: 'Montserrat', sans-serif;
  font-size: 7px;
  font-weight: 500;

  letter-spacing: 0.2em;
  text-transform: uppercase;

  color: rgba(201, 169, 110, 0.55);
}

.map-title {
  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 400;

  color: #f5f0e8;
}

.map-link {
  padding: 0;

  border: 0;

  background: transparent;

  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 500;

  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: rgba(201, 169, 110, 0.75);

  cursor: pointer;

  transition: color 0.25s ease;
}

.map-link span {
  margin-left: 4px;
}

.map-link:hover {
  color: #c9a96e;
}

.map-frame {
  position: relative;

  height: 270px;

  overflow: hidden;
}

.map-frame iframe {
  display: block;

  width: 100%;
  height: 100%;

  filter:
      grayscale(0.35)
      sepia(0.2)
      contrast(0.9)
      brightness(0.82);
}

.map-overlay {
  position: absolute;
  inset: 0;

  pointer-events: none;

  box-shadow:
      inset 0 0 60px rgba(16, 41, 26, 0.35);
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .details-section {
    padding: 85px 18px;
  }

  .section-header {
    margin-bottom: 50px;
  }

  .heading-line {
    width: 40px;
  }

  .section-title {
    font-size: 3.1rem;
  }

  .section-intro {
    font-size: 1.08rem;
  }

  .event-header {
    height: 155px;
  }

  .event-body {
    padding: 26px 20px 28px;
  }

  .event-date {
    font-size: 1rem;
  }

  .event-info {
    margin: 23px 0;
  }

  .info-divider {
    margin-left: 10px;
    margin-right: 10px;
  }

  .info-value {
    font-size: 1.05rem;
  }

  .info-address {
    font-size: 8px;
  }

  .map-wrapper {
    margin-top: 36px;
  }

  .map-heading {
    padding: 16px;
  }

  .map-frame {
    height: 230px;
  }
}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .event-card,
  .map-button,
  .map-link {
    transition: none;
  }
}

</style>