import styled, { css } from "styled-components";

export const StyledPostsContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;

    &.loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rem 0;
    }

    > header {
      margin-bottom: ${theme.space[8]};
      padding-bottom: ${theme.space[4]};
      border-bottom: 1px solid ${theme.colors.accentColor};
    }

    @media (max-width: 768px) {
      &.loading {
        padding: 17rem 0;
      }
    }
  `}
`

export const NoPostsMessage = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes["xl"]};
    color: ${theme.colors.shade400};
  `}
`

export const CreatePostButton = styled.button`
  ${({ theme }) => css`
    position: fixed;
    right: calc((100vw - ${theme.defaults.containerWidth} - ${theme.defaults.scrollBarWidth} + ${theme.defaults.containerGap}) / 2);
    bottom: 5%;
    padding: ${theme.space[4]};
    line-height: 0;
    color: ${theme.colors.white};
    background: ${theme.colors.accentColor};
    border: none;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    transition: .2s;

    &:hover {
      background: ${theme.colors.accentColorDark};
    }

    svg {
      font-size: ${theme.fontSizes["2xl"]};
    }

    @media (max-width: 1024px) {
      width: 100px;
      height: 100px;
      padding: 0;
      right: 0;
      left: calc((100vw - ${theme.space[4]} - 100px));
    }

    @media (max-width: 530px) {
      width: 75px;
      height: 75px;
      left: calc((100vw - ${theme.space[4]} - 75px));
    }

    @media (max-width: 380px) {
      width: 64px;
      height: 64px;
      left: calc((100vw - ${theme.space[4]} - 64px));
    }
  `}
`