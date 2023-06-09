import { Head, Html, Main, NextScript } from "next/document"

import { Layout } from "@/components/layout"

export default function Document() {
  return (
    <Html lang="pl">
      <Head />
        <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
          <Main />
          <NextScript />
        </body>
     </Html>
  )
}
