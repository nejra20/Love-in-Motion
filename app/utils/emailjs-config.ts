import emailjs from '@emailjs/browser'

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'YOUR_PUBLIC_KEY'
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID'

export function initEmailJS() {
  emailjs.init(PUBLIC_KEY)
}

export async function sendRSVP(data: {
  fullName: string
  email: string
  phone: string
  guestCount: number
  dietaryRestrictions: string[]
  songRequest: string
  rsvpStatus: string
}) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: data.fullName,
    from_email: data.email,
    phone: data.phone || '-',
    guest_count: data.guestCount,
    dietary: data.dietaryRestrictions.join(', ') || 'None',
    song: data.songRequest || '-',
    rsvp_status: data.rsvpStatus,
    submission_date: new Date().toLocaleString('id-ID'),
  })
}
