import styled, { css } from "styled-components";

export const StyledPost = styled.article`
  ${({ theme }) => css`
    padding: ${theme.space[6]} ${theme.space[5]};
    background: ${theme.colors.shade800};
    border-radius: ${theme.radius.md};

    & + & {
      margin-top: ${theme.space[8]}
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  `}
`

export const InfoDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Info = styled.div`
  ${({ theme }) => css`
    strong {
      display: block;
      line-height: ${theme.lineHeights.base};
      color: ${theme.colors.shade100};
    }

    span {
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade400};
    }
  `}
`

export const PostDate = styled.time`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[1]};
    margin-top: ${theme.space[1]};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.shade400};
  `}
`

export const EditionWarn = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[1]};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.shade400};
    margin-bottom: ${theme.space[1]};
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.space[6]};
    line-height: ${theme.lineHeights.base};
    color: ${theme.colors.shade300};
    word-break: break-word;
    font-size: ${theme.fontSizes.sm};
  `}
`

export const PostOptionsMenuButton = styled.button`
  ${({ theme }) => css`
    border: none;
    background: none;
    color: ${theme.colors.shade100};
    cursor: pointer;
    transition: .2s;

    &:hover {
      color: ${theme.colors.accentColor};
    }
  `}
`
