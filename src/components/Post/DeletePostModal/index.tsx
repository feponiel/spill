import { ActionConfirmModal } from '@/components/ActionConfirmModal'
import { api } from '@/lib/axios'

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
  async function handleConfirmDeletion() {
    await api.delete(`/posts/${postId}`)

    handleDeletePost()
  }

  return (
    <ActionConfirmModal
      title="Delete Post"
      description="Are you sure you want to delete this post? This action is totally irreversible and you will not be able to undo it."
      confirmationText="Delete"
      isOpen={isOpen}
      handleToggleModal={handleToggleModal}
      handleConfirm={handleConfirmDeletion}
    />
  )
}
