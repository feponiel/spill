import { DialogClose } from '@radix-ui/react-dialog'
import styled, { css } from 'styled-components'

export const ModalFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space[2]};

    button {
      margin-top: ${theme.space[4]};
      padding: ${theme.space[4]} ${theme.space[6]};
      font-size: ${theme.fontSizes.sm};
      font-weight: bold;
      border-radius: ${theme.radius.md};
      cursor: pointer;
      transition: background-color 0.1s;
      flex: 1;
    }
  `}
`

export const CancelButton = styled(DialogClose)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    background: ${theme.colors.shade400};
    border: 1px solid ${theme.colors.shade400};

    &:hover {
      background: ${theme.colors.shade300};
    }
  `}
`

export const ConfirmButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.red500};
    background: transparent;
    border: 1px solid ${theme.colors.red500};

    &:hover {
      color: ${theme.colors.white};
      background: ${theme.colors.red500};
    }
  `}
`

export const ModalDescription = styled.p`
  ${({ theme }) => css`
    max-width: 450px;
    font-size: ${theme.fontSizes.md};

    @media (max-width: 1024px) {
      max-width: 100%;
    }
  `}
`
