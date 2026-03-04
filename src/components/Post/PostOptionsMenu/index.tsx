import { DropdownMenu } from "@/components/DropdownMenu";
import { LinkSimpleIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";
import * as Dropdown from "@radix-ui/react-dropdown-menu"
import { ReactElement, useState } from "react";

interface PostOptionsMenuProps {
  trigger: ReactElement
  isOpen: boolean
  amITheAuthor: boolean
  isPostLinkCopied: boolean
  handleToggleMenu: (open: boolean) => void
  handleChooseEditOption: () => void
  handleChooseDeleteOption: () => void
  handleChooseCopyLinkOption: () => void
}

export function PostOptionsMenu({ trigger, isOpen, amITheAuthor, isPostLinkCopied, handleToggleMenu, handleChooseEditOption, handleChooseDeleteOption, handleChooseCopyLinkOption }: PostOptionsMenuProps) {

  return (
    <DropdownMenu trigger={ trigger } isOpen={ isOpen } onToggleOpen={ handleToggleMenu }>
      <Dropdown.Item onClick={ handleChooseCopyLinkOption }>
        <LinkSimpleIcon />
        { !isPostLinkCopied ? "Copy link" : "Copied!" }
      </Dropdown.Item>
      
      { amITheAuthor && (
        <>
          <Dropdown.Item onClick={ handleChooseEditOption }>
            <PencilIcon />
            Edit Post
          </Dropdown.Item>

          <Dropdown.Item onClick={ handleChooseDeleteOption }>
            <TrashIcon />
            Delete Post
          </Dropdown.Item>
        </>
      ) }
    </DropdownMenu>
  )
}
