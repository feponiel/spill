"use client"

import styled, { css } from "styled-components";

export const StyledHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${theme.defaults.headerHeight};
    position: fixed;
    background: ${theme.colors.shade800};
    z-index: 1;

    a {
      text-decoration: none;
    }
  `}
`
