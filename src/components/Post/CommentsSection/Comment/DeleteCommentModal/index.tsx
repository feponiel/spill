import { ActionConfirmModal } from '@/components/ActionConfirmModal'
import { api } from '@/lib/axios'
import { useState } from 'react'

interface DeleteCommentModalProps {
  commentId: string
  isOpen: boolean
  handleToggleModal: (_open: boolean) => void
  handleDeleteComment: () => void
}

export function DeleteCommentModal({
  commentId,
  isOpen,
  handleToggleModal,
  handleDeleteComment,
}: DeleteCommentModalProps) {
  const [isLoading, setLoading] = useState(false)

  async function handleConfirmDeletion() {
    setLoading(true)
    await api.delete(`/comments/${commentId}`)
    setLoading(false)

    handleDeleteComment()
  }

  return (
    <ActionConfirmModal
      title="Delete Comment"
      description="Are you sure you want to delete this comment? This action is totally irreversible and you will not be able to undo it."
      confirmationText="Delete"
      isOpen={isOpen}
      isLoading={isLoading}
      handleToggleModal={handleToggleModal}
      handleConfirm={handleConfirmDeletion}
    />
  )
}
