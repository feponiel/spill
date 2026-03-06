import { Title } from '@/styles/global'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  CancelButton,
  ConfirmButton,
  ModalDescription,
  ModalFooter,
} from './styles'
import { Modal } from '@/components/Modal'

interface ActionConfirmModalProps {
  title: string
  description: string
  confirmationText: string
  isOpen: boolean
  handleToggleModal: (_open: boolean) => void
  handleConfirm: () => void
}

export function ActionConfirmModal({
  title,
  description,
  confirmationText,
  isOpen,
  handleToggleModal,
  handleConfirm,
}: ActionConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onToggleOpen={handleToggleModal}>
      <DialogTitle asChild>
        <Title $level={2} $size="sm">
          {title}
        </Title>
      </DialogTitle>

      <ModalDescription>{description}</ModalDescription>

      <ModalFooter>
        <CancelButton>Cancel</CancelButton>
        <ConfirmButton onClick={handleConfirm}>
          {confirmationText}
        </ConfirmButton>
      </ModalFooter>
    </Modal>
  )
}
