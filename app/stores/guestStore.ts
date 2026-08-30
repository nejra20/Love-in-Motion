import { defineStore } from 'pinia'

export interface GuestFormData {
  fullName: string
  email: string
  phone: string
  guestCount: number
  companions: string[]
  dietaryRestrictions: string[]
  wishes: string
  rsvpStatus: 'U obradi' | 'Dolazim' | 'Ne dolazim'
  timestamp: number
}

const CACHE_KEY = 'wedding-guest-form'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000

const defaultForm = (): GuestFormData => ({
  fullName: '',
  email: '',
  phone: '',
  guestCount: 1,
  companions: [] as string[],
  dietaryRestrictions: [] as string[],
  wishes: '',
  rsvpStatus: 'U obradi',
  timestamp: Date.now(),
})

export const useGuestStore = defineStore('guest', () => {
  const form = ref<GuestFormData>(defaultForm())
  const lastSaved = ref<number | null>(null)
  const isSubmitting = ref(false)
  const submitSuccess = ref(false)
  const submitError = ref<string | null>(null)

  let saveTimer: ReturnType<typeof setTimeout> | null = null

  function hydrate() {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (!raw) return
      const cached: GuestFormData = JSON.parse(raw)
      if (Date.now() - cached.timestamp > CACHE_TTL) {
        localStorage.removeItem(CACHE_KEY)
        return
      }
      form.value = cached
      lastSaved.value = cached.timestamp
    } catch {
      localStorage.removeItem(CACHE_KEY)
    }
  }

  function saveToCache() {
    if (typeof window === 'undefined') return
    form.value.timestamp = Date.now()
    localStorage.setItem(CACHE_KEY, JSON.stringify(form.value))
    lastSaved.value = form.value.timestamp
  }

  function updateField<K extends keyof GuestFormData>(field: K, value: GuestFormData[K]) {
    ;(form.value as GuestFormData)[field] = value
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(saveToCache, 500)
  }

  function toggleDietary(item: string) {
    const list = form.value.dietaryRestrictions
    const idx = list.indexOf(item)
    if (idx === -1) list.push(item)
    else list.splice(idx, 1)
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(saveToCache, 500)
  }

  function clearForm() {
    form.value = defaultForm()
    lastSaved.value = null
    submitSuccess.value = false
    submitError.value = null
    if (typeof window !== 'undefined') localStorage.removeItem(CACHE_KEY)
  }

  const lastSavedLabel = computed(() => {
    if (!lastSaved.value) return null
    const mins = Math.floor((Date.now() - lastSaved.value) / 60000)
    if (mins < 1) return 'just now'
    if (mins === 1) return '1 minute ago'
    return `${mins} minutes ago`
  })

  return {
    form,
    lastSaved,
    lastSavedLabel,
    isSubmitting,
    submitSuccess,
    submitError,
    hydrate,
    saveToCache,
    updateField,
    toggleDietary,
    clearForm,
  }
})
