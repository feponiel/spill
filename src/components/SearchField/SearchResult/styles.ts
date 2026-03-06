import { CollapsibleContent } from "@radix-ui/react-collapsible"
import styled from "styled-components"
import { css } from "styled-components"

export const StyledSearchResult = styled(CollapsibleContent)`
  width: 100%;
  overflow: hidden;

  &[data-state="open"] {
    animation: slideDown 200ms ease-out;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-collapsible-content-height);
    }
  }
`

export const SearchResultContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    border: 1px solid ${theme.colors.shade600};
    border-radius: ${theme.radius.lg};
    background: ${theme.colors.shade800};
    overflow: hidden;

    @media (max-width: 530px) {
      border-radius: 0;
    }
  `}
`

export const SearchResultHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space[2]};
    padding: ${theme.space[4]} ${theme.space[2]} ${theme.space[3]};
    border-bottom: 1px solid ${theme.colors.shade600};

    button {
      padding: ${theme.space[2]} ${theme.space[3]};
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.accentColorDark};
      background: none;
      border: 1px solid ${theme.colors.accentColorDark};
      border-radius: ${theme.radius.lg};
      cursor: pointer;
      transition: .2s;

      &[data-state="unchecked"]:hover {
        color: ${theme.colors.accentColor};
        border-color: ${theme.colors.accentColor};
      }

      &[data-state="checked"] {
        color: ${theme.colors.white};
        background: ${theme.colors.accentColor};
        border-color: ${theme.colors.accentColor};
      }
    }

    @media (max-width: 530px) {
      button {
        font-size: ${theme.fontSizes.md};
      }
    }
  `}
`

export const SearchResultList = styled.div``

export const SearchResultsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: center;
  min-height: 50px;

  &.loading {
    flex-direction: row;
    align-items: center;
  }
`

export const NoResultsMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes["sm"]};
    color: ${theme.colors.shade400};
    padding: 0 ${theme.space[2]};
  `}
`
