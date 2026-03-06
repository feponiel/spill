'use client'

import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    width: ${theme.defaults.containerWidth};
    display: grid;
    grid-template-columns: 260px 1fr;
    align-items: flex-start;
    gap: ${theme.defaults.containerGap};
    margin: calc(${theme.space[8]} + ${theme.defaults.headerHeight}) auto;
    padding: 0 ${theme.space[4]};

    @media (max-width: 1024px) {
      width: 100%;
      grid-template-columns: 1fr;
      margin: calc(${theme.space[4]} + 100px) auto;
    }

    @media (max-width: 530px) {
      margin: calc(${theme.space[4]} + 80px) auto;
    }

    @media (max-width: 380px) {
      margin: calc(${theme.space[4]} + 65px) auto;
    }
  `}
`
