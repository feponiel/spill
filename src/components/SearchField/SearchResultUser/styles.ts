import Link from 'next/link'
import styled, { css } from 'styled-components'

export const StyledSearchResultUser = styled.li``

export const SearchResultUserLink = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    padding: ${theme.space[3]} ${theme.space[2]};
    text-decoration: none;
    transition: 0.2s;

    > img {
      width: 3rem;
      height: 3rem;
    }

    &:hover {
      background: ${theme.colors.shade700};
    }

    @media (max-width: 530px) {
      padding: ${theme.space[5]} ${theme.space[2]};

      > img {
        width: 4rem;
        height: 4rem;
      }
    }
  `}
`

export const UserInfo = styled.div`
  ${({ theme }) => css`
    strong {
      display: block;
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade100};
    }

    span {
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.shade400};
    }

    @media (max-width: 530px) {
      strong {
        font-size: ${theme.fontSizes.md};
      }

      span {
        font-size: ${theme.fontSizes.sm};
      }
    }
  `}
`
