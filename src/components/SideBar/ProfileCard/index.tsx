"use client"

import { GearSixIcon, PencilIcon, SignOutIcon } from "@phosphor-icons/react";
import { Avatar } from "../../Avatar";
import { Banner, EditProfileButton, ProfileDisplay, ProfilePresentation, ProfileSummary, SettingsMenuButton, SignOutButton, StyledProfileCard } from "./styles";
import { LoadingWheel } from "../../LoadingWheel";
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react";
import { EditProfileModal } from "../../EditProfileModal";
import { SettingsMenu } from "./SettingsMenu";
import { DeleteAccountModal } from "../../DeleteAccountModal";
import { SignOutModal } from "../../SignOutModal";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { useAuthUserStore } from "@/store/useAuthUserStore";

export function ProfileCard() {
  const { user, isLoading } = useAuthUserStore()
  const { toggleTheme } = useTheme()
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false)

  if (isLoading || !user) {
    return (
      <StyledProfileCard className="loading">
        <LoadingWheel size="md" />
      </StyledProfileCard>
    )
  }

  return (
    <StyledProfileCard>
      <header>
        <Banner style={ { backgroundImage: `url(${user.banner_url})` } }></Banner>
      </header>

      <ProfileDisplay>
        <Link href={ `/user/${user.id}` }>
          <Avatar username={ user.name } url={ user.avatar_url ?? undefined } />
        </Link>
        
        <ProfileSummary>
          <ProfilePresentation href={ `/user/${user.id}` }>
            <strong>{ user.name }</strong>
            <span>{ user.synthesis }</span>
          </ProfilePresentation>

          <Dialog.Root open={ isEditProfileModalOpen } onOpenChange={ setEditProfileModalOpen }>
            <EditProfileButton title="Edit profile">
              <PencilIcon />
            </EditProfileButton>
          </Dialog.Root>
        </ProfileSummary>
      </ProfileDisplay>

      <footer>
        <Dialog.Root open={ isSignOutModalOpen } onOpenChange={ setSignOutModalOpen }>
          <SignOutButton>
            <SignOutIcon />
            Sign out
          </SignOutButton>
        </Dialog.Root>

        <SettingsMenu
          trigger={
            <SettingsMenuButton title="Settings">
              <GearSixIcon />
            </SettingsMenuButton>
          }
          isOpen={ isSettingsMenuOpen }
          handleToggleMenu={ setSettingsMenuOpen }
          handleChooseSwitchTheme={ () => toggleTheme() }
          handleChooseDeleteAccount={ () => setDeleteAccountModalOpen(true) }
        />
      </footer>

      <EditProfileModal user={ user } isOpen={ isEditProfileModalOpen } handleToggleModal={ setEditProfileModalOpen } />
      <SignOutModal isOpen={ isSignOutModalOpen } handleToggleModal={ setSignOutModalOpen } />
      <DeleteAccountModal isOpen={ isDeleteAccountModalOpen } handleToggleModal={ setDeleteAccountModalOpen } />
    </StyledProfileCard>
  )
}