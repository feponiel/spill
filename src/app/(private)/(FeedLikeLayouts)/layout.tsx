import { Sidebar } from '@/components/SideBar'
import { Container } from './styles'
import { ReactNode } from 'react'

export default function FeedLikeLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <Container>
      <Sidebar />

      {children}
    </Container>
  )
}
