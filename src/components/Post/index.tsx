"use client"

import { formatDate } from "@/utils/formatDate"
import { Avatar } from "../Avatar"
import { Info, Content, PostDate, InfoDisplay, StyledPost, EditionWarn, PostOptionsMenuButton } from "./styles"
import { useState } from "react"
import { ClockIcon, DotsThreeIcon, PencilIcon } from "@phosphor-icons/react"
import { DeletePostModal } from "./DeletePostModal"
import { PostOptionsMenu } from "./PostOptionsMenu"
import { EditPostModal } from "./EditPostModal"
import * as Collapsible from "@radix-ui/react-collapsible"
import { EngagementPanel } from "./EngagementPanel"
import { CommentSection } from "./CommentsSection"
import { ContentWrapper } from "./ContentWrapper"
import { api } from "@/lib/axios"
import { Comment as CommentType } from "@prisma/client"

interface Author {
  name: string
  synthesis?: string
  avatar_url?: string
}

interface PostProps {
  id: string
  author: Author
  content: string
  likesAmount: number
  commentsAmount: number
  publishedAt: Date
  updatedAt: Date
  isLiked: boolean
  amITheAuthor: boolean
  handleDelete: () => void
}

type CommentWithEssentialInfo = CommentType & {
  likes_amount: number
  is_liked: boolean

  author: {
    name: string
    synthesis: string
    avatar_url: string
  }
}

export function Post({ id, author, content, likesAmount, commentsAmount, publishedAt, updatedAt, isLiked, amITheAuthor, handleDelete }: PostProps) {
  publishedAt = new Date(publishedAt)
  updatedAt = new Date(updatedAt)

  const [comments, setComments] = useState<CommentWithEssentialInfo[]>([])
  const [isEdited, setIsEdited] = useState(updatedAt > publishedAt)
  const [postContent, setPostContent] = useState(content)
  const [postLikesAmount, setPostLikesAmount] = useState(likesAmount)
  const [postCommentsAmount, setPostCommentsAmount] = useState(commentsAmount)
  const [isCommentSectionOpen, setCommentSectionOpen] = useState(false)
  const [isPostLiked, setPostLiked] = useState(isLiked)
  const [isPostOptionsMenuOpen, setPostOptionsMenuOpen] = useState(false)
  const [isEditPostModalOpen, setEditPostModalOpen] = useState(false)
  const [isDeletePostModalOpen, setDeletePostModalOpen] = useState(false)

  const {
    formatedDate: postDateFormated,
    formatedDateRelativeToNow: postDateRelativeToNow 
  } = formatDate(publishedAt)

  async function handleLikePost() {
    if (isPostLiked) {
      await api.delete(`/posts/${id}/like`)

      setPostLikesAmount(prev => prev - 1)
      setPostLiked(false)
    } else {
      await api.post(`/posts/${id}/like`)

      setPostLikesAmount(prev => prev + 1)
      setPostLiked(true)
    }
  }

  async function fetchComments() {
    const { data: commentList } = await api.get(`/posts/${id}/comments`)

    setComments(commentList)
  }

  async function handleOpenComments() {
    if (comments.length == 0) {
      fetchComments()
    }
  }

  function handleEditPost(newPostContent: string) {
    setIsEdited(true)
    setPostContent(newPostContent)
    setEditPostModalOpen(false)
  }

  function handleDeletePost() {
    handleDelete()
    setDeletePostModalOpen(false)
  }

  return (
    <StyledPost>
      <header>
        <InfoDisplay>
          <Avatar username={ author.name } url={ author.avatar_url } />
          
          <Info>
            <strong>{ author.name }</strong>
            { author.synthesis &&
              <span>{ author.synthesis }</span>
            }
            <PostDate title={ postDateFormated } dateTime={ publishedAt.toISOString() }>
              <ClockIcon size={16} />

              { postDateRelativeToNow }
            </PostDate>
          </Info>
        </InfoDisplay>

        <PostOptionsMenu
          trigger={
            <PostOptionsMenuButton title="Post options">
              <DotsThreeIcon size={24} />
            </PostOptionsMenuButton>
          }
          amITheAuthor={ amITheAuthor }
          isOpen={ isPostOptionsMenuOpen }
          handleToggleMenu={ setPostOptionsMenuOpen }
          handleChooseEditOption={ () => setEditPostModalOpen(true) }
          handleChooseDeleteOption={ () => setDeletePostModalOpen(true) }
        />
      </header>

      <Content>
        {isEdited && (
          <EditionWarn>
            <PencilIcon size={16} />
            Edited by the author
          </EditionWarn>
        )}
        
        <ContentWrapper>{ postContent }</ContentWrapper>
      </Content>

      <Collapsible.Root open={ isCommentSectionOpen } onOpenChange={ setCommentSectionOpen }>
        <EngagementPanel isPostLiked={ isPostLiked } likesAmount={ postLikesAmount } commentsAmount={ commentsAmount } onLikePost={ handleLikePost } onOpenComments={ handleOpenComments } />

        <CommentSection postId={ id } commentList={ comments } onCreateNewComment={ fetchComments } />
      </Collapsible.Root>

      <EditPostModal defaultPostContentValue={ postContent } isOpen={ isEditPostModalOpen } postId={id} handleToggleOpen={ setEditPostModalOpen } handleEditPost={ handleEditPost } />
      <DeletePostModal isOpen={ isDeletePostModalOpen } postId={id} handleToggleModal={ () => setDeletePostModalOpen(false) } handleDeletePost={ handleDeletePost } />
    </StyledPost>
  )
}
