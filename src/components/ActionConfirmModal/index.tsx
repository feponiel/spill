import { Title } from '@/styles/global'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  CancelButton,
  ConfirmButton,
  ModalDescription,
  ModalFooter,
} from './styles'
import { Modal } from '@/components/Modal'
import { LoadingWheel } from '../LoadingWheel'

interface ActionConfirmModalProps {
  title: string
  description: string
  confirmationText: string
  isOpen: boolean
  isLoading: boolean
  handleToggleModal: (_open: boolean) => void
  handleConfirm: () => void
}

export function ActionConfirmModal({
  title,
  description,
  confirmationText,
  isOpen,
  isLoading,
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
          {isLoading ? (
            <LoadingWheel size="sm" color="white" />
          ) : (
            <span>{confirmationText}</span>
          )}
        </ConfirmButton>
      </ModalFooter>
    </Modal>
  )
}
