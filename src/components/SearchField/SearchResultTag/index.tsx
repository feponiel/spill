import { SearchResultTagLink, StyledSearchResultTag } from "./styles";

interface SearchResultTagProps {
  name: string
  posts_amount: number
  filter_url: string
  handleClick: () => void
}

export function SearchResultTag({ name, posts_amount, filter_url, handleClick }: SearchResultTagProps) {
  return (
    <StyledSearchResultTag>
      <SearchResultTagLink href={ filter_url } onClick={ handleClick }>
        <strong>#{ name }</strong>
        <span>{ posts_amount } posts related</span>
      </SearchResultTagLink>
    </StyledSearchResultTag>
  )
}
