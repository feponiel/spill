import { ActionConfirmModal } from "@/components/ActionConfirmModal"
import { signOut } from "next-auth/react"

interface SignOutModalProps {
  isOpen: boolean
  handleToggleModal: (open: boolean) => void
}

export function SignOutModal({ isOpen, handleToggleModal }: SignOutModalProps) {
  function handleSignOut() {
    signOut({
      callbackUrl: "/login"
    })
  }

  return (
    <ActionConfirmModal
      title="Sign Out"
      description="Are you sure you want to sign out? You will be required to sign in again the next time you access the application."
      confirmationText="Sign Out"
      isOpen={ isOpen }
      handleToggleModal={ handleToggleModal }
      handleConfirm={ handleSignOut }
    />
  )
}
