<template>
  <div class="music-player">
    <!-- Pulse ring when playing -->
    <div v-if="playing" class="pulse-ring" />
    <button class="music-btn" @click="toggle" :aria-label="playing ? 'Pause music' : 'Play music'">
      <div class="vinyl" :class="{ 'spinning': playing }">
        <div class="vinyl-center" />
      </div>
    </button>
  </div>
  <audio ref="audio" loop preload="none" src="/music/musik.mp3" />
</template>

<script setup lang="ts">
const audio   = ref<HTMLAudioElement>()
const playing = ref(false)

function toggle() {
  if (!audio.value) return
  if (playing.value) {
    audio.value.pause()
    playing.value = false
  } else {
    audio.value.play().catch(() => {})
    playing.value = true
  }
}

onUnmounted(() => audio.value?.pause())
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
}

.music-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(61,16,16,0.9);
  border: 1px solid rgba(201,169,110,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  transition: all 0.25s;
}
.music-btn:hover {
  background: rgba(90,26,26,0.95);
  border-color: rgba(201,169,110,0.7);
}

.vinyl {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: conic-gradient(
    #1a0507 0deg 60deg,
    #3d1010 60deg 120deg,
    #1a0507 120deg 180deg,
    #3d1010 180deg 240deg,
    #1a0507 240deg 300deg,
    #3d1010 300deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(201,169,110,0.3);
}
.vinyl.spinning {
  animation: spin-slow 3s linear infinite;
}
.vinyl-center {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c9a96e;
  opacity: 0.8;
}

.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(201,169,110,0.5);
  animation: pulse-ring 1.5s ease-out infinite;
  pointer-events: none;
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.8; }
  100% { transform: scale(1.6); opacity: 0;   }
}
</style>
