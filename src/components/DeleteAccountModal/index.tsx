import { ActionConfirmModal } from '@/components/ActionConfirmModal'
import { api } from '@/lib/axios'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

interface DeleteAccountModalProps {
  isOpen: boolean
  handleToggleModal: (_open: boolean) => void
}

export function DeleteAccountModal({
  isOpen,
  handleToggleModal,
}: DeleteAccountModalProps) {
  const [isLoading, setLoading] = useState(false)

  async function handleDeleteAccount() {
    setLoading(true)

    await api.delete('/me')

    await signOut({
      callbackUrl: '/login',
    })
  }

  return (
    <ActionConfirmModal
      title="Delete Account"
      description="Are you sure you want to delete your account? This action is totally irreversible and you will not be able to undo it."
      confirmationText="Delete"
      isOpen={isOpen}
      isLoading={isLoading}
      handleToggleModal={handleToggleModal}
      handleConfirm={handleDeleteAccount}
    />
  )
}
