import { ActionConfirmModal } from '@/components/ActionConfirmModal'
import { api } from '@/lib/axios'
import { useState } from 'react'

interface DeletePostModalProps {
  isOpen: boolean
  postId: string
  handleToggleModal: (_open: boolean) => void
  handleDeletePost: () => void
}

export function DeletePostModal({
  isOpen,
  postId,
  handleToggleModal,
  handleDeletePost,
}: DeletePostModalProps) {
  const [isLoading, setLoading] = useState(false)

  async function handleConfirmDeletion() {
    setLoading(true)
    await api.delete(`/posts/${postId}`)
    setLoading(false)

    handleDeletePost()
  }

  return (
    <ActionConfirmModal
      title="Delete Post"
      description="Are you sure you want to delete this post? This action is totally irreversible and you will not be able to undo it."
      confirmationText="Delete"
      isOpen={isOpen}
      isLoading={isLoading}
      handleToggleModal={handleToggleModal}
      handleConfirm={handleConfirmDeletion}
    />
  )
}
