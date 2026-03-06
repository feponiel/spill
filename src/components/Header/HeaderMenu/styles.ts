import { DropdownMenu } from '@/components/DropdownMenu'
import styled from 'styled-components'

export const StyledHeaderMenu = styled(DropdownMenu)`
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`
