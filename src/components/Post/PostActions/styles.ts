import styled, { css } from 'styled-components'

export const StyledPostActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space[4]};
    > * {
      display: flex;
      align-items: center;
      gap: ${theme.space[2]};
      padding: ${theme.space[2]} ${theme.space[3]};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade400};
      background: ${theme.name == 'light'
        ? theme.colors.shade900
        : theme.colors.shade600};
      border: 1px solid ${theme.colors.accentColor};
      border-radius: ${theme.radius.full};
      cursor: pointer;
      position: relative;
      transition: 0.2s;

      svg {
        font-size: ${theme.fontSizes.xl};
      }

      &:hover {
        color: ${theme.colors.accentColor};
      }
    }
  `}
`

interface LikeButtonProps {
  $isLiked: boolean
}

export const LikeButton = styled.button<LikeButtonProps>`
  ${({ theme, $isLiked }) => css`
    ${$isLiked &&
    css`
      color: ${theme.colors.white};
      background: ${theme.colors.accentColor};

      &:hover {
        color: ${theme.colors.white};
      }
    `}
  `}
`
