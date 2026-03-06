import styled, { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: ${theme.fonts.default};
    }

    html {
      font-size: 16px;

      @media (max-width: 1024px) {
        font-size: 24px;
      }

      @media (max-width: 820px) {
        font-size: 20px;
      }

      @media (max-width: 630px) {
        font-size: 18px;
      }

      @media (max-width: 530px) {
        font-size: 14px;
      }

      @media (max-width: 380px) {
        font-size: 11px;
      }

      @media (max-height: 600px) {
        font-size: 16px;
      }
    }

    body {
      background-color: ${theme.colors.shade900};
      color: ${theme.colors.shade300};
      -webkit-font-smoothing: antialiased;
    }

    input,
    button,
    textarea {
      appearance: none;
    }

    ::-webkit-scrollbar {
      width: ${theme.defaults.scrollBarWidth};
      height: ${theme.defaults.scrollBarWidth};
    }

    ::-webkit-scrollbar-track {
      background: ${theme.colors.shade100};
    }

    ::-webkit-scrollbar-thumb {
      ${({ theme }) => css`
        background: ${theme.colors.accentColor};
        border-radius: ${theme.radius.xs};
      `}
    }
  `}
`

interface TitleProps {
  $level: 1 | 2 | 3 | 4 | 5 | 6
  $size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const Title = styled.h1.attrs<TitleProps>(({ $level }) => ({
  as: `h${$level}`,
}))<TitleProps>`
  ${({ theme, $size = 'md' }) => css`
    font-family: ${theme.fonts.default};
    font-weight: ${theme.fontWeights.medium};
    line-height: 1.37;
    color: ${theme.colors.shade100};

    // VARIANTS
    ${$size === 'xs' &&
    css`
      font-size: ${theme.fontSizes.md};
    `}

    ${$size === 'sm' &&
    css`
      font-size: ${theme.fontSizes.xl};
    `}

    ${$size === 'md' &&
    css`
      font-size: ${theme.fontSizes['2xl']};
    `}

    ${$size === 'lg' &&
    css`
      font-size: ${theme.fontSizes['3xl']};
    `}
  `}
`