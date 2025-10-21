export default async function logUserAction({ user_id, action, details }) {
  try {
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
