import type {AppProps} from "next/app"
import {api} from "@/utils/api"
import {Inter as FontSans} from "@next/font/google"
import {ThemeProvider} from "next-themes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import "@/styles/globals.css"
import {Layout} from "@/components/layout"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const queryClient = new QueryClient();

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }

        }`}</style>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default api.withTRPC(App)

// export default App