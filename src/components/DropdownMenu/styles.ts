import { DropdownMenuContent, DropdownMenuSubContent } from "@radix-ui/react-dropdown-menu"
import styled, { css } from "styled-components"

const dropdownStyles = css`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 200px;
    background: ${theme.colors.shade900};
    border: 1px solid ${theme.colors.shade700};
    border-radius: ${theme.radius.md};
    overflow: hidden;
    z-index: 3;

    & > * {
      display: flex;
      align-items: center;
      gap: ${theme.space[2]};
      padding: ${theme.space[3]} ${theme.space[2]};
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade100};
      cursor: pointer;
      outline: none;

      &:hover,
      &:focus-within {
        color: ${theme.colors.white};
        background: ${theme.colors.accentColor};
      }

      svg {
        font-size: ${theme.fontSizes.xl};
      }
    }

    @media (max-width: 1024px) {
      width: 280px;
      
      & > * {
        padding: ${theme.space[4]} ${theme.space[3]};
      }
    }

    @media (max-width: 530px) {
      width: 180px;

      & > * {
        padding: ${theme.space[6]} ${theme.space[3]};
      }
    }

    @media (max-width: 360px) {
      width: 160px;

      & > * {
        padding: ${theme.space[6]} ${theme.space[3]};
      }
    }
  `}
`

export const DropdownContent = styled(DropdownMenuContent)`
  ${dropdownStyles}
`

export const DropdownSubContent = styled(DropdownMenuSubContent)`
  ${dropdownStyles}
`