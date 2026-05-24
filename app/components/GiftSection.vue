<template>
  <section class="section-cream" style="padding:64px 32px">
    <div ref="el" class="text-center">
      <h2 class="script-heading" style="font-size:2.8rem;color:#3d1010;margin-bottom:16px">Wedding Gift</h2>
      <div class="divider-h" style="margin-bottom:28px;opacity:0.3" />

      <p style="font-family:'Poppins',sans-serif;font-size:0.8rem;line-height:1.9;color:rgba(61,16,16,0.65);margin-bottom:32px;max-width:320px;margin-left:auto;margin-right:auto">
        Kehadiran dan doa restu Anda merupakan anugerah terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih, Anda dapat menggunakan fitur di bawah ini.
      </p>

      <!-- Bank accounts -->
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px">
        <div v-for="bank in banks" :key="bank.no" class="bank-card">
          <div class="bank-info">
            <p class="bank-name">{{ bank.bank }}</p>
            <p class="bank-no">{{ bank.no }}</p>
            <p class="bank-holder">a.n. {{ bank.holder }}</p>
          </div>
          <button class="copy-btn" @click="copy(bank.no, bank.bank)">
            <CheckCheck v-if="copied === bank.bank" :size="13" style="color:#4ade80" />
            <Copy v-else :size="13" />
            {{ copied === bank.bank ? 'Tersalin' : 'Salin' }}
          </button>
        </div>
      </div>

      <button class="btn-pill-dark" style="margin:0 auto">
        <Gift :size="13" />
        Kirim Hadiah
      </button>
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
  gsap.from(el.value, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el.value, start: 'top 85%' } })
})
</script>

<style scoped>
.bank-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid rgba(61,16,16,0.1);
  border-radius: 14px;
  padding: 16px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.bank-info { text-align: left; }
.bank-name {
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c9a96e;
  margin-bottom: 2px;
}
.bank-no {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #3d1010;
  letter-spacing: 0.05em;
}
.bank-holder {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  color: rgba(61,16,16,0.5);
}
.copy-btn {
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
