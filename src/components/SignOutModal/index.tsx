import { ActionConfirmModal } from '@/components/ActionConfirmModal'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

interface SignOutModalProps {
  isOpen: boolean
  handleToggleModal: (_open: boolean) => void
}

export function SignOutModal({ isOpen, handleToggleModal }: SignOutModalProps) {
  const [isLoading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)

    await signOut({
      callbackUrl: '/login',
    })
  }

  return (
    <ActionConfirmModal
      title="Sign Out"
      description="Are you sure you want to sign out? You will be required to sign in again the next time you access the application."
      confirmationText="Sign Out"
      isOpen={isOpen}
      isLoading={isLoading}
      handleToggleModal={handleToggleModal}
      handleConfirm={handleSignOut}
    />
  )
}
