<template>
  <section class="section-cream" style="padding:0 0 72px">
    <!-- Top arch decoration (dark maroon semicircle) -->
    <div class="wishes-arch">
      <div class="arch-circle">
        <img src="/images/couple.jpg" alt="couple" class="arch-couple" @error="imgErr = true" />
        <div v-if="imgErr" class="arch-couple-fallback" />
        <div class="arch-vignette" />
      </div>
    </div>

    <div ref="el" style="padding:0 28px">
      <!-- Title -->
      <div class="text-center" style="margin-bottom:32px">
        <h2 class="script-heading" style="font-size:2.8rem;color:#3d1010;margin-bottom:8px">Ucapkan Sesuatu</h2>
        <p style="font-family:'Poppins',sans-serif;font-size:12px;color:rgba(61,16,16,0.55)">
          Berikan Ucapan &amp; Doa Restu
        </p>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-box attending">
          <p class="stat-num">{{ store.attendingCount }}</p>
          <p class="stat-label">Hadir</p>
        </div>
        <div class="stat-box declined">
          <p class="stat-num">{{ store.declinedCount }}</p>
          <p class="stat-label">Tidak Hadir</p>
        </div>
      </div>

      <!-- Success message -->
      <Transition name="fade-pop">
        <div v-if="store.submitSuccess" class="success-box">
          <CheckCircle2 :size="28" style="color:#4ade80;margin-bottom:8px" />
          <p class="serif-heading" style="font-size:1.2rem;color:#3d1010;margin-bottom:4px">Terima Kasih!</p>
          <p style="font-size:12px;color:rgba(61,16,16,0.6);font-family:'Poppins',sans-serif">Ucapan dan konfirmasi kehadiranmu telah kami terima.</p>
          <button class="btn-pill-dark" style="margin-top:16px" @click="store.clearForm()">Kirim Lagi</button>
        </div>
      </Transition>

      <!-- Form -->
      <form v-if="!store.submitSuccess" ref="formEl" @submit.prevent="submit" style="display:flex;flex-direction:column;gap:14px">
        <!-- Name -->
        <input
          type="text"
          class="input-cream"
          placeholder="Nama"
          :value="store.form.fullName"
          @input="store.updateField('fullName', ($event.target as HTMLInputElement).value)"
          required
        />

        <!-- Message -->
        <textarea
          class="input-cream"
          placeholder="Ucapan &amp; Doa"
          rows="4"
          :value="store.form.songRequest"
          @input="store.updateField('songRequest', ($event.target as HTMLTextAreaElement).value)"
          style="resize:none"
        />

        <!-- Attendance select -->
        <select
          class="input-cream"
          :value="store.form.rsvpStatus"
          @change="store.updateField('rsvpStatus', ($event.target as HTMLSelectElement).value as any)"
        >
          <option value="pending" disabled>Konfirmasi Kehadiran</option>
          <option value="attending">Hadir</option>
          <option value="declined">Tidak Hadir</option>
        </select>

        <!-- Error -->
        <p v-if="store.submitError" style="font-size:12px;color:#e53e3e;font-family:'Poppins',sans-serif">
          {{ store.submitError }}
        </p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="store.isSubmitting || store.form.rsvpStatus === 'pending'"
          class="submit-btn"
        >
          <Loader2 v-if="store.isSubmitting" :size="14" class="animate-spin" />
          <Send v-else :size="14" />
          {{ store.isSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle2, Send, Loader2 } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGuestStore } from '~/stores/guestStore'
import { initEmailJS, sendRSVP } from '~/utils/emailjs-config'

const store  = useGuestStore()
const formEl = ref<HTMLElement>()
const el     = ref<HTMLElement>()
const imgErr = ref(false)

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
  gsap.from(el.value, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
})
</script>

<style scoped>
.wishes-arch {
  position: relative;
  height: 180px;
  background: linear-gradient(160deg, #2a080a 0%, #3d1010 100%);
  border-radius: 0 0 50% 50% / 0 0 60px 60px;
  overflow: hidden;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}
.arch-circle {
  position: absolute;
  bottom: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(245,240,232,0.15);
  box-shadow: 0 8px 40px rgba(0,0,0,0.4);
}
.arch-couple {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.arch-couple-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5a1a1a 0%, #3d1010 100%);
}
.arch-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%);
}

.stats-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}
.stat-box {
  flex: 1;
  border-radius: 12px;
  padding: 14px;
  text-align: center;
}
.attending { background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.25); }
.declined  { background: rgba(239,68,68,0.1);  border: 1px solid rgba(239,68,68,0.2);  }
.stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #3d1010;
  margin-bottom: 2px;
}
.stat-label {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(61,16,16,0.6);
}

.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px;
  background: white;
  border: 1px solid rgba(61,16,16,0.1);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: linear-gradient(135deg, #3d1010, #5a1a1a);
  color: #f5f0e8;
  border: none;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 4px 20px rgba(61,16,16,0.3);
}
.submit-btn:hover:not(:disabled) { background: linear-gradient(135deg, #5a1a1a, #7a2424); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.fade-pop-enter-active,.fade-pop-leave-active { transition: all 0.35s ease; }
.fade-pop-enter-from,.fade-pop-leave-to { opacity:0; transform:scale(0.97); }
</style>
