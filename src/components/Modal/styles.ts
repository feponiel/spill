import * as Dialog from '@radix-ui/react-dialog'
import styled, { css } from 'styled-components'

export const DialogOverlay = styled(Dialog.Overlay)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`

export const DialogContent = styled(Dialog.Content)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    padding: ${theme.space[4]};
    background: ${theme.colors.shade800};
    border: 1px solid ${theme.colors.shade600};
    border-radius: ${theme.radius.md};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    header {
      display: flex;
      justify-content: end;
      width: 100%;
    }

    @media (max-width: 1024px) {
      width: 75%;
    }

    @media (max-width: 820px) {
      width: calc(100% - ${theme.space[8]});
    }
  `}
`

export const DialogClose = styled(Dialog.Close)`
  ${({ theme }) => css`
    padding: ${theme.space[1]};
    color: ${theme.colors.shade300};
    background: transparent;
    border: 1px solid ${theme.colors.shade300};
    border-radius: ${theme.radius.sm};
    line-height: 0;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: ${theme.colors.red500};
      border: 1px solid ${theme.colors.red500};
    }

    svg {
      font-size: ${theme.fontSizes.sm};
    }
  `}
`
