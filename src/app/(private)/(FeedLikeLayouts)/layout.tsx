import { Sidebar } from "@/components/SideBar";
import { Container } from "./styles";

export default function FeedLikeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Sidebar />

      { children }
    </Container>
  )
}
