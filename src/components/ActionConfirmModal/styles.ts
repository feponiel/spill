import { DialogClose } from '@radix-ui/react-dialog'
import styled, { css } from 'styled-components'

export const ModalFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space[2]};

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.25rem;
      margin-top: ${theme.space[4]};
      font-size: ${theme.fontSizes.sm};
      font-weight: ${theme.fontWeights.bold};
      border-radius: ${theme.radius.md};
      cursor: pointer;
      transition: background-color 0.1s;
      flex: 1;
    }

    @media (max-width: 1024px) {
      textarea {
        height: 7rem;
      }
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
