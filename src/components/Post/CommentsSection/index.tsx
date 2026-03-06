import { Avatar } from '@/components/Avatar'
import {
  CommentArea,
  CommentForm,
  CommentList,
  CommentsSectionWrapper,
  CommentsWrapper,
  StyledCommentsSection,
  SubmitCommentButton,
  ViewMoreButton,
} from './styles'
import { FormField } from '@/components/FormField'
import { Comment } from './Comment'
import { ArrowDownIcon } from '@phosphor-icons/react'
import { LoadingWheel } from '@/components/LoadingWheel'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { CommentWithEssentialInfo } from '@/@types/comment-with-essential-info'
import { useAuthUserStore } from '@/store/useAuthUserStore'

const createNewCommentFormSchema = z.object({
  content: z.string().trim().min(1).max(2_000),
})

type createNewCommentFormData = z.infer<typeof createNewCommentFormSchema>

interface CommentSectionProps {
  postId: string
  commentList: CommentWithEssentialInfo[]
  hasMore: boolean
  onCreateNewComment: () => void
  onDeleteComment: () => void
  onViewMore: () => void
}

export function CommentSection({
  postId,
  commentList,
  hasMore,
  onCreateNewComment,
  onDeleteComment,
  onViewMore,
}: CommentSectionProps) {
  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<createNewCommentFormData>({
    resolver: zodResolver(createNewCommentFormSchema),
  })
  const { user, isLoading } = useAuthUserStore()

  async function handleCreateNewComment(formData: createNewCommentFormData) {
    const { content } = formData
    await api.post(`/posts/${postId}/comments`, { content })
    onCreateNewComment()
    reset()
  }

  return (
    <StyledCommentsSection>
      <CommentsSectionWrapper>
        <CommentArea>
          {isLoading || !user ? (
            <LoadingWheel size="sm" />
          ) : (
            <Avatar
              username={user.name}
              url={user.avatar_url}
              hasBorder={false}
            />
          )}

          <CommentForm onSubmit={handleSubmit(handleCreateNewComment)}>
            <FormField
              type="textarea"
              placeholder="Write something cool..."
              {...register('content')}
            />

            <SubmitCommentButton type="submit" disabled={!isValid}>
              {isSubmitting ? (
                <LoadingWheel size="sm" color="white" />
              ) : (
                <span>Submit</span>
              )}
            </SubmitCommentButton>
          </CommentForm>
        </CommentArea>

        <CommentList className={commentList.length > 0 ? 'with-comments' : ''}>
          <CommentsWrapper>
            {commentList.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                author={{
                  id: comment.author_id,
                  name: comment.author.name,
                  synthesis: comment.author.synthesis,
                  avatar_url: comment.author.avatar_url,
                }}
                content={comment.content}
                createdAt={comment.created_at}
                updatedAt={comment.updated_at}
                likesAmount={comment.likes_amount}
                isLiked={comment.is_liked}
                amITheAuthor={user?.id === comment.author_id}
                handleDelete={onDeleteComment}
              />
            ))}
          </CommentsWrapper>

          {hasMore && (
            <footer>
              <ViewMoreButton onClick={onViewMore}>
                <ArrowDownIcon weight="bold" />
                View more comments
              </ViewMoreButton>
            </footer>
          )}
        </CommentList>
      </CommentsSectionWrapper>
    </StyledCommentsSection>
  )
}
