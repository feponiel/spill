"use client"

import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 1000px;
    display: grid;
    grid-template-columns: 260px 1fr;
    align-items: flex-start;
    gap: ${theme.space[8]};
    margin: calc(${theme.space[8]} + ${theme.defaults.headerHeight}) auto;
    padding: 0 ${theme.space[4]};
  `}
`
