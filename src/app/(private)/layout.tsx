import { Header } from '@/components/Header'
import { PrivateLayoutContainer } from './styles'
import { ReactNode } from 'react'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <PrivateLayoutContainer>
      <Header />

      {children}
    </PrivateLayoutContainer>
  )
}
