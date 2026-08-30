<template>
  <section class="rsvp-section">
    <div class="section-glow"></div>
    <div class="grain"></div>

    <div ref="el" class="rsvp-inner">

      <!-- HEADER -->
      <header class="section-header">
        <p class="eyebrow">Vaše prisustvo</p>

        <div class="heading-row">
          <span class="heading-line"></span>
          <span class="heading-symbol">✦</span>
          <span class="heading-line"></span>
        </div>

        <h2 class="section-title">
          Potvrdite dolazak
        </h2>

      </header>


      <div class="form-wrap">
        <Transition name="fade-pop">
          <div v-if="store.submitSuccess" class="success-box">
            <CheckCircle2 :size="36" style="color:#D49128;margin-bottom:16px" />
            <p class="script-heading" style="font-size:2rem;color:#f5f0e8;margin-bottom:8px">Hvala Vam!</p>
            <p style="font-size:13px;color:rgba(245,240,232,0.6);font-family:'Montserrat',sans-serif;line-height:1.7;max-width:300px">
              Vaš odgovor i lijepe želje su uspješno zabilježeni. Radujemo se što ćemo vas ugostiti!
            </p>
            <button class="map-button" style="margin-top:28px" @click="store.clearForm()">
              Pošalji ponovo
              <span class="arrow">↗</span>
            </button>
          </div>
        </Transition>

        <form v-if="!store.submitSuccess" @submit.prevent="submit">

          <!-- Glavni gost -->
          <div class="form-grid">
            <div>
              <label class="field-label">Ime i prezime *</label>
              <input type="text" class="input-dark" placeholder="Vaše ime" required
                     :value="store.form.fullName"
                     @input="store.updateField('fullName', ($event.target as HTMLInputElement).value)" />
            </div>
            <div>
              <label class="field-label">Email</label>
              <input type="email" class="input-dark" placeholder="email@primjer.com"
                     :value="store.form.email"
                     @input="store.updateField('email', ($event.target as HTMLInputElement).value)" />
            </div>
          </div>

          <div style="margin-top:14px">
            <label class="field-label">Potvrda dolaska *</label>
            <select class="input-dark"
                    :value="store.form.rsvpStatus"
                    @change="store.updateField('rsvpStatus', ($event.target as HTMLSelectElement).value as any)">
              <option value="U obradi">Odaberite opciju...</option>
              <option value="Dolazim">Dolazim sa zadovoljstvom</option>
              <option value="Ne dolazim">Nažalost, ne mogu doći</option>
            </select>
          </div>

          <!-- Broj gostiju (Custom brojač) -->
          <div style="margin-top:14px">
            <label class="field-label">Ukupan broj gostiju (uključujući vas) *</label>
            <div class="guest-counter">
              <button type="button" class="counter-btn" @click="decrementGuestCount" :disabled="store.form.guestCount <= 1">−</button>
              <span class="counter-value">{{ store.form.guestCount }}</span>
              <button type="button" class="counter-btn" @click="incrementGuestCount" :disabled="store.form.guestCount >= 10">+</button>
            </div>
          </div>

          <div style="margin-top:14px">
            <label class="field-label">Alergije / prehrambene restrikcije (glavni gost)</label>
            <textarea class="input-dark"
                      placeholder="npr. gluten, laktoza, orasi..."
                      rows="2"
                      style="resize:none"
                      :value="store.form.dietaryRestrictions.join(', ')"
                      @input="store.updateField('dietaryRestrictions', ($event.target as HTMLTextAreaElement).value.split(',').map(item => item.trim()))" />

          </div>

          
          <!-- Pratilac (Partneri / Djeca) -->
          <div class="companion-section" style="margin-top:28px">
            <div class="companion-header">
              <label class="field-label">Vaši pratioci (ako dolazite s nekim)</label>
              <button type="button" class="add-companion-btn" @click="addCompanion">+ Dodaj pratioca</button>
            </div>

            <div v-for="(companion, index) in store.form.companions" :key="index" class="companion-card">
              <div class="companion-card-header">
                <span class="companion-label">Pratilac {{ index + 1 }}</span>
                <button type="button" class="remove-companion-btn" @click="removeCompanion(index)">✕ Ukloni</button>
              </div>

              <input
                  type="text"
                  class="input-dark"
                  placeholder="Ime pratioca"
                  style="margin-bottom:10px"
                  :value="store.form.companions[index]"
                  @input="updateCompanion(index, ($event.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div style="margin-top:14px">
            <label class="field-label">Poruka i želje</label>
            <textarea class="input-dark" placeholder="Napišite vaše želje mladencima..." rows="4" style="resize:none"
                      :value="store.form.wishes"
                      @input="store.updateField('wishes', ($event.target as HTMLTextAreaElement).value)" />
          </div>

          <p v-if="store.submitError" style="margin-top:12px;font-size:12px;color:#fca5a5;font-family:'Montserrat',sans-serif;text-align:center">
            {{ store.submitError }}
          </p>


          <p v-if="store.form.rsvpStatus === 'U obradi'" style="text-align:center;margin-top:10px;font-size:10px;color:rgba(245,240,232,0.4);font-family:'Montserrat',sans-serif">
            Molimo odaberite opciju dolaska prije slanja
          </p>

          <button type="submit" class="map-button submit-btn" :disabled="store.isSubmitting || store.form.rsvpStatus === 'U obradi'" style="margin-top:28px;width:100%">
            <Loader2 v-if="store.isSubmitting" :size="13" class="animate-spin" />
            <Send v-else :size="13" />
            {{ store.isSubmitting ? 'Slanje...' : 'Pošalji potvrdu' }}
          </button>

        </form>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CheckCircle2, Send, Loader2 } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGuestStore } from '~/stores/guestStore'
import { initEmailJS, sendRSVP } from '~/utils/emailjs-config'

const store = useGuestStore()
const el    = ref<HTMLElement | null>(null)

function incrementGuestCount() {
  if (store.form.guestCount < 10) store.form.guestCount++
}

function decrementGuestCount() {
  if (store.form.guestCount > 1) store.form.guestCount--
}

function addCompanion() {
  const newCompanions = [...store.form.companions, '']
  store.form.companions = newCompanions
}

function removeCompanion(index: number) {
  const newCompanions = [...store.form.companions]
  newCompanions.splice(index, 1)
  store.form.companions = newCompanions
}

function updateCompanion(index: number, value: string) {
  const newCompanions = [...store.form.companions]
  newCompanions[index] = value
  store.form.companions = newCompanions
}

async function submit() {
  if (store.form.rsvpStatus === 'U obradi') return
  store.isSubmitting = true
  store.submitError  = null
  try {
    // Pretvori status u tekst koji EmailJS razumije
    const statusText = store.form.rsvpStatus === 'Dolazim' ? 'Dolazim' : 'Ne mogu doći';

    await sendRSVP({
      ...store.form,
      rsvpStatus: statusText
    })

    store.submitSuccess = true
    store.clearForm()
  } catch {
    store.submitError = 'Slanje nije uspjelo. Provjerite internet vezu i pokušajte ponovo.'
  } finally {
    store.isSubmitting = false
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  store.hydrate()
  initEmailJS()

  if (!el.value) return

  const ctx = gsap.context(() => {
    gsap.from(el.value, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el.value,
        start: 'top 85%',
        once: true,
      },
    })
  }, el)

  onUnmounted(() => {
    ctx.revert()
  })
})
</script>

<style scoped>

/* =========================================================
   SECTION (BIJELA POZADINA)
   ========================================================= */
.rsvp-section {
  position: relative;
  overflow: hidden;
  padding: 110px 24px;

  /* Čista bijela pozadina */
  background: #ffffff;

  color: #14311f; /* Tamno zelena za tekst */
}

.rsvp-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

/* =========================================================
   BACKGROUND (Svijetli glow)
   ========================================================= */
.section-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20, 49, 31, 0.05) 0%, rgba(20, 49, 31, 0) 68%);
  pointer-events: none;
}

.grain {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
}

.guest-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(201,169,110,0.15);
  border-radius: 8px;
  padding: 8px 12px;
  background: rgba(16, 41, 26, 0.8);
}

.counter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(201,169,110,0.3);
  border-radius: 6px;
  background: transparent;
  color: #c9a96e;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}

.counter-btn:hover:not(:disabled) {
  background: rgba(201,169,110,0.1);
  border-color: rgba(201,169,110,0.5);
}

.counter-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.counter-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  color: #f5f0e8;
  font-weight: 500;
}

/* =========================================================
   HEADER (Zeleni naslov)
   ========================================================= */
.section-header {
  margin-bottom: 54px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 17px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #b35c3a; /* Ciglasta narandžasta */
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
  background: linear-gradient(90deg, transparent, rgba(20, 49, 31, 0.4));
}
.heading-line:last-child {
  background: linear-gradient(90deg, rgba(20, 49, 31, 0.4), transparent);
}

.heading-symbol {
  font-family: serif;
  font-size: 10px;
  color: #b35c3a;
}

.section-title {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 7vw, 4.4rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.025em;
  color: #14311f; /* Tamno zelena */
}

.section-intro {
  max-width: 390px;
  margin: 20px auto 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.45;
  color: rgba(20, 49, 31, 0.55);
}


.companion-section {
  border-top: 1px solid rgba(201,169,110,0.15);
  padding-top: 20px;
}

.companion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.add-companion-btn {
  background: transparent;
  border: 1px solid rgba(201,169,110,0.4);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #c9a96e;
  cursor: pointer;
  transition: all 0.25s;
}

.add-companion-btn:hover {
  background: rgba(201,169,110,0.1);
  border-color: rgba(201,169,110,0.7);
}

.companion-card {
  border: 1px solid rgba(201,169,110,0.15);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 12px;
  background: rgba(16, 41, 26, 0.5);
}

.companion-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.companion-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(201,169,110,0.8);
}

.remove-companion-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  color: rgba(245,240,232,0.5);
  cursor: pointer;
  transition: all 0.2s;
}

.remove-companion-btn:hover {
  color: #fca5a5;
}

/* =========================================================
   FORM CARD (TAMNO ZELENA KUTIJA)
   ========================================================= */
.form-wrap {
  border: 1px solid rgba(201, 169, 110, 0.22);
  border-radius: 2px;

  /* Tamno zelena pozadina unutar forme */
  background: linear-gradient(180deg, #14311f 0%, #10291a 100%);

  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15);
  padding: 36px 32px;
  color: #f5f0e8; /* Svijetli tekst unutar zelene kutije */
}

@media (max-width: 480px) {
  .form-wrap { padding: 26px 20px; }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 640px) {
  .form-grid { grid-template-columns: 1fr 1fr; }
}

.field-label {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.55); /* Zlatna unutar zelene */
  margin-bottom: 8px;
}

/* Inputi (Tamno zeleni unutar zelene kutije) */
.input-dark {
  width: 100%;
  background: rgba(16, 41, 26, 0.8);
  border: 1px solid rgba(201, 169, 110, 0.15);
  border-radius: 2px;
  padding: 13px 16px;
  color: #f5f0e8;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  transition: all 0.3s ease;
}

.input-dark:focus {
  outline: none;
  border-color: rgba(201, 169, 110, 0.5);
  background: rgba(16, 41, 26, 1);
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.08);
}

.input-dark::placeholder { color: rgba(245, 240, 232, 0.25); }

/* =========================================================
   BUTTON (Isti stil kao map-button)
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
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.map-button:hover:not(:disabled) {
  background: rgba(201, 169, 110, 0.1);
  border-color: rgba(201, 169, 110, 0.6);
  color: #f5f0e8;
}

.map-button:disabled { opacity: 0.45; cursor: not-allowed; }

/* =========================================================
   SUCCESS BOX
   ========================================================= */
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 0;
}

/* Animacije */
.fade-pop-enter-active, .fade-pop-leave-active { transition: all 0.35s ease; }
.fade-pop-enter-from, .fade-pop-leave-to { opacity: 0; transform: scale(0.97); }

/* =========================================================
   MOBILE
   ========================================================= */
@media (max-width: 600px) {
  .rsvp-section { padding: 85px 18px; }
  .section-header { margin-bottom: 44px; }
  .heading-line { width: 40px; }
  .section-title { font-size: 3.1rem; }
  .section-intro { font-size: 1.08rem; }
  .stats-row { margin-bottom: 32px; }
  .stat-num { font-size: 2rem; }
  .form-wrap { padding: 24px 18px; }
}

/* =========================================================
   REDUCED MOTION
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .map-button {
    transition: none;
  }
}

</style>