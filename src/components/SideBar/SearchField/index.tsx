import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { SearchFieldIcon, SearchFieldInput, SearchFieldWrapper, StyledSearchField } from "./styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SearchResult } from "./SearchResult";
import * as Collapsible from "@radix-ui/react-collapsible"
import { useDebounce } from "@/hooks/useDebounce";

export function SearchField() {
  const [query, setQuery] = useState("")
  const [isSearchResultOpen, setSearchResultOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"users" | "topics">("users")

  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 300)
  
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSearchResultOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <StyledSearchField ref={containerRef}>
      <SearchFieldWrapper>
        <SearchFieldInput id="search-field" onChange={ handleSearch } value={ query } onFocus={ () => setSearchResultOpen(true) } autoComplete="off" />
        <SearchFieldIcon htmlFor="search-field">
          <MagnifyingGlassIcon />
        </SearchFieldIcon>
      </SearchFieldWrapper>
      
      <Collapsible.Root open={ isSearchResultOpen }>
        <SearchResult query={ debouncedQuery } activeTab={ activeTab } onChangeTab={ setActiveTab } />
      </Collapsible.Root>
    </StyledSearchField>
  )
}
