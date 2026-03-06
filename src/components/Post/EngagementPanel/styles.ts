import styled, { css } from 'styled-components'

export const StyledEngagementPanel = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${theme.space[6]};
    border-top: 1px solid ${theme.colors.shade600};
    padding-top: ${theme.space[4]};
  `}
`

export const EngagementPanelDisplay = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space[1]};

    span {
      display: flex;
      gap: ${theme.space[1]};
      color: ${theme.colors.shade400};
      font-size: ${theme.fontSizes.sm};

      strong {
        font-weight: ${theme.fontWeights.bold};
      }
    }

    span#engagement-panel__display__separator {
      color: ${theme.colors.shade300};
    }
  `}
`

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.shade300};
`
