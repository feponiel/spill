import styled, { css } from "styled-components";
import * as Tooltip from "@radix-ui/react-tooltip";

export const StyledFormField = styled.label`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[1]};

    > span {
      display: flex;
      gap: ${theme.space[1]};
    }

    > input,
    > textarea {
      font-size: ${theme.fontSizes.sm};
      color: ${theme.colors.shade100};
      padding: 7px;
      background: ${theme.colors.shade900};
      border: 1px solid ${theme.colors.shade700};
      border-radius: ${theme.radius.sm};
      
      &:focus-within {
        outline: 1px solid ${theme.colors.accentColor};
      }

      &:disabled {
        color: ${theme.colors.shade600};
        cursor: not-allowed;
      }
    }

    > input {
      height: 45px;
    }

    > textarea {
      height: 130px;
    }
  `}
`

export const TooltipContent = styled(Tooltip.Content)`
  ${({ theme }) => css`
    background: ${theme.colors.shade900};
    padding: ${theme.space[1]} ${theme.space[2]};
    text-align: center;
    font-size: ${theme.fontSizes.sm};
    border: 1px solid ${theme.colors.shade700};
    border-radius: ${theme.radius.sm};
    z-index: 9999;

    .TooltipArrow {
      width: 9px;
      fill: ${theme.colors.shade900};
      stroke-width: 3;
    }
  `}
`

export const ValidationErrorMessage = styled.span`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space[1]};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.red500};
  `}
`