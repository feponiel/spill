import { DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";
import styled, { css } from "styled-components";

export const StyledProfileCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.shade800};
    border-radius: ${theme.radius.md};
    overflow: hidden;

    &.loading {
      flex-direction: row;
      justify-content: center;
      padding: ${theme.space[4]} 0;
    }

    header {
      width: 100%;
    }

    footer {
      display: flex;
      justify-content: space-between;
      margin-top: ${theme.space[6]};
      padding: ${theme.space[4]};
      border-top: 1px solid ${theme.colors.shade600};
    }
  `}
`

export const Banner = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: auto;
    aspect-ratio: 16/5;
    background-color: ${theme.colors.shade300};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
`

export const ProfileDisplay = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: calc(0px - ${theme.space[6]} - 6px);
    padding: 0 ${theme.space[4]};
  `}
`

export const ProfileSummary = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${theme.space[4]};
  `}
`

export const ProfilePresentation = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;

  ${({ theme }) => css`
    strong {
      line-height: ${theme.lineHeights.base};
      color: ${theme.colors.shade100};
    }

    span {
      line-height: ${theme.lineHeights.base};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade400};
    }
  `}
`

export const EditProfileButton = styled(DialogTrigger)`
  ${({ theme }) => css`
    line-height: 0;
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.accentColor};
    background: none;
    border: none;
    transition: .2s;
    cursor: pointer;

    &:hover {
      color: ${theme.colors.accentColorDark};
    }
  `}
`

export const SettingsMenuButton = styled.button`
  ${({ theme }) => css`
    line-height: 0;
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.shade400};
    background: none;
    border: none;
    transition: .2s;
    cursor: pointer;

    &:hover {
      color: ${theme.colors.accentColor};
    }
  `}
`

export const SignOutButton = styled(DialogTrigger)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[1]};
    line-height: 0;
    font-size: ${theme.fontSizes.sm};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.shade400};
    background: none;
    border: none;
    transition: .2s;
    cursor: pointer;

    &:hover {
      color: ${theme.colors.red500};
    }

    svg {
      font-size: ${theme.fontSizes.md};
    }
  `}
`
