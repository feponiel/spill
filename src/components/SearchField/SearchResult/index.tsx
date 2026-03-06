import { useEffect, useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import {
  NoResultsMessage,
  SearchResultContainer,
  SearchResultHeader,
  SearchResultList,
  SearchResultsWrapper,
  StyledSearchResult,
} from './styles'
import { SearchResultUser } from '../SearchResultUser'
import { SearchResultTag } from '../SearchResultTag'
import { LoadingWheel } from '@/components/LoadingWheel'

type SearchTab = 'users' | 'topics'

interface SearchResultProps {
  query: string
  activeTab: SearchTab
  onChangeTab: (_activeTab: SearchTab) => void
  onClickResult: () => void
}

export function SearchResult({
  query,
  activeTab,
  onChangeTab,
  onClickResult,
}: SearchResultProps) {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 1) {
      setResults([])
      return
    }

    async function fetchResults() {
      setIsLoading(true)
      try {
        const endpoint =
          activeTab === 'users'
            ? `/api/search/users?q=${encodeURIComponent(query)}`
            : `/api/search/topics?q=${encodeURIComponent(query.replace('#', ''))}`

        const res = await fetch(endpoint)
        const data = await res.json()
        setResults(data ?? [])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, activeTab])

  const hasResults = results.length > 0

  return (
    <StyledSearchResult id="search-results">
      <SearchResultContainer>
        <RadioGroup.Root
          defaultValue={activeTab}
          onValueChange={(value) => onChangeTab(value as SearchTab)}
        >
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
          {isLoading ? (
            <SearchResultsWrapper className="loading">
              <LoadingWheel size="md" />
            </SearchResultsWrapper>
          ) : (
            <SearchResultsWrapper>
              {!isLoading &&
                activeTab === 'users' &&
                results.map((user) => (
                  <SearchResultUser
                    key={user.id}
                    name={user.name}
                    synthesis={user.synthesis}
                    avatar_url={user.avatar_url}
                    profile_url={`/user/${user.id}`}
                    handleClick={onClickResult}
                  />
                ))}

              {!isLoading &&
                activeTab === 'topics' &&
                results.map((topic) => (
                  <SearchResultTag
                    key={topic.id}
                    name={topic.name}
                    posts_amount={topic.references_count}
                    filter_url={`/?tag=${topic.name}`}
                    handleClick={onClickResult}
                  />
                ))}

              {!isLoading && !hasResults && (
                <NoResultsMessage>Nothing to see here :(</NoResultsMessage>
              )}
            </SearchResultsWrapper>
          )}
        </SearchResultList>
      </SearchResultContainer>
    </StyledSearchResult>
  )
}
