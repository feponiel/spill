import { StyledHeaderMenu } from './styles'
import { ReactElement } from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import {
  GearSixIcon,
  MoonIcon,
  PencilIcon,
  SignOutIcon,
  SunIcon,
  UserCircleIcon,
  UserMinusIcon,
} from '@phosphor-icons/react'
import { useTheme } from '@/hooks/useTheme'
import { DropdownSubContent } from '@/components/DropdownMenu'

interface HeaderMenuProps {
  trigger: ReactElement
  isOpen: boolean
  handleToggleMenu: (_open: boolean) => void
  handleChooseViewProfileOption: () => void
  handleChooseEditProfileOption: () => void
  handleChooseSwitchThemeOption: () => void
  handleChooseDeleteAccountOption: () => void
  handleChooseSignOutOption: () => void
}

export function HeaderMenu({
  trigger,
  isOpen,
  handleToggleMenu,
  handleChooseViewProfileOption,
  handleChooseEditProfileOption,
  handleChooseSwitchThemeOption,
  handleChooseDeleteAccountOption,
  handleChooseSignOutOption,
}: HeaderMenuProps) {
  const { theme } = useTheme()

  return (
    <StyledHeaderMenu
      trigger={trigger}
      isOpen={isOpen}
      onToggleOpen={handleToggleMenu}
    >
      <Dropdown.Item onClick={handleChooseViewProfileOption}>
        <UserCircleIcon />
        Your profile
      </Dropdown.Item>

      <Dropdown.Item onClick={handleChooseEditProfileOption}>
        <PencilIcon />
        Edit profile
      </Dropdown.Item>

      <Dropdown.Sub>
        <Dropdown.SubTrigger>
          <GearSixIcon />
          Settings
        </Dropdown.SubTrigger>
        <Dropdown.Portal>
          <DropdownSubContent
            className="subcontent"
            sideOffset={2}
            alignOffset={-5}
          >
            <Dropdown.Item onClick={handleChooseSwitchThemeOption}>
              {theme == 'light' ? (
                <>
                  <MoonIcon /> Switch Theme to Dark
                </>
              ) : (
                <>
                  <SunIcon /> Switch Theme to Light
                </>
              )}
            </Dropdown.Item>

            <Dropdown.Item onClick={handleChooseDeleteAccountOption}>
              <UserMinusIcon />
              Delete Account
            </Dropdown.Item>
          </DropdownSubContent>
        </Dropdown.Portal>
      </Dropdown.Sub>

      <Dropdown.Item onClick={handleChooseSignOutOption}>
        <SignOutIcon />
        Sign Out
      </Dropdown.Item>
    </StyledHeaderMenu>
  )
}
