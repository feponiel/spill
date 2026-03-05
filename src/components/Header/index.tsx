import { Logo } from "../Logo";
import { StyledHeader } from "./styles";

export function Header() {
  return (
    <StyledHeader>
      <a href="/">
        <Logo size="sm" />
      </a>
    </StyledHeader>
  )
}
