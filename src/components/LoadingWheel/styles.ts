import styled, { css, keyframes } from 'styled-components'
import { LoadingWheelProps } from '.'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const wheelSizes = {
  sm: '1rem',
  md: '2rem',
  lg: '3rem',
}

export const StyledLoadingWheel = styled.div<LoadingWheelProps>`
  ${({ theme, size, color }) => css`
    width: ${wheelSizes[size!]};
    height: ${wheelSizes[size!]};

    border-radius: ${theme.radius.full};

    ${color == 'default' &&
    css`
      border: 3px solid ${theme.colors.shade400};
      border-top: 3px solid ${theme.colors.accentColor};
    `}

    ${color == 'white' &&
    css`
      border: 3px solid ${theme.colors.shade400};
      border-top: 3px solid ${theme.colors.white};
    `}

    animation: ${spin} 0.8s linear infinite;
  `}
`
