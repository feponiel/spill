import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { DropdownContent } from './styles'
import { ReactElement, ReactNode } from 'react'

interface DropdownMenuProps {
  trigger: ReactElement
  isOpen: boolean
  onToggleOpen: (_open: boolean) => void
  children?: ReactNode
  className?: string
}

export { DropdownSubContent } from './styles'

export function DropdownMenu({
  trigger,
  isOpen,
  onToggleOpen,
  children,
  className,
}: DropdownMenuProps) {
  return (
    <Dropdown.Root open={isOpen} onOpenChange={onToggleOpen}>
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>

      <Dropdown.Portal>
        <DropdownContent className={className}>{children}</DropdownContent>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}
