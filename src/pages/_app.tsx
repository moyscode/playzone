import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { MonthContextProvider } from '@/contexts/MonthContextProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PaulA</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/Badminton.ico' />
      </Head>
      <MonthContextProvider>
        <Component {...pageProps} />
      </MonthContextProvider>
    </>
  );
}
