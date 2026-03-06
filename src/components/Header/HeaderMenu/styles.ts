import { Avatar } from "@/components/Avatar";
import { DropdownMenu } from "@/components/DropdownMenu";
import styled, { css } from "styled-components";

export const StyledHeaderMenu = styled(DropdownMenu)`
  ${({ theme }) => css`
    display: none;

    @media (max-width: 1024px) {
      display: block;
    }
  `}
`