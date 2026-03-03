import { Avatar } from "@/components/Avatar";
import { CommentArea, CommentForm, CommentList, CommentsSectionWrapper, CommentsWrapper, StyledCommentsSection, SubmitCommentButton, ViewMoreButton } from "./styles";
import { FormField } from "@/components/FormField";
import { Comment } from "./Comment";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { Comment as CommentType } from "@prisma/client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { LoadingWheel } from "@/components/LoadingWheel";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

const createNewCommentFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1)
    .max(2_000)
})

type createNewCommentFormData = z.infer<typeof createNewCommentFormSchema>

type CommentWithEssentialInfo = CommentType & {
  likes_amount: number
  is_liked: boolean

  author: {
    name: string
    synthesis: string
    avatar_url: string
  }
}

interface CommentSectionProps {
  postId: string
  commentList: CommentWithEssentialInfo[]
  onCreateNewComment: () => void
}

export function CommentSection({ postId, commentList, onCreateNewComment }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithEssentialInfo[]>(commentList)
  const { formState: { isValid, isSubmitting }, handleSubmit, register, reset } = useForm<createNewCommentFormData>({
    resolver: zodResolver(createNewCommentFormSchema)
  })
  const { data: authUser, isLoading } = useAuthUser()

  useEffect(() => {
    setComments(commentList)
  }, [commentList])

  async function handleCreateNewComment(formData: createNewCommentFormData) {
    const { content } = formData

    const { data: newComment } = await api.post(`/posts/${postId}/comments`, {
      content,
    })

    onCreateNewComment()

    reset()
  }

  function handleDeleteComment(commentId: string) {
    setComments(prev => prev.filter(comment => comment.id !== commentId))
  }

  function handleViewMoreComments() {

  }

  return (
    <StyledCommentsSection>
      <CommentsSectionWrapper>
        <CommentArea>
          { isLoading || !authUser ? (
            <LoadingWheel size="sm" />
          ) : (
            <Avatar username={ authUser.name } url={ authUser.avatar_url } hasBorder={false} />
          ) }

          <CommentForm onSubmit={ handleSubmit(handleCreateNewComment) }>
            <FormField
                type="textarea"
                placeholder="Write something cool..."
                {...register("content")}
              />

              <SubmitCommentButton type="submit" disabled={ !isValid }>
                { isSubmitting ? (
                  <LoadingWheel size="sm" color="white" />
                ) : (
                  <span>Submit</span>
                ) }
              </SubmitCommentButton>
          </CommentForm>
        </CommentArea>

        <CommentList>
          <CommentsWrapper>
            { comments.map(comment => (
              <Comment
                key={ comment.id }
                id={ comment.id }
                author={ comment.author }
                content={ comment.content }
                createdAt={ comment.created_at }
                updatedAt={ comment.updated_at }
                likesAmount={ comment.likes_amount }
                isLiked={ comment.is_liked }
                amITheAuthor = { authUser?.id === comment.author_id }
                handleDelete={ () => handleDeleteComment(comment.id) }
              />
            )) }
          </CommentsWrapper>

          <footer>
            <ViewMoreButton onClick={ handleViewMoreComments }>
              <ArrowDownIcon weight="bold" />
              View more comments
            </ViewMoreButton>
          </footer>
        </CommentList>
      </CommentsSectionWrapper>
    </StyledCommentsSection>
  )
}