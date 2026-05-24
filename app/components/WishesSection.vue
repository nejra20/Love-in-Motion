<template>
  <section class="section-cream" style="padding:80px 0">
    <div class="inner" ref="el">
      <div style="text-align:center;margin-bottom:48px">
        <h2 class="script-heading" style="font-size:clamp(2.4rem,5vw,3.6rem);color:#3d1010;margin-bottom:8px">Ucapkan Sesuatu</h2>
        <p style="font-family:'Poppins',sans-serif;font-size:12px;color:rgba(61,16,16,0.5)">Berikan Ucapan &amp; Doa Restu</p>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-box attending">
          <p class="serif-heading stat-num">{{ store.attendingCount }}</p>
          <p class="stat-label">Hadir</p>
        </div>
        <div style="width:1px;background:rgba(61,16,16,0.1);align-self:stretch" />
        <div class="stat-box declined">
          <p class="serif-heading stat-num">{{ store.declinedCount }}</p>
          <p class="stat-label">Tidak Hadir</p>
        </div>
      </div>

      <!-- Form or success -->
      <div class="form-wrap">
        <Transition name="fade-pop">
          <div v-if="store.submitSuccess" class="success-box">
            <CheckCircle2 :size="32" style="color:#4ade80;margin-bottom:12px" />
            <p class="serif-heading" style="font-size:1.3rem;color:#3d1010;margin-bottom:6px">Terima Kasih!</p>
            <p style="font-size:12px;color:rgba(61,16,16,0.55);font-family:'Poppins',sans-serif">Ucapan dan konfirmasi kehadiranmu telah kami terima.</p>
            <button class="btn-pill-dark" style="margin-top:20px" @click="store.clearForm()">Kirim Lagi</button>
          </div>
        </Transition>

        <form v-if="!store.submitSuccess" @submit.prevent="submit">
          <div class="form-grid">
            <div>
              <label class="field-label">Nama Lengkap *</label>
              <input type="text" class="input-cream" placeholder="Nama Anda" required
                :value="store.form.fullName"
                @input="store.updateField('fullName', ($event.target as HTMLInputElement).value)" />
            </div>
            <div>
              <label class="field-label">Email</label>
              <input type="email" class="input-cream" placeholder="email@contoh.com"
                :value="store.form.email"
                @input="store.updateField('email', ($event.target as HTMLInputElement).value)" />
            </div>
          </div>

          <div style="margin-top:14px">
            <label class="field-label">Ucapan &amp; Doa</label>
            <textarea class="input-cream" placeholder="Tuliskan ucapan dan doa terbaikmu..." rows="4" style="resize:none"
              :value="store.form.songRequest"
              @input="store.updateField('songRequest', ($event.target as HTMLTextAreaElement).value)" />
          </div>

          <div style="margin-top:14px">
            <label class="field-label">Konfirmasi Kehadiran *</label>
            <select class="input-cream"
              :value="store.form.rsvpStatus"
              @change="store.updateField('rsvpStatus', ($event.target as HTMLSelectElement).value as any)">
              <option value="pending" disabled>Pilih kehadiran...</option>
              <option value="attending">Hadir</option>
              <option value="declined">Tidak Hadir</option>
            </select>
          </div>

          <p v-if="store.submitError" style="margin-top:10px;font-size:12px;color:#e53e3e;font-family:'Poppins',sans-serif">
            {{ store.submitError }}
          </p>

          <button type="submit" class="submit-btn" :disabled="store.isSubmitting || store.form.rsvpStatus === 'pending'" style="margin-top:20px">
            <Loader2 v-if="store.isSubmitting" :size="14" class="animate-spin" />
            <Send v-else :size="14" />
            {{ store.isSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
          </button>

          <p v-if="store.form.rsvpStatus === 'pending'" style="text-align:center;margin-top:8px;font-size:11px;color:rgba(61,16,16,0.4);font-family:'Poppins',sans-serif">
            Pilih konfirmasi kehadiran terlebih dahulu
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle2, Send, Loader2 } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGuestStore } from '~/stores/guestStore'
import { initEmailJS, sendRSVP } from '~/utils/emailjs-config'

const store = useGuestStore()
const el    = ref<HTMLElement>()

async function submit() {
  if (store.form.rsvpStatus === 'pending') return
  store.isSubmitting = true
  store.submitError  = null
  try {
    await sendRSVP({ ...store.form })
    store.submitSuccess = true
    store.clearForm()
  } catch {
    store.submitError = 'Gagal mengirim. Periksa koneksi internet dan coba lagi.'
  } finally {
    store.isSubmitting = false
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  store.hydrate()
  initEmailJS()
  gsap.from(el.value, { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
})
</script>

<style scoped>
.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: white;
  border: 1px solid rgba(61,16,16,0.08);
  border-radius: 16px;
  overflow: hidden;
  max-width: 320px;
  margin: 0 auto 40px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05);
}
.stat-box { flex: 1; padding: 20px 16px; text-align: center; }
.stat-num {
  font-size: 2rem;
  color: #3d1010;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-label {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(61,16,16,0.5);
}

.form-wrap {
  max-width: 680px;
  margin: 0 auto;
  background: white;
  border: 1px solid rgba(61,16,16,0.08);
  border-radius: 24px;
  padding: 36px 32px;
  box-shadow: 0 8px 48px rgba(0,0,0,0.07);
}
@media (max-width: 480px) {
  .form-wrap { padding: 24px 20px; }
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
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(61,16,16,0.5);
  margin-bottom: 7px;
}

.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 0;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  background: linear-gradient(135deg, #2a080a, #5a1a1a);
  color: #f5f0e8;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 4px 24px rgba(61,16,16,0.25);
}
.submit-btn:hover:not(:disabled) { background: linear-gradient(135deg, #3d1010, #7a2424); box-shadow: 0 8px 32px rgba(61,16,16,0.35); }
.submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

.fade-pop-enter-active, .fade-pop-leave-active { transition: all 0.35s ease; }
.fade-pop-enter-from, .fade-pop-leave-to { opacity: 0; transform: scale(0.97); }
</style>
