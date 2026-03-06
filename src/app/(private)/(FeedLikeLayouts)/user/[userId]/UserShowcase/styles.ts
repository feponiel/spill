import styled, { css } from 'styled-components'

export const StyledUserShowcase = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[8]};

    &.loading {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 10rem;
    }
  `}
`

export const UserProfileInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding-bottom: ${theme.space[10]};
    background: ${theme.colors.shade800};
    border-radius: ${theme.radius.md};
    box-shadow: ${theme.shadows.default};
    overflow: hidden;

    header {
      width: 100%;
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

export const UserProfileDisplay = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: calc(0px - 3rem - 6px);
    padding: 0 ${theme.space[6]};

    img {
      width: 6rem;
      height: 6rem;
    }
  `}
`

export const UserProfilePresentation = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: ${theme.space[4]};
    text-align: center;

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
