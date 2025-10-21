import { useEffect, useState } from 'react'

export default function useCartCount(userId) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!userId) return setCount(0)
    function updateCount() {
      fetch(`/api/cart?user_id=${userId}`)
        .then(r => r.json())
  .then(j => setCount(j.items ? j.items.length : 0))
    }
    updateCount()
    window.addEventListener('cart-changed', updateCount)
    return () => window.removeEventListener('cart-changed', updateCount)
  }, [userId])
  return count
}
