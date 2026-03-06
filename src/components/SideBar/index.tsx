'use client'

import { ProfileCard } from './ProfileCard'
import { SearchField } from '../SearchField'
import { StyledSideBar } from './styles'

export function Sidebar() {
  return (
    <StyledSideBar>
      <ProfileCard />

      <SearchField />
    </StyledSideBar>
  )
}
