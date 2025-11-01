// Simple GA wrapper for gtag (GA4). Uses NEXT_PUBLIC_GA_ID to load gtag in _app.js.
export function pageview(url) {
  try {
    if (typeof window === 'undefined') return
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: url })
    }
  } catch (e) {
    // ignore
  }
}

export function event({ action, category, label, value }) {
  try {
    if (typeof window === 'undefined') return
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  } catch (e) {}
}

export function conversion({ name = 'conversion', value = 1 }) {
  try {
    if (typeof window === 'undefined') return
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, { value })
    }
  } catch (e) {}
}
