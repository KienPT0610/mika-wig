
import React, { useEffect } from 'react'
import { AlertProvider } from '../context/AlertContext'
import '../styles/globals.css'
import Head from 'next/head'
import logUserAction from '../lib/logUserAction'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { pageview } from '../lib/ga'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    logUserAction({ user_id: user.id, action: 'visit' })
  }, [])
  const router = useRouter()
  useEffect(() => {
    const handleRoute = (url) => pageview(url)
    router.events.on('routeChangeComplete', handleRoute)
    return () => router.events.off('routeChangeComplete', handleRoute)
  }, [router.events])
  return (
    <>
      {/* Google Analytics - set NEXT_PUBLIC_GA_ID in your env (G-XXXXXXX) */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      )}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
        <title>Mika.wig – Tóc giả cao cấp</title>
      </Head>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </>
  )
}
