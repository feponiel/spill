import styled, { css } from "styled-components";

export const EditCommentModalForm = styled.form`
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
      height: 52px;
      margin-top: ${theme.space[4]};
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
  `}
`
