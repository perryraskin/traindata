import React from "react"
import { useRouter } from "next/router"
import Script from "next/script"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const canonicalUrl = (
    `https://www.coverdash.com` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0]
  return (
    <>
      <Script
        id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=62219b18-800f-4384-b866-b07a24a802aa"
      >
        {" "}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
