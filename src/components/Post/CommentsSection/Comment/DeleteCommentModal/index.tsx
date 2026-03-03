import { ActionConfirmModal } from "@/components/ActionConfirmModal";
import { api } from "@/lib/axios";

interface DeleteCommentModalProps {
  commentId: string
  isOpen: boolean
  handleToggleModal: (open: boolean) => void
  handleDeleteComment: () => void
}

export function DeleteCommentModal({ commentId, isOpen, handleToggleModal, handleDeleteComment }: DeleteCommentModalProps) {
  async function handleConfirmDeletion() {
    await api.delete(`/comments/${commentId}`)

    handleDeleteComment()
  }

  return (
    <ActionConfirmModal
      title="Delete Comment"
      description="Are you sure you want to delete this comment? This action is totally irreversible and you will not be able to undo it."
      confirmationText="Delete"
      isOpen={ isOpen }
      handleToggleModal={ handleToggleModal }
      handleConfirm={ handleConfirmDeletion }
    />
  )
}
