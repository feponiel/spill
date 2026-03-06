'use client'

import Link from "next/link";
import styled, { css } from "styled-components";

export const StyledLoginContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.space[4]};
    height: 100vh;

    p {
      text-align: center;
      font-size: ${theme.fontSizes["2xl"]};
    }
  `}
`

export const GithubAuthButton = styled.button`
  ${({ theme }) => css`
    height: 64px;
    background: linear-gradient(
      180deg,
      #141414 0%,
      #0f0f0f 50%,
      #0a0a0a 100%
    );
    border: 1px solid ${theme.colors.shade600};
    color: ${theme.name == "light" ? theme.colors.shade800 : theme.colors.shade300};
    font-weight: ${theme.fontWeights.bold};
    font-size: ${theme.fontSizes.lg};
    border-radius: ${theme.radius.md};
    margin-top: ${theme.space[4]};
    padding: 0 ${theme.space[6]};
    display: flex;
    align-items: center;
    gap: ${theme.space[5]};
    transition: .2s;
    cursor: pointer;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 12px rgba(0,0,0,0.6);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);

      background: linear-gradient(
        180deg,
        #1a1a1a 0%,
        #121212 50%,
        #0c0c0c 100%
      );

      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.05),
        0 6px 16px rgba(0,0,0,0.75);
    }

    @media (max-width: 1024px) {
      height: 5rem;
    }
  `}
`

export const ImportantLinksWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.space[6]};
    padding: ${theme.space[4]};
    border-top: 1px solid ${theme.colors.shade400};
  `}
`

export const ImportantLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.shade400};
    text-decoration: none;
    font-size: ${theme.fontSizes.sm};

    &:hover {
      color: ${theme.colors.shade300};
    }

    & + &::before {
      content: '|';
      padding: ${theme.space[2]};
      color: ${theme.colors.shade400};
      cursor: auto;
    }
  `}
`
