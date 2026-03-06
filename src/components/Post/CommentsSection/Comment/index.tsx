import {
  ClockIcon,
  DotsThreeIcon,
  HeartIcon,
  PencilIcon,
} from '@phosphor-icons/react'
import {
  CommentAuthorAndTime,
  CommentContent,
  CommentContentAndInfo,
  CommentOptionsMenuButton,
  CommentWrapper,
  EditionWarn,
  LikeButton,
  StyledComment,
} from './styles'
import { Avatar } from '../../../Avatar'
import unknownUser from '@/../public/unknown-user.png'
import { formatDate } from '@/utils/formatDate'
import { CommentOptionsMenu } from './CommentOptionsMenu'
import { useState } from 'react'
import { DeleteCommentModal } from './DeleteCommentModal'
import { EditCommentModal } from './EditCommentModal'
import { api } from '@/lib/axios'
import Link from 'next/link'

interface CommentAuthor {
  id: string
  name: string
  synthesis: string
  avatar_url: string
}

interface CommentProps {
  id: string
  author: CommentAuthor
  content: string
  createdAt: Date
  updatedAt: Date
  likesAmount: number
  isLiked: boolean
  amITheAuthor: boolean
  handleDelete: () => void
}

export function Comment({
  id,
  author,
  content,
  createdAt,
  updatedAt,
  likesAmount,
  isLiked,
  amITheAuthor,
  handleDelete,
}: CommentProps) {
  createdAt = new Date(createdAt)
  updatedAt = new Date(updatedAt)

  const [isEdited, setIsEdited] = useState(updatedAt > createdAt)
  const [commentContent, setCommentContent] = useState(content)
  const [commentLikesAmount, setCommentLikesAmount] = useState(likesAmount)
  const [isCommentLiked, setCommentLiked] = useState(isLiked)
  const [isCommentOptionsMenuOpen, setCommentOptionsMenuOpen] = useState(false)
  const [isEditCommentModalOpen, setEditCommentModalOpen] = useState(false)
  const [isDeleteCommentModalOpen, setDeleteCommentModalOpen] = useState(false)

  const {
    formatedDate: creationDateFormated,
    formatedDateRelativeToNow: creationDateRelativeToNow,
  } = formatDate(createdAt)

  async function handleLikeComment() {
    if (isCommentLiked) {
      await api.delete(`/comments/${id}/like`)

      setCommentLikesAmount((prev) => prev - 1)
      setCommentLiked(false)
    } else {
      await api.post(`/comments/${id}/like`)

      setCommentLikesAmount((prev) => prev + 1)
      setCommentLiked(true)
    }
  }

  function handleEditComment(newCommentContent: string) {
    setIsEdited(true)
    setCommentContent(newCommentContent)
    setEditCommentModalOpen(false)
  }

  function handleDeleteComment() {
    handleDelete()
    setDeleteCommentModalOpen(false)
  }

  return (
    <StyledComment>
      <Link href={`/user/${author.id}`}>
        <Avatar
          username={author.name}
          url={author.avatar_url ?? unknownUser.src}
          hasBorder={false}
        />
      </Link>

      <CommentWrapper>
        <CommentContentAndInfo>
          <header>
            <CommentAuthorAndTime>
              <Link href={`/user/${author.id}`}>
                <strong>{author.name}</strong>
                <span>{author.synthesis}</span>
              </Link>
              <time
                title={creationDateFormated}
                dateTime={createdAt.toISOString()}
              >
                <ClockIcon />
                {creationDateRelativeToNow}
              </time>
            </CommentAuthorAndTime>

            <CommentOptionsMenu
              trigger={
                <CommentOptionsMenuButton title="Comment options">
                  <DotsThreeIcon />
                </CommentOptionsMenuButton>
              }
              isOpen={isCommentOptionsMenuOpen}
              amITheAuthor={amITheAuthor}
              handleToggleMenu={setCommentOptionsMenuOpen}
              handleChooseEditOption={() => setEditCommentModalOpen(true)}
              handleChooseDeleteOption={() => setDeleteCommentModalOpen(true)}
            />
          </header>

          <CommentContent>
            {isEdited && (
              <EditionWarn>
                <PencilIcon />
                Edited
              </EditionWarn>
            )}
            {commentContent}
          </CommentContent>
        </CommentContentAndInfo>

        <footer>
          <LikeButton onClick={handleLikeComment} $isLiked={isCommentLiked}>
            <HeartIcon weight={isCommentLiked ? 'fill' : 'regular'} />

            <span>
              Like
              <strong>{commentLikesAmount}</strong>
            </span>
          </LikeButton>
        </footer>
      </CommentWrapper>

      <EditCommentModal
        commentId={id}
        defaultCommentContentValue={commentContent}
        isOpen={isEditCommentModalOpen}
        handleToggleOpen={setEditCommentModalOpen}
        handleEditComment={handleEditComment}
      />
      <DeleteCommentModal
        commentId={id}
        isOpen={isDeleteCommentModalOpen}
        handleToggleModal={setDeleteCommentModalOpen}
        handleDeleteComment={handleDeleteComment}
      />
    </StyledComment>
  )
}
