import Link from 'next/link'
import styled, { css } from 'styled-components'

export const StyledSearchResultTag = styled.li``

export const SearchResultTagLink = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.space[3]};
    padding: ${theme.space[3]} ${theme.space[2]};
    text-decoration: none;

    &:hover {
      background: ${theme.colors.shade700};
    }

    strong {
      display: block;
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade100};
    }

    span {
      display: block;
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.shade400};
    }

    @media (max-width: 530px) {
      padding: ${theme.space[5]} ${theme.space[2]};

      strong {
        font-size: ${theme.fontSizes.md};
      }

      span {
        font-size: ${theme.fontSizes.sm};
      }
    }
  `}
`
