import styled, { css } from "styled-components";

export const EditPostModalForm = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};

    textarea {
      width: 400px;
      resize: none;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.25rem;
      margin-top: ${theme.space[4]};
      font-size: ${theme.fontSizes.sm};
      font-weight: bold;
      color: ${theme.colors.white};
      background: ${theme.colors.accentColor};
      border: none;
      border-radius: ${theme.radius.md};
      cursor: pointer;
      transition: background-color .1s;

      &:hover {
        background: ${theme.colors.accentColorDark};
      }
    }

    @media (max-width: 1024px) {
      textarea {
        width: 100%;
        height: 7rem;
      }
    }
  `}
`
