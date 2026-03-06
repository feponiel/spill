'use client'

import { Logo } from '../Logo'
import {
  HeaderAvatar,
  HeaderSearchField,
  LogoContainer,
  StyledHeader,
} from './styles'
import { HeaderMenu } from './HeaderMenu'
import { useState } from 'react'
import { redirect } from 'next/navigation'
import { EditProfileModal } from '../EditProfileModal'
import { SignOutModal } from '../SignOutModal'
import { useAuthUserStore } from '@/store/useAuthUserStore'
import { useTheme } from '@/hooks/useTheme'
import { DeleteAccountModal } from '../DeleteAccountModal'

export function Header() {
  const { user, isLoading } = useAuthUserStore()
  const { toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false)

  return (
    <StyledHeader>
      <LogoContainer href="/">
        <Logo size="sm" />
      </LogoContainer>

      <HeaderSearchField />

      {isLoading || !user ? (
        <HeaderAvatar />
      ) : (
        <>
          <HeaderMenu
            trigger={
              <HeaderAvatar username={user.name} url={user.avatar_url} />
            }
            isOpen={isMenuOpen}
            handleToggleMenu={setIsMenuOpen}
            handleChooseViewProfileOption={() => {
              setIsMenuOpen(false)
              redirect(`/user/${user.id}`)
            }}
            handleChooseEditProfileOption={() => setEditProfileModalOpen(true)}
            handleChooseSwitchThemeOption={() => toggleTheme()}
            handleChooseDeleteAccountOption={() =>
              setDeleteAccountModalOpen(true)
            }
            handleChooseSignOutOption={() => setSignOutModalOpen(true)}
          />

          <EditProfileModal
            user={user}
            isOpen={isEditProfileModalOpen}
            handleToggleModal={setEditProfileModalOpen}
          />
          <DeleteAccountModal
            isOpen={isDeleteAccountModalOpen}
            handleToggleModal={setDeleteAccountModalOpen}
          />
          <SignOutModal
            isOpen={isSignOutModalOpen}
            handleToggleModal={setSignOutModalOpen}
          />
        </>
      )}
    </StyledHeader>
  )
}
