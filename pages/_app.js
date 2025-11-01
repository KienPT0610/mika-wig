import React, { useEffect } from "react";
import { AlertProvider } from "../context/AlertContext";
import "../styles/globals.css";
import Head from "next/head";
import logUserAction from "../lib/logUserAction";
import { useRouter } from "next/router";
import Script from "next/script";
import { pageview } from "../lib/ga";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    logUserAction({ user_id: user.id, action: "visit" });
  }, []);
  const router = useRouter();
  useEffect(() => {
    const handleRoute = (url) => pageview(url);
    router.events.on("routeChangeComplete", handleRoute);
    return () => router.events.off("routeChangeComplete", handleRoute);
  }, [router.events]);
  return (
    <>
      {/* Google Analytics - set NEXT_PUBLIC_GA_ID in your env (G-XXXXXXX) */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      )}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Mika.wig – Tóc giả cao cấp</title>
      </Head>
      <a
        href="https://wa.me/84787105263" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600 transition-all z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.5 3.5A9.5 9.5 0 015 19.5L3 22l2.5-.5A9.5 9.5 0 1119.5 3.5z"
          />
        </svg>
        Chat WhatsApp
      </a>

      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </>
  );
}
