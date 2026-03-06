"use client"

import styled, { css } from "styled-components";
import { SearchField } from "../SearchField";
import { Avatar } from "../Avatar";

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

    @media (max-width: 1024px) {
      justify-content: space-between;
      gap: ${theme.space[4]};
      height: 100px;
      padding: ${theme.space[4]};
      border-bottom: 2px solid ${theme.colors.shade700};
    }

    @media (max-width: 530px) {
      height: 80px;

      > a > img {
        height: 2.25rem;
      }
    }

    @media (max-width: 380px) {
      height: 65px;
    }
  `}
`

export const LogoContainer = styled.a`
  line-height: 0;
  text-decoration: none;
`

export const HeaderSearchField = styled(SearchField)`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
  }
`

export const HeaderAvatar = styled(Avatar)`
  ${({ theme }) => css`
    display: none;

    @media (max-width: 1024px) {
      display: block;
      width: 3rem;
      height: 3rem;
    }
  `}
`
