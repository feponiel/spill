"use client"

import { GearSixIcon, PencilIcon, SignOutIcon } from "@phosphor-icons/react";
import { Avatar } from "../../Avatar";
import { Banner, EditProfileButton, ProfileDisplay, ProfilePresentation, ProfileSummary, SettingsMenuButton, SignOutButton, StyledProfileCard } from "./styles";
import { useAuthUser } from "@/hooks/useAuthUser";
import { LoadingWheel } from "../../LoadingWheel";
import * as Dialog from "@radix-ui/react-dialog"
import { useEffect, useState } from "react";
import { EditProfileModal } from "./EditProfileModal";
import { SettingsMenu } from "./SettingsMenu";
import { DeleteAccountModal } from "./DeleteAccountModal";
import { SignOutModal } from "./SignOutModal";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

export function ProfileCard() {
  const { data: authUser, isLoading } = useAuthUser()
  const { toggleTheme } = useTheme()
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false)
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const [synthesis, setSynteshis] = useState(authUser?.synthesis)
  const [bannerPicture, setBannerPicture] = useState(authUser?.banner_url)

  useEffect(() => {
    if (authUser) {
      setSynteshis(authUser.synthesis)
      setBannerPicture(authUser.banner_url)
    }
  }, [authUser])

  if (isLoading || !authUser) {
    return (
      <StyledProfileCard className="loading">
        <LoadingWheel size="md" />
      </StyledProfileCard>
    )
  }

  return (
    <StyledProfileCard>
      <header>
        <Banner style={ { backgroundImage: `url(${bannerPicture})` } }></Banner>
      </header>

      <ProfileDisplay>
        <Link href={ `/user/${authUser.id}` }>
          <Avatar username={ authUser.name } url={ authUser.avatar_url ?? undefined } />
        </Link>
        
        <ProfileSummary>
          <ProfilePresentation href={ `/user/${authUser.id}` }>
            <strong>{ authUser.name }</strong>
            <span>{ synthesis }</span>
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

      <EditProfileModal userInfo={ authUser } isOpen={ isEditProfileModalOpen } handleToggleModal={ setEditProfileModalOpen } setSynthesis={setSynteshis} setBannerPicture={setBannerPicture} />
      <SignOutModal isOpen={ isSignOutModalOpen } handleToggleModal={ setSignOutModalOpen } />
      <DeleteAccountModal isOpen={ isDeleteAccountModalOpen } handleToggleModal={ setDeleteAccountModalOpen } />
    </StyledProfileCard>
  )
}