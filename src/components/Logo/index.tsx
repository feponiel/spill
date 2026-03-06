import { StyledLogo } from './style'
import spillLogo from '@/../public/spill-logo.svg'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ size = 'md' }: LogoProps) {
  return <StyledLogo src={spillLogo.src} size={size} alt="Spill Logo" />
}
