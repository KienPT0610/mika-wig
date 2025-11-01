import { event } from './ga'

export default async function logUserAction({ user_id, action, details }) {
  // Send to legacy server logs (kept for historical/mechanical reasons) but
  // also try to send an event to Google Analytics if available.
  try {
    // fire GA event (non-blocking)
    try { event({ action, category: 'user_action', label: details || '', value: user_id }) } catch (e) {}

    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user_id,
        action,
        details,
        ip_address: '', // Optionally set from server
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      })
    })
  } catch (e) {}
}
