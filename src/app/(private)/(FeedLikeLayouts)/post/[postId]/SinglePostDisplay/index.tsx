"use client"

import { PostWithEssentialInfo } from "@/@types/post-with-essential-info"
import { PostsContainer } from "@/components/PostsContainer"
import { api } from "@/lib/axios"
import { useEffect, useState } from "react"

interface SinglePostDisplayProps {
  postId: string
}

export function SinglePostDisplay({ postId }: SinglePostDisplayProps) {
  const [posts, setPosts] = useState<PostWithEssentialInfo[]>([])
  const [isPostsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        setPostsLoading(true)
        const { data: post } = await api.get<PostWithEssentialInfo>(`/posts/${postId}`)
        setPostsLoading(false)

        setPosts([post])
      } catch (error) {
        console.error(error)
      }
    }

    fetchPost()
  }, [])
  
  return (
    <PostsContainer posts={ posts } setPosts={ setPosts } isPostsLoading={ isPostsLoading } />
  )
}
