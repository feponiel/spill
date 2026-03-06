import styled from 'styled-components'
import { LogoProps } from '.'

const logoSizes = {
  sm: '2rem',
  md: '3rem',
  lg: '4.75rem',
}

export const StyledLogo = styled.img<LogoProps>`
  width: auto;
  height: ${({ size }) => logoSizes[size!]};
`
