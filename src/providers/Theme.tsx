'use client'

import { ThemeContextProvider, ThemeType } from '@/contexts/ThemeContext'
import { GlobalStyle } from '@/styles/global'
import { ReactNode } from 'react'

interface ThemeProps {
  initialTheme: ThemeType
  children: ReactNode
}

export function Theme({ initialTheme, children }: ThemeProps) {
  return (
    <ThemeContextProvider initialTheme={initialTheme}>
      {children}

      <GlobalStyle />
    </ThemeContextProvider>
  )
}
