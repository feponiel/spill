"use client"

import { PostWithEssentialInfo } from "@/@types/post-with-essential-info"
import { PostsContainer } from "@/components/PostsContainer"
import { api } from "@/lib/axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function FeedPosts() {
  const [posts, setPosts] = useState<PostWithEssentialInfo[]>([])
  const searchParams = useSearchParams()

  const tag = searchParams.get("tag")

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data: posts } = await api.get<PostWithEssentialInfo[]>(tag ? `/posts?tag=${tag}` : `/posts`)

        setPosts(posts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [tag])

  return (
    <PostsContainer posts={ posts } setPosts={ setPosts } topic={ tag ?? "" } />
  )
}
