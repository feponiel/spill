import { Metadata } from "next";
import { FeedPosts } from "./FeedPosts";

export const metadata: Metadata = {
  title: "Feed"
}

export default function Feed() {
  return <FeedPosts />
}
