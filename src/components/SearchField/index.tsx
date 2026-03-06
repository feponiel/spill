import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { SearchFieldIcon, SearchFieldInput, SearchFieldWrapper, SearchResultFloating, StyledSearchField } from "./styles";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SearchResult } from "./SearchResult";
import * as Collapsible from "@radix-ui/react-collapsible"
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFieldProps {
  className?: string
}

export function SearchField({ className }: SearchFieldProps) {
  const [query, setQuery] = useState("")
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"users" | "topics">("users")

  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 300)
  
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  function handleClickResult() {
    setIsSearchResultOpen(false)
    setQuery("")
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearchResultOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <StyledSearchField $isOpen={ isSearchResultOpen } className={ className } ref={containerRef}>
      <SearchFieldWrapper>
        <SearchFieldInput id="search-field" onChange={ handleSearch } placeholder="Search" value={ query } onFocus={ () => setIsSearchResultOpen(true) } autoComplete="off" />
        <SearchFieldIcon htmlFor="search-field">
          <MagnifyingGlassIcon />
        </SearchFieldIcon>
      </SearchFieldWrapper>
      
      <SearchResultFloating>
        <Collapsible.Root open={ isSearchResultOpen }>
          <SearchResult query={ debouncedQuery } activeTab={ activeTab } onChangeTab={ setActiveTab } onClickResult={ handleClickResult } />
        </Collapsible.Root>
      </SearchResultFloating>
    </StyledSearchField>
  )
}
