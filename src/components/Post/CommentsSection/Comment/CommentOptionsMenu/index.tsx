import { DropdownMenu } from '@/components/DropdownMenu'
import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { ReactElement } from 'react'

interface CommentOptionsMenuProps {
  trigger: ReactElement
  isOpen: boolean
  amITheAuthor: boolean
  handleToggleMenu: (_open: boolean) => void
  handleChooseEditOption: () => void
  handleChooseDeleteOption: () => void
}

export function CommentOptionsMenu({
  trigger,
  isOpen,
  amITheAuthor,
  handleToggleMenu,
  handleChooseEditOption,
  handleChooseDeleteOption,
}: CommentOptionsMenuProps) {
  return (
    amITheAuthor && (
      <DropdownMenu
        trigger={trigger}
        isOpen={isOpen}
        onToggleOpen={handleToggleMenu}
      >
        <Dropdown.Item onClick={handleChooseEditOption}>
          <PencilIcon />
          Edit Comment
        </Dropdown.Item>

        <Dropdown.Item onClick={handleChooseDeleteOption}>
          <TrashIcon />
          Delete Comment
        </Dropdown.Item>
      </DropdownMenu>
    )
  )
}
