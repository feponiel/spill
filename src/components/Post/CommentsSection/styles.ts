import { CollapsibleContent } from "@radix-ui/react-collapsible";
import styled, { css } from "styled-components";

export const StyledCommentsSection = styled(CollapsibleContent)`
  overflow: hidden;

  &[data-state="open"] {
    animation: slideDown 300ms ease-out;
  }
  &[data-state="closed"] {
    animation: slideUp 300ms ease-out;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-collapsible-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-collapsible-content-height);
    }
    to {
      height: 0;
    }
  }
`

export const CommentsSectionWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: ${theme.space[7]};
  `}
`

export const CommentArea = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    gap: ${theme.space[4]};

    label {
      width: 100%;
    }

    > img {
      width: 3rem;
      height: 3rem;
    }
  `}
`

export const CommentForm = styled.form`
  ${({ theme }) => css`
    width: 100%;

    button {
      display: none;
    }

    &:focus-within button {
      display: flex;
    }

    textarea {
      height: 6rem;
      padding: ${theme.space[4]};
      line-height: ${theme.lineHeights.short};
      font-size: ${theme.fontSizes.sm};
      border: none;
      resize: none;
    }

    textarea:focus {
      outline: none;
      border: 1px solid ${theme.colors.accentColor};
    }
  `}
`

export const SubmitCommentButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${theme.space[4]};
    width: 5rem;
    height: 2.5rem;
    font-weight: bold;
    color: ${theme.colors.white};
    background: ${theme.colors.accentColor};
    border: none;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    transition: .2s;

    &:disabled {
      opacity: .7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${theme.colors.accentColorDark};
    }
  `}
`

export const CommentList = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[7]};

    &.with-comments {
      margin-top: ${theme.space[10]};
    }
  `}
`

export const CommentsWrapper = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[6]};
    list-style: none;
  `}
`

export const ViewMoreButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex: 1;
    gap: ${theme.space[1]};
    margin-left: calc(3rem + ${theme.space[4]});
    line-height: 0;
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.accentColorDark};
    background: none;
    border: none;
    cursor: pointer;
    transition: .2s;

    svg {
      font-size: ${theme.fontSizes.sm};
    }

    &:hover {
      color: ${theme.name == 'light' ? theme.colors.accentColor : theme.colors.accentColorLight};
    }
  `}
`
