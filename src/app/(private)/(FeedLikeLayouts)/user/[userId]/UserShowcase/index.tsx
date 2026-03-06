"use client"

import { PostsContainer } from "@/components/PostsContainer";
import { Banner, StyledUserShowcase, UserProfileDisplay, UserProfileInfo, UserProfilePresentation } from "./styles";
import { Avatar } from "@/components/Avatar";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { LoadingWheel } from "@/components/LoadingWheel";
import { PostWithEssentialInfo } from "@/@types/post-with-essential-info";

interface UserShowCaseProps {
  userId: string
}

interface User {
  name: string
  synthesis: string
  avatar_url: string
  banner_url: string
}

export function UserShowcase({ userId }: UserShowCaseProps) {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<PostWithEssentialInfo[]>([])
  const [isPostsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    async function fetchUserProfile() {
      const { data: user } = await api.get(`/user/${userId}`)

      setUser(user)
    }

    fetchUserProfile()
  }, [])

  useEffect(() => {
    async function fetchPosts() {
      try {
        setPostsLoading(true)
        const { data: posts } = await api.get<PostWithEssentialInfo[]>(`/user/${userId}/posts`)
        setPostsLoading(false)

        setPosts(posts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()
  }, [])

  if (!user) {
    return (
      <StyledUserShowcase className="loading">
        <LoadingWheel size="lg" />
      </StyledUserShowcase>
    )
  }

  return (
    <StyledUserShowcase>
      <UserProfileInfo>
        <header>
          <Banner style={ { backgroundImage: `url(${user.banner_url})` } }></Banner>
        </header>
        
        <UserProfileDisplay>
          <Avatar username={ user.name } url={ user.avatar_url } />

          <UserProfilePresentation>
            <strong>{ user.name }</strong>
            <span>{user.synthesis}</span>
          </UserProfilePresentation>
        </UserProfileDisplay>
      </UserProfileInfo>

      <PostsContainer posts={ posts } setPosts={ setPosts } isPostsLoading={ isPostsLoading } username={ user.name } />
    </StyledUserShowcase>
  )
}