import * as RadioGroup from "@radix-ui/react-radio-group"
import { NoResultsMessage, SearchResultContainer, SearchResultHeader, SearchResultList, SearchResultsWrapper, StyledSearchResult } from "./styles"

export function SearchResult() {
  function handleViewMoreResults() {}
  
  return (
    <StyledSearchResult id="search-results">
      <SearchResultContainer>
        <RadioGroup.Root defaultValue="users">
          <SearchResultHeader>
            <RadioGroup.Item value="users" asChild>
              <button>Users</button>
            </RadioGroup.Item>

            <RadioGroup.Item value="topics" asChild>
              <button>Topics</button>
            </RadioGroup.Item>
          </SearchResultHeader>
        </RadioGroup.Root>

        <SearchResultList>
          <SearchResultsWrapper></SearchResultsWrapper>
        </SearchResultList>

        <NoResultsMessage>No results found :(</NoResultsMessage>
      </SearchResultContainer>
    </StyledSearchResult>
  )
}