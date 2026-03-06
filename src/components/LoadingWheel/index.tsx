import { StyledLoadingWheel } from './styles'

export interface LoadingWheelProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'white'
}

export function LoadingWheel({
  size = 'sm',
  color = 'default',
}: LoadingWheelProps) {
  return <StyledLoadingWheel size={size} color={color}></StyledLoadingWheel>
}
