import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}

export function animateHero(selectors: {
  badge: string
  title: string[]
  subtitle: string
  cta: string
  image: string
}) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(selectors.badge, { opacity: 0, y: -16, duration: 0.6 })
    .from(selectors.title, { opacity: 0, y: 32, stagger: 0.12, duration: 0.8 }, '-=0.3')
    .from(selectors.subtitle, { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
    .from(selectors.cta, { opacity: 0, y: 16, duration: 0.5 }, '-=0.3')
    .from(selectors.image, { opacity: 0, scale: 1.04, duration: 1.0 }, '-=0.8')

  return tl
}

export function animateOnScroll(elements: string | Element[], options?: {
  y?: number
  stagger?: number
  duration?: number
  start?: string
}) {
  const opts = {
    y: options?.y ?? 40,
    stagger: options?.stagger ?? 0.15,
    duration: options?.duration ?? 0.7,
    start: options?.start ?? 'top 82%',
  }

  gsap.from(elements, {
    opacity: 0,
    y: opts.y,
    stagger: opts.stagger,
    duration: opts.duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: typeof elements === 'string' ? elements : (elements as Element[])[0],
      start: opts.start,
      toggleActions: 'play none none none',
    },
  })
}

export function cleanupGSAP() {
  ScrollTrigger.getAll().forEach(t => t.kill())
}
