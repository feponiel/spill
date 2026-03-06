'use client'

import styled, { css } from 'styled-components'

export const PrivateLayoutContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
  `}
`
