<template>
  <section class="agenda-section">
    <div class="agenda-bg"></div>

    <div class="agenda-container">

      <!-- Naslov -->
      <div class="title-wrap">
        <h2 class="section-title">Agenda dana</h2>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <div
            v-for="(item, index) in agendaItems"
            :key="index"
            class="timeline-item"
        >
          <div class="timeline-marker">
            <span class="dot"></span>

            <span
                v-if="index !== agendaItems.length - 1"
                class="line"
            ></span>
          </div>

          <div class="timeline-content">
            <span class="time">{{ item.time }}</span>

            <h3 class="event-title">
              {{ item.title }}
            </h3>

            <p v-if="item.description" class="event-description">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Napomena o alergijama -->
      <div class="agenda-footer">
        <span class="footer-ornament">✦</span>
        <p class="agenda-note">
          Molimo vas da <strong>na vrijeme prijavite</strong> sve alergije i prehrambene restrikcije kako bismo vam mogli prilagoditi jelovnik.
        </p>
        <span class="footer-ornament">✦</span>
      </div>

    </div>
  </section>
</template>

<script setup>
const agendaItems = [
  {
    time: '18:00h',
    title: 'Dolazak gostiju u hotel'
  },
  {
    time: '18:15h',
    title: 'Posluga pića',
    description: 'Dobrodošlica uz bezalkoholno piće'
  },
  {
    time: '18:45h',
    title: 'Svečani ulazak mladenaca'
  },
  {
    time: '19:00h',
    title: 'Početak posluživanja večere',
    description: 'Bečko posluživanje - Suho meso, sudžuka, razne vrste sireva, masline, orašasti plodovi, pita - Begova čorba, Kombinacija pečeni teleći odrezak, pileći file u sosu od šampinjona sa restanim\n' +
        'krompirom i torticom od grilovanog povrća'
  },
  {
    time: '20:00h',
    title: 'Prvi ples mladenaca'
  },
  {
    time: '21:00h',
    title: 'Posluživanje torte'
  },
  {
    time: '23:00h',
    title: 'Kraj muzičkog programa'
  },
];
</script>

<style scoped>

/* =========================================================
   SECTION
   ========================================================= */

.agenda-section {
  position: relative;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 100px 24px;

  overflow: hidden;

  background: #f5f0e8;
  color: #14311f;
}


/* =========================================================
   BACKGROUND
   ========================================================= */

.agenda-bg {
  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
      radial-gradient(
          ellipse at center top,
          rgba(255, 255, 255, 0.55) 0%,
          rgba(255, 255, 255, 0) 55%
      );
}


/* =========================================================
   CONTAINER
   ========================================================= */

.agenda-container {
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 620px;
}


/* =========================================================
   TITLE
   ========================================================= */

.title-wrap {
  text-align: center;
  margin-bottom: 72px;
}

.ornament {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 13px;
  margin-bottom: 17px;
}

.ornament-line {
  width: 58px;
  height: 1px;

  background: linear-gradient(
      to right,
      transparent,
      rgba(212, 145, 40, 0.75)
  );
}

.ornament-line:last-child {
  background: linear-gradient(
      to left,
      transparent,
      rgba(212, 145, 40, 0.75)
  );
}

.ornament-symbol {
  color: #d49128;

  font-family: serif;
  font-size: 11px;
  line-height: 1;
}

.section-title {
  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 7vw, 4rem);
  font-weight: 500;

  line-height: 0.95;
  letter-spacing: -0.02em;

  color: #14311f;
}


/* =========================================================
   TIMELINE
   ========================================================= */

.timeline {
  position: relative;

  width: 100%;

  display: flex;
  flex-direction: column;
}


/* =========================================================
   TIMELINE ITEM
   ========================================================= */

.timeline-item {
  position: relative;

  display: flex;
  align-items: flex-start;

  min-height: 105px;
}


/* =========================================================
   MARKER
   ========================================================= */

.timeline-marker {
  position: relative;

  width: 24px;
  min-width: 24px;

  display: flex;
  justify-content: center;
}

.dot {
  position: relative;
  z-index: 2;

  width: 9px;
  height: 9px;

  margin-top: 7px;

  border-radius: 50%;

  background: #d49128;

  box-shadow:
      0 0 0 4px #f5f0e8,
      0 0 0 5px rgba(212, 145, 40, 0.3);
}

.line {
  position: absolute;

  top: 20px;
  bottom: 0;

  width: 1px;

  background: linear-gradient(
      to bottom,
      rgba(212, 145, 40, 0.55),
      rgba(212, 145, 40, 0.15)
  );
}


/* =========================================================
   CONTENT
   ========================================================= */

.timeline-content {
  padding-left: 28px;
  padding-bottom: 38px;
}

.time {
  display: block;

  margin-bottom: 5px;

  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 600;

  letter-spacing: 0.18em;
  text-transform: uppercase;

  color: #d49128;
}

.event-title {
  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.7rem, 4vw, 2rem);
  font-weight: 400;

  line-height: 1.15;

  color: #14311f;
}

.event-description {
  margin: 6px 0 0 0;

  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 300;

  line-height: 1.5;

  color: rgba(20, 49, 31, 0.6);
}


/* =========================================================
   FOOTER
   ========================================================= */

.agenda-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 14px;

  margin-top: 30px;
  padding: 24px 20px;

  border-top: 1px solid rgba(212, 145, 40, 0.15);
  border-bottom: 1px solid rgba(212, 145, 40, 0.15);
}

.agenda-note {
  max-width: 390px;

  margin: 0;

  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;

  line-height: 1.4;
  text-align: center;

  color: rgba(20, 49, 31, 0.75);
}

.agenda-note strong {
  color: #d49128;
  font-weight: 600;
}

.footer-ornament {
  flex-shrink: 0;

  font-family: serif;
  font-size: 8px;

  color: #d49128;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .agenda-section {
    min-height: auto;

    padding: 80px 22px;
  }

  .title-wrap {
    margin-bottom: 58px;
  }

  .ornament-line {
    width: 42px;
  }

  .section-title {
    font-size: 3rem;
  }

  .timeline-item {
    min-height: 100px;
  }

  .timeline-marker {
    width: 20px;
    min-width: 20px;
  }

  .timeline-content {
    padding-left: 22px;
    padding-bottom: 34px;
  }

  .dot {
    width: 8px;
    height: 8px;

    margin-top: 6px;

    box-shadow:
        0 0 0 3px #f5f0e8,
        0 0 0 4px rgba(212, 145, 40, 0.3);
  }

  .line {
    top: 18px;
  }

  .time {
    font-size: 9px;
    letter-spacing: 0.16em;
  }

  .event-title {
    font-size: 1.6rem;
  }

  .event-description {
    font-size: 10px;
  }

  .agenda-footer {
    flex-direction: column;
    gap: 12px;

    padding: 20px 16px;
    margin-top: 20px;
  }

  .agenda-note {
    font-size: 1.05rem;
  }

  .footer-ornament {
    display: none;
  }
}


/* =========================================================
   VERY SMALL SCREENS
   ========================================================= */

@media (max-width: 380px) {

  .agenda-section {
    padding-left: 18px;
    padding-right: 18px;
  }

  .timeline-content {
    padding-left: 18px;
  }

  .event-title {
    font-size: 1.5rem;
  }

  .agenda-note {
    font-size: 1rem;
  }
}

</style>