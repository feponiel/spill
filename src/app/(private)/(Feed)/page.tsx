import { Container } from "./styles";
import { Metadata } from "next";
import { Sidebar } from "@/components/SideBar";
import { FeedPosts } from "./FeedPosts";

export const metadata: Metadata = {
  title: "Feed"
}

export default function Feed() {
  return (
    <Container>
      <Sidebar />

      <FeedPosts />
    </Container>
  )
}
