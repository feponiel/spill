import styled, { css } from 'styled-components'

export const StyledSideBar = styled.aside`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    position: sticky;
    top: calc(${theme.space[8]} + ${theme.defaults.headerHeight});
    left: 0;

    @media (max-width: 1024px) {
      display: none;
    }
  `}
`
