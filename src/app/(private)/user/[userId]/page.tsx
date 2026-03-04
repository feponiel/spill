import { Metadata } from "next";
import { Container } from "./styles";
import { Sidebar } from "@/components/SideBar";
import { UserShowcase } from "./UserShowcase";

export const metadata: Metadata = {
  title: "Feed"
}

export default async function UserProfile({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  return (
    <Container>
      <Sidebar />

      <UserShowcase userId={ userId } />
    </Container>
  )
}
