import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AuthGuard({ children }){
  const [checked, setChecked] = useState(false)
  const router = useRouter()

  useEffect(()=>{
    // simple demo check: presence of localStorage 'user'
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (!user) {
      // redirect to login
      router.replace('/login')
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) return null
  return children
}
