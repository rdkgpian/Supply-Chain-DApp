import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Genesis Blocks</title>
      </Head>
      <body className='bg-black'>
      <video className='invisible lg:visible fixed z-[-1] w-auto h-auto' autoPlay muted loop>
        <source src="/pexels-rostislav-uzunov-5453622.mp4" type='video/mp4' />
      </video>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}