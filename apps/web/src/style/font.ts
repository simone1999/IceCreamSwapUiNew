import { Poppins } from '@next/font/google'

export const poppins = Poppins({
  preload: true,
  weight: ['400', '600'],
  variable: '--font-poppins',
  subsets: ['latin-ext'],
})
