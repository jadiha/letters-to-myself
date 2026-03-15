import { Pixelify_Sans, Dancing_Script, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

// Pixelify Sans — all pixel UI elements
const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pixel',
})

// Dancing Script — letter handwriting
const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cursive',
})

// Cormorant Garamond — headings
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
})

export const metadata = {
  title: 'Letters to Myself',
  description: 'A daily gratitude letter to yourself',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${pixelify.variable} ${dancing.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
