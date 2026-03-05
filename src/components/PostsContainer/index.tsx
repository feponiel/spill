"use client"

import { Post } from "@/components/Post"
import { Dispatch, SetStateAction, useState } from "react"
import { CreatePostButton, NoPostsMessage, StyledPostsContainer } from "./styles"
import { PlusIcon } from "@phosphor-icons/react"
import { CreatePostModal } from "@/components/CreatePostModal"
import { Title } from "@/styles/global"
import { useAuthUser } from "@/hooks/useAuthUser"
import { LoadingWheel } from "../LoadingWheel"
import { PostWithEssentialInfo } from "@/@types/post-with-essential-info"

interface PostsContainerProps {
  posts: PostWithEssentialInfo[]
  setPosts: Dispatch<SetStateAction<PostWithEssentialInfo[]>>
  username?: string
  topic?: string
}

export function PostsContainer({ posts, setPosts, username, topic }: PostsContainerProps) {
  const { data: authUser, isLoading } = useAuthUser()
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false)

  function handleDeletePost(postId: string) {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  if (isLoading || !authUser) {
    return (
      <StyledPostsContainer className="loading">
        <LoadingWheel size="lg" />
      </StyledPostsContainer>
    )
  }

  return (
    <StyledPostsContainer>
      { (username || topic) && (
        <header>
          { username && (
            <>
              <Title $level={2} $size="md">{username}'s Posts</Title>
              <p>See the most recent pieces of work from {username}</p>
            </>
          ) }

          { topic && (
            <>
              <Title $level={2} $size="md">Posts related to #{topic}</Title>
              <p>See what people are talking about #{topic}</p>
            </>
          ) }
        </header>
      ) }

      <main>
        {
          posts.length > 0 ? (
            posts.map(post => (
              <Post
                id={ post.id }
                author={ {id: post.author_id, name: post.author.name, synthesis: post.author.synthesis, avatar_url: post.author.avatar_url} }
                content={ post.content }
                likesAmount={ post.likes_amount }
                commentsAmount={ post.comments_amount }
                publishedAt={ new Date(post.created_at) }
                updatedAt={ new Date(post.updated_at) }
                isLiked={ post.is_liked }
                amITheAuthor={ authUser.id === post.author_id }
                handleDelete={ () => handleDeletePost(post.id) }
                key={ post.id }
              />
            ))
          ) : (
            <NoPostsMessage>There are no posts here :(</NoPostsMessage>
          )
        }
      </main>

      <CreatePostButton onClick={ () => setCreatePostModalOpen(true) } title="Create new post">
        <PlusIcon />
      </CreatePostButton>

      <CreatePostModal isOpen={ isCreatePostModalOpen } handleToggleOpen={ setCreatePostModalOpen } />
    </StyledPostsContainer>
  )
}
