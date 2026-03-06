import {
  SearchResultUserLink,
  StyledSearchResultUser,
  UserInfo,
} from './styles'
import { Avatar } from '@/components/Avatar'

interface SearchResultUserProps {
  name: string
  synthesis: string
  avatar_url: string
  profile_url: string
  handleClick: () => void
}

export function SearchResultUser({
  name,
  synthesis,
  avatar_url,
  profile_url,
  handleClick,
}: SearchResultUserProps) {
  return (
    <StyledSearchResultUser>
      <SearchResultUserLink href={profile_url} onClick={handleClick}>
        <Avatar username={name} url={avatar_url} hasBorder={false} />

        <UserInfo>
          <strong>{name}</strong>
          <span>{synthesis}</span>
        </UserInfo>
      </SearchResultUserLink>
    </StyledSearchResultUser>
  )
}
