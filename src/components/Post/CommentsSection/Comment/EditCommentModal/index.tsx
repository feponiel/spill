import { DialogTitle } from '@radix-ui/react-dialog'
import { Title } from '@/styles/global'
import { EditCommentModalForm } from './styles'
import { Modal } from '@/components/Modal'
import { FormField } from '@/components/FormField'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { LoadingWheel } from '@/components/LoadingWheel'

function editCommentFormSchemaBuilder(original: string) {
  return z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Comment cannot be empty!')
      .max(2_000, 'Comment cannot exceed 2k characters!')
      .refine((value) => value !== original, {
        message: 'Comment content must be different!',
      }),
  })
}

type editCommentFormData = z.infer<
  ReturnType<typeof editCommentFormSchemaBuilder>
>

interface EditCommentModalProps {
  commentId: string
  defaultCommentContentValue: string
  isOpen: boolean
  handleToggleOpen: (_open: boolean) => void
  handleEditComment: (_newCommentContent: string) => void
}

export function EditCommentModal({
  commentId,
  defaultCommentContentValue,
  isOpen,
  handleToggleOpen,
  handleEditComment,
}: EditCommentModalProps) {
  const schema = editCommentFormSchemaBuilder(defaultCommentContentValue)

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<editCommentFormData>({
    resolver: zodResolver(schema),
  })

  function handleConfirmEdition(formData: editCommentFormData) {
    const { content } = formData

    api.patch(`/comments/${commentId}`, {
      content,
    })

    handleEditComment(content)
  }

  return (
    isOpen && (
      <Modal isOpen={isOpen} onToggleOpen={handleToggleOpen}>
        <DialogTitle asChild>
          <Title $level={2} $size="sm">
            Edit Comment
          </Title>
        </DialogTitle>

        <EditCommentModalForm onSubmit={handleSubmit(handleConfirmEdition)}>
          <FormField
            autoComplete="off"
            type="textarea"
            placeholder="Edit the Comment content..."
            defaultValue={defaultCommentContentValue}
            hasValidationError={!!errors.content}
            validationErrorMessage={errors.content?.message}
            {...register('content')}
          />

          <button type="submit">
            {isSubmitting ? (
              <LoadingWheel size="sm" color="white" />
            ) : (
              <span>Submit Edit</span>
            )}
          </button>
        </EditCommentModalForm>
      </Modal>
    )
  )
}
