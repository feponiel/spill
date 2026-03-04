import styled, { css } from "styled-components";

export const StyledSearchField = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
  `}
`

export const SearchFieldWrapper = styled.form`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.shade600};
    border-radius: ${theme.radius.full};

    &:focus-within {
      border: 1px solid ${theme.colors.accentColor};
    }
  `}
`

export const SearchFieldInput = styled.input`
  ${({ theme }) => css`
    flex: 1;
    height: 45px;
    padding: ${theme.space[4]};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.shade300};
    background: ${theme.colors.shade800};
    border: none;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    outline: none;
  `}
`

export const SearchFieldIcon = styled.label`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    line-height: 0;
    color: ${theme.colors.shade100};
    background: ${theme.colors.shade800};
    border: none;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    outline: none;
    transition: .2s;

    svg {
      font-size: ${theme.fontSizes.md};
    }
  `}
`
