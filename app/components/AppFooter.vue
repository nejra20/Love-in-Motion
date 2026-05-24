<template>
  <footer class="section-dark" style="padding:48px 32px 56px;position:relative;overflow:hidden;text-align:center">
    <div class="texture-overlay" />

    <div class="relative z-10">
      <!-- Gold ornament -->
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:28px">
        <div style="height:1px;width:48px;background:linear-gradient(to right,transparent,#c9a96e)" />
        <Heart :size="14" fill="#c9a96e" style="color:#c9a96e;opacity:0.7" />
        <div style="height:1px;width:48px;background:linear-gradient(to left,transparent,#c9a96e)" />
      </div>

      <!-- Closing headline -->
      <p class="serif-heading" style="font-size:1rem;color:rgba(245,240,232,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:12px">
        Terima Kasih
      </p>

      <!-- Couple illustration circle -->
      <div class="footer-couple-wrap">
        <img src="/images/couple.jpg" alt="Rizky & Anisa" class="footer-couple-img" @error="imgErr = true" />
        <div v-if="imgErr" class="footer-couple-fallback" />
      </div>

      <!-- Closing text -->
      <p style="font-family:'Poppins',sans-serif;font-size:11px;line-height:1.9;color:rgba(245,240,232,0.55);max-width:300px;margin:0 auto 24px">
        Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do'a restu kepada kami.
      </p>

      <p class="sec-label" style="color:rgba(201,169,110,0.5);margin-bottom:8px">KAMI YANG BERBAHAGIA</p>
      <h2 class="serif-heading" style="font-size:1.8rem;color:#f5f0e8">Rizky &amp; Anisa</h2>

      <div class="divider-h" style="opacity:0.15;margin:28px 0 20px" />

      <!-- Social icons -->
      <div style="display:flex;justify-content:center;gap:16px;margin-bottom:24px">
        <a href="#" class="social-btn" aria-label="Instagram">
          <Instagram :size="18" />
        </a>
        <a href="#" class="social-btn" aria-label="WhatsApp">
          <MessageCircle :size="18" />
        </a>
      </div>

      <p style="font-family:'Poppins',sans-serif;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(245,240,232,0.2)">
        Made with love · Love in Motion
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Heart, Instagram, MessageCircle } from 'lucide-vue-next'
const imgErr = ref(false)
</script>

<style scoped>
.texture-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.footer-couple-wrap {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 24px;
  border: 2px solid rgba(201,169,110,0.3);
  box-shadow: 0 8px 40px rgba(0,0,0,0.4);
}
.footer-couple-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.footer-couple-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5a1a1a 0%, #3d1010 100%);
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(245,240,232,0.2);
  color: rgba(245,240,232,0.5);
  transition: all 0.25s;
}
.social-btn:hover {
  background: rgba(255,255,255,0.08);
  color: rgba(245,240,232,0.85);
  border-color: rgba(245,240,232,0.4);
}
</style>
