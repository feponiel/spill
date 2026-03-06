import styled, { css } from "styled-components";

export const StyledComment = styled.li`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space[4]};

    > img {
      width: 3rem;
      height: 3rem;
    }

    a {
      text-decoration: none;
    }
  `}
`

export const CommentWrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;

    footer {
      margin-top: ${theme.space[4]};
    }
  `}
`

export const CommentContentAndInfo = styled.div`
  ${({ theme }) => css`
    padding: ${theme.space[4]};
    background: ${theme.colors.shade700};
    border-radius: ${theme.radius.sm};
    border-left: 1px solid ${theme.colors.accentColor};

    header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
  `}
`

export const CommentContent = styled.p`
  ${({ theme }) => css`
    margin-top: ${theme.space[4]};
    line-height: ${theme.lineHeights.base};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.shade300};
  `}
`

export const CommentAuthorAndTime = styled.div`
  ${({ theme }) => css`
    strong {
      display: block;
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade300};
    }

    span {
      display: block;
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colors.shade400};
    }

    time {
      display: flex;
      align-items: center;
      gap: ${theme.space[1]};
      margin-top: ${theme.space[1]};
      font-size: ${theme.fontSizes.xxs};
      color: ${theme.colors.shade400};

      svg {
        font-size: ${theme.fontSizes.sm};
      }
    }
  `}
`

export const CommentOptionsMenuButton = styled.button`
  ${({ theme }) => css`
    border: none;
    background: none;
    color: ${theme.colors.shade100};
    cursor: pointer;
    transition: .2s;

    &:hover {
      color: ${theme.colors.accentColor};
    }

    svg {
      font-size: ${theme.fontSizes["2xl"]};
    }
  `}
`

export const EditionWarn = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[1]};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.shade400};

    svg {
      font-size: ${theme.fontSizes.md};
    }
  `}
`

interface LikeButtonProps {
  $isLiked: boolean
}

export const LikeButton = styled.button<LikeButtonProps>`
  ${({ theme, $isLiked }) => css`
    display: flex;
    align-items: center;
    line-height: 0;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.shade400};
    background: none;
    border: none;
    gap: ${theme.space[1]};
    transition: .2s;
    cursor: pointer;

    svg {
      font-size: ${theme.fontSizes.lg};
    }

    span {
      display: flex;
      align-items: center;
      
      strong {
        color: ${theme.colors.shade400};
        font-weight: ${theme.fontWeights.regular};
      }

      strong::before {
        content: "•";
        margin: 0 ${theme.space[1]};
      }
    }

    &:hover {
      color: ${theme.colors.shade300};
    }

    ${ $isLiked && css`
      color: ${theme.colors.accentColorDark};

      &:hover {
        color: ${theme.colors.accentColorDark};
      }
    `}
  `}
`
