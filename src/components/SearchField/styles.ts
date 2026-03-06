import styled, { css } from "styled-components";

interface StyledSearchFieldProps {
  $isOpen: boolean
}

export const StyledSearchField = styled.div<StyledSearchFieldProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 530px) {
    position: static;
  }
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

    @media (max-width: 1024px) {
      border: 2px solid ${theme.colors.shade600};
    }
  `}
`

export const SearchFieldInput = styled.input`
  ${({ theme }) => css`
    flex: 1;
    height: 45px;
    padding-left: ${theme.space[4]};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.shade300};
    background: ${theme.colors.shade800};
    border: none;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    outline: none;

    @media (max-width: 1024px) {
      height: 60px;
    }

    @media (max-width: 530px) {
      height: 45px;
    }

    @media (max-width: 380px) {
      height: 40px;
    }
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
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    outline: none;
    transition: .2s;

    svg {
      font-size: ${theme.fontSizes.md};
    }

    @media (max-width: 1024px) {
      width: 60px;
      height: 60px;
    }

    @media (max-width: 530px) {
      width: 45px;
      height: 45px;
    }

    @media (max-width: 380px) {
      width: 40px;
      height: 40px;
    }
  `}
`

export const SearchResultFloating = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: calc(100% + ${theme.space[2]});
    left: 0;
    right: 0;
    z-index: 2;

    @media (max-width: 530px) {
      top: 100%;
    }
  `}
`
