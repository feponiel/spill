import { ClockIcon, DotsThreeIcon, HeartIcon, PencilIcon } from '@phosphor-icons/react'
import { CommentAuthorAndTime, CommentContent, CommentOptionsMenuButton, CommentWrapper, EditionWarn, LikeButton, StyledComment } from "./styles"
import { Avatar } from "../../../Avatar"
import unknownUser from "@/../public/unknown-user.png"
import { formatDate } from '@/utils/formatDate'
import { CommentOptionsMenu } from './CommentOptionsMenu'
import { useState } from 'react'
import { DeleteCommentModal } from './DeleteCommentModal'
import { EditCommentModal } from './EditCommentModal'

interface CommentAuthor {
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
}

export function Comment({ id, author, content, createdAt, updatedAt, likesAmount }: CommentProps) {
  createdAt = new Date(createdAt)
  updatedAt = new Date(updatedAt)

  const [isEdited, setIsEdited] = useState(updatedAt > createdAt)
  const [commentLikesAmount, setCommentLikesAmount] = useState(likesAmount)
  const [isCommentLiked, setCommentLiked] = useState(false)
  const [isCommentOptionsMenuOpen, setCommentOptionsMenuOpen] = useState(false)
  const [isEditCommentModalOpen, setEditCommentModalOpen] = useState(false)
  const [isDeleteCommentModalOpen, setDeleteCommentModalOpen] = useState(false)

  const {
    formatedDate: creationDateFormated,
    formatedDateRelativeToNow: creationDateRelativeToNow 
  } = formatDate(createdAt)

  function handleLikeComment() {
    if (isCommentLiked) {
      setCommentLikesAmount(prev => prev - 1)
      setCommentLiked(false)
    } else {
      setCommentLikesAmount(prev => prev + 1)
      setCommentLiked(true)
    }
  }

  return (
    <StyledComment>
      <Avatar username={ author.name } url={ author.avatar_url ?? unknownUser.src } hasBorder={false} />

      <CommentWrapper>
        <CommentContent>
          <header>
            <CommentAuthorAndTime>
              <strong>{ author.name }</strong>
              <span>{ author.synthesis }</span>
              <time title={creationDateFormated} dateTime={createdAt.toISOString()}>
                <ClockIcon size={ 15 } />
                { creationDateRelativeToNow }
              </time>
            </CommentAuthorAndTime>

            <CommentOptionsMenu
              trigger={
                <CommentOptionsMenuButton title="Comment options">
                  <DotsThreeIcon size={24} />
                </CommentOptionsMenuButton>
              }
              isOpen={ isCommentOptionsMenuOpen }
              handleToggleMenu={ setCommentOptionsMenuOpen }
              handleChooseEditOption={ () => setEditCommentModalOpen(true) }
              handleChooseDeleteOption={ () => setDeleteCommentModalOpen(true) }
            />
          </header>

          <p>
            {isEdited && (
              <EditionWarn>
                <PencilIcon size={16} />
                Edited
              </EditionWarn>
            )}
            { content }
          </p>
        </CommentContent>

        <footer>
          <LikeButton onClick={ handleLikeComment } $isLiked={ isCommentLiked }>
            <HeartIcon weight={ isCommentLiked ? "fill" : "regular" } />
            
            <span>
              Like
              <strong>{ commentLikesAmount }</strong>
            </span>
          </LikeButton>
        </footer>
      </CommentWrapper>

      <EditCommentModal defaultCommentContentValue={ content } isOpen={ isEditCommentModalOpen } handleToggleOpen={ setEditCommentModalOpen } />
      <DeleteCommentModal isOpen={ isDeleteCommentModalOpen } handleToggleModal={ setDeleteCommentModalOpen } />
    </StyledComment>
  )
}
