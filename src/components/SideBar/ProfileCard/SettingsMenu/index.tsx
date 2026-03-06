import { DropdownMenu } from '@/components/DropdownMenu'
import { useTheme } from '@/hooks/useTheme'
import { MoonIcon, SunIcon, UserMinusIcon } from '@phosphor-icons/react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { ReactElement } from 'react'

interface SettingsMenuProps {
  trigger: ReactElement
  isOpen: boolean
  handleToggleMenu: (_open: boolean) => void
  handleChooseSwitchTheme: () => void
  handleChooseDeleteAccount: () => void
}

export function SettingsMenu({
  trigger,
  isOpen,
  handleToggleMenu,
  handleChooseSwitchTheme,
  handleChooseDeleteAccount,
}: SettingsMenuProps) {
  const { theme } = useTheme()

  return (
    <DropdownMenu
      trigger={trigger}
      isOpen={isOpen}
      onToggleOpen={handleToggleMenu}
    >
      <Dropdown.Item onClick={handleChooseSwitchTheme}>
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

      <Dropdown.Item onClick={handleChooseDeleteAccount}>
        <UserMinusIcon />
        Delete Account
      </Dropdown.Item>
    </DropdownMenu>
  )
}
