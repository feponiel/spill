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
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isEdited, setIsEdited] = useState(updatedAt > publishedAt)
  const [postContent, setPostContent] = useState(content)
  const [postLikesAmount, setPostLikesAmount] = useState(likesAmount)
  const [postCommentsAmount, setPostCommentsAmount] = useState(commentsAmount)
  const [isCommentSectionOpen, setCommentSectionOpen] = useState(false)
  const [isPostLiked, setPostLiked] = useState(isLiked)
  const [isPostOptionsMenuOpen, setPostOptionsMenuOpen] = useState(false)
  const [isEditPostModalOpen, setEditPostModalOpen] = useState(false)
  const [isDeletePostModalOpen, setDeletePostModalOpen] = useState(false)
  const [isPostLinkCopied, setPostLinkCopied] = useState(false)

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

  async function fetchComments(pageToFetch = 1) {
    const { data: response } = await api.get(
      `/posts/${id}/comments?page=${pageToFetch}&limit=5`
    )

    if (pageToFetch === 1) {
      setComments(response.data)
    } else {
      setComments(prev => {
        const existingIds = new Set(prev.map(c => c.id))
        const newComments = response.data.filter(
          (c: CommentWithEssentialInfo) => !existingIds.has(c.id)
        )
        return [...prev, ...newComments]
      })
    }

    setHasMore(response.hasMore)
  }

  async function handleCreateComment() {
    setPostCommentsAmount(prev => prev + 1)
    setPage(1)
    await fetchComments(page)
  }

  async function handleDeleteComment() {
    setPostCommentsAmount(prev => prev - 1)
    setPage(1)
    await fetchComments(page)
  }

  async function handleOpenComments() {
    if (comments.length === 0) {
      setPage(1)
      await fetchComments(page)
    }
  }

  function handleViewMoreComments() {
    const nextPage = page + 1
    setPage(nextPage)
    fetchComments(nextPage)
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
  
  async function handleCopyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/post/${id}`)

    setPostLinkCopied(true)

    setTimeout(() => setPostLinkCopied(false), 2000)
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
          isPostLinkCopied={ isPostLinkCopied }
          isOpen={ isPostOptionsMenuOpen }
          handleToggleMenu={ setPostOptionsMenuOpen }
          handleChooseEditOption={ () => setEditPostModalOpen(true) }
          handleChooseDeleteOption={ () => setDeletePostModalOpen(true) }
          handleChooseCopyLinkOption={ handleCopyLink }
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
        <EngagementPanel isPostLiked={ isPostLiked } likesAmount={ postLikesAmount } commentsAmount={ postCommentsAmount } onLikePost={ handleLikePost } onOpenComments={ handleOpenComments } />

        <CommentSection 
          postId={ id } 
          commentList={ comments } 
          hasMore={ hasMore } 
          onCreateNewComment={ handleCreateComment }
          onDeleteComment={ handleDeleteComment }
          onViewMore={ handleViewMoreComments } 
        />
      </Collapsible.Root>

      <EditPostModal defaultPostContentValue={ postContent } isOpen={ isEditPostModalOpen } postId={id} handleToggleOpen={ setEditPostModalOpen } handleEditPost={ handleEditPost } />
      <DeletePostModal isOpen={ isDeletePostModalOpen } postId={id} handleToggleModal={ () => setDeletePostModalOpen(false) } handleDeletePost={ handleDeletePost } />
    </StyledPost>
  )
}
