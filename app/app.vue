<template>
  <div>
    <Transition name="cover">
      <CoverSection v-if="coverVisible" @open="openInvitation" />
    </Transition>

    <Transition name="main">
      <div v-if="!coverVisible">
        <HeroSection />
        <VerseSection />
        <CoupleSection />
        <LoveStory />
        <EventDetails />
        <GiftSection />
        <WishesSection />
        <AppFooter />
      </div>
    </Transition>

    <MusicPlayer v-if="!coverVisible" />
  </div>
</template>

<script setup lang="ts">
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const coverVisible = ref(true)
let lenis: Lenis

function openInvitation() {
  coverVisible.value = false
  nextTick(() => {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  })
}

onUnmounted(() => lenis?.destroy())
</script>
