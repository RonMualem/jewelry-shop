import './globals.css'
import { Heebo } from 'next/font/google'

export const metadata = {
  title: '✨ MyJewelry — חנות תכשיטים',
  description: 'חנות תכשיטים אלגנטית — הזמנה מהירה ב־WhatsApp',
  viewport: { width: 'device-width', initialScale: 1 }
}

const heebo = Heebo({ subsets: ['hebrew', 'latin'], weight: ['300','400','500','700'] })

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body className={heebo.className}>
        {children}
      </body>
    </html>
  )
}
