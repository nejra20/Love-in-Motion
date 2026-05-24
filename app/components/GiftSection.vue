<template>
  <section class="section-cream" style="padding:80px 0">
    <div class="inner" ref="el">
      <div style="text-align:center;margin-bottom:48px">
        <h2 class="script-heading" style="font-size:clamp(2.4rem,5vw,3.6rem);color:#3d1010;margin-bottom:14px">Wedding Gift</h2>
        <div class="divider-h" style="opacity:0.25;max-width:280px;margin:0 auto 20px" />
        <p style="font-family:'Poppins',sans-serif;font-size:0.82rem;line-height:1.9;color:rgba(61,16,16,0.62);max-width:480px;margin:0 auto">
          Kehadiran dan doa restu Anda merupakan anugerah terindah. Namun apabila Anda ingin memberikan tanda kasih, Anda dapat menggunakan rekening di bawah ini.
        </p>
      </div>

      <!-- Bank cards: side by side on desktop -->
      <div class="banks-grid">
        <div v-for="bank in banks" :key="bank.no" class="bank-card">
          <div class="bank-logo">{{ bank.bank }}</div>
          <div class="bank-mid">
            <p class="serif-heading bank-no">{{ bank.no }}</p>
            <p class="bank-holder">a.n. {{ bank.holder }}</p>
          </div>
          <button class="copy-btn" @click="copy(bank.no, bank.bank)">
            <CheckCheck v-if="copied === bank.bank" :size="13" style="color:#4ade80" />
            <Copy v-else :size="13" />
            {{ copied === bank.bank ? 'Tersalin!' : 'Salin' }}
          </button>
        </div>
      </div>

      <div style="text-align:center;margin-top:36px">
        <button class="btn-pill-dark">
          <Gift :size="13" />
          Kirim Hadiah
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Copy, CheckCheck, Gift } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const el     = ref<HTMLElement>()
const copied = ref<string | null>(null)

const banks = [
  { bank: 'BCA',  no: '1234567890', holder: 'Muhammad Rizky Pratama' },
  { bank: 'BRI',  no: '0987654321', holder: 'Anisa Ramadhani'        },
]

async function copy(no: string, bank: string) {
  await navigator.clipboard.writeText(no)
  copied.value = bank
  setTimeout(() => (copied.value = null), 2000)
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.from(el.value, { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
})
</script>

<style scoped>
.banks-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 640px;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .banks-grid { grid-template-columns: 1fr 1fr; }
}

.bank-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  border: 1px solid rgba(61,16,16,0.08);
  border-radius: 18px;
  padding: 22px 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  transition: box-shadow 0.25s, transform 0.25s;
}
.bank-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.1); transform: translateY(-2px); }

.bank-logo {
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c9a96e;
}
.bank-mid { flex: 1; }
.bank-no {
  font-size: 1.4rem;
  color: #3d1010;
  letter-spacing: 0.04em;
}
.bank-holder {
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  color: rgba(61,16,16,0.5);
  margin-top: 2px;
}
.copy-btn {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(61,16,16,0.5);
  background: none;
  border: 1px solid rgba(61,16,16,0.15);
  border-radius: 100px;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.copy-btn:hover { color: #3d1010; border-color: rgba(61,16,16,0.35); }
</style>
