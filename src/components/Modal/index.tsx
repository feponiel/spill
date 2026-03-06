import { XIcon } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogClose, DialogContent, DialogOverlay } from './styles'
import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onToggleOpen: (_open: boolean) => void
  children?: ReactNode
}

export function Modal({ isOpen, onToggleOpen, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggleOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <header>
            <DialogClose>
              <XIcon />
            </DialogClose>
          </header>

          {children}
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
