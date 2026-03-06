'use client'

import { darkTheme } from '@/styles/themes/darkTheme'
import { lightTheme } from '@/styles/themes/lightTheme'
import { ReactNode, createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { setCookie } from 'nookies'

export type ThemeType = 'dark' | 'light'

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextType)

interface ThemeContextProps {
  initialTheme: ThemeType
  children: ReactNode
}

export function ThemeContextProvider({
  initialTheme,
  children,
}: ThemeContextProps) {
  const [theme, setTheme] = useState<ThemeType>(initialTheme)

  function toggleTheme() {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      setCookie(null, 'theme', newTheme, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
