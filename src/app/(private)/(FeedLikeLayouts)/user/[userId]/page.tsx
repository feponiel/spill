import { Metadata } from 'next'
import { UserShowcase } from './UserShowcase'

export const metadata: Metadata = {
  title: 'Feed',
}

export default async function UserProfile({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  return <UserShowcase userId={userId} />
}
