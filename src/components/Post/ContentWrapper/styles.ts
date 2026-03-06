import Link from 'next/link'
import styled, { css } from 'styled-components'

export const PostImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 1000px;
`

export const PostLink = styled.a`
  ${({ theme }) => css`
    text-decoration: none;
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.accentColor};
    transition: 0.2s;

    &:hover {
      color: ${theme.colors.accentColorDark};
    }
  `}
`

export const PostCode = styled.code`
  ${({ theme }) => css`
    background: ${theme.colors.shade600};
    padding: ${theme.space[1]} ${theme.space[2]};
    border-radius: ${theme.radius.sm};
    overflow-x: scroll;
  `}
`

export const PostPre = styled.pre`
  ${({ theme }) => css`
    code {
      background: ${theme.colors.shade600};
    }
  `}
`

export const PostUL = styled.ul`
  ${({ theme }) => css`
    list-style-position: inside;

    li::marker {
      color: ${theme.colors.accentColor};
    }
  `}
`

export const PostOL = styled.ol`
  ${({ theme }) => css`
    list-style-position: inside;

    li::marker {
      color: ${theme.colors.accentColor};
    }
  `}
`

export const PostHR = styled.hr`
  ${({ theme }) => css`
    border: none;
    height: 1px;
    background: ${theme.colors.shade600};
  `}
`

export const PostH1 = styled.h1`
  ${({ theme }) => css`
    font-size: 1.4rem;
    line-height: ${theme.lineHeights.base};
  `}
`

export const PostH2 = styled.h2`
  ${({ theme }) => css`
    font-size: 1.25rem;
    line-height: ${theme.lineHeights.base};
  `}
`

export const PostH3 = styled.h3`
  ${({ theme }) => css`
    font-size: 1.05rem;
    line-height: ${theme.lineHeights.base};
  `}
`

export const PostH4 = styled.h4`
  ${({ theme }) => css`
    font-size: 0.9rem;
    line-height: ${theme.lineHeights.base};
  `}
`

export const PostH5 = styled.h5`
  ${({ theme }) => css`
    font-size: 0.75rem;
    line-height: ${theme.lineHeights.base};
  `}
`

export const PostH6 = styled.h6`
  ${({ theme }) => css`
    font-size: 0.6rem;
    line-height: ${theme.lineHeights.base};
  `}
`

export const PostBlockQuote = styled.blockquote`
  ${({ theme }) => css`
    margin: ${theme.space[2]} 0;
    padding: ${theme.space[1]} ${theme.space[3]};
    border-radius: ${theme.radius.sm};
    line-height: 1;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      width: 3px;
      height: 100%;
      background: ${theme.colors.shade600};
    }
  `}
`

export const Tag = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.accentColor};
    text-decoration: none;
    font-weight: ${theme.fontWeights.bold};
  `}
`
