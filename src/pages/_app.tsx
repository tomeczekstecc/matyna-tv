import type {AppProps} from "next/app"
import {api} from "@/utils/api"
import {Inter as FontSans} from "@next/font/google"
import {ThemeProvider} from "next-themes"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {SessionProvider} from "next-auth/react";
import {Toaster} from 'react-hot-toast';
import {Provider} from "react-redux";
import store from "@/redux/store";

import "@/styles/globals.css"
import {Layout} from "@/components/layout"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const queryClient = new QueryClient();

function App({Component, pageProps: {session, ...pageProps}}: AppProps) {


  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }

        }`}</style>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}/>
          <SessionProvider session={session}
            // basePath={'/api/auth'}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Layout>
                <Toaster position={"bottom-center"}/>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </SessionProvider>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default api.withTRPC(App)

// export default App
