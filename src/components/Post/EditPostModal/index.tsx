import { DialogTitle } from '@radix-ui/react-dialog'
import { Title } from '@/styles/global'
import { EditPostModalForm } from './styles'
import { Modal } from '@/components/Modal'
import { FormField } from '@/components/FormField'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { LoadingWheel } from '@/components/LoadingWheel'

function editPostFormSchemaBuilder(original: string) {
  return z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Post cannot be empty!')
      .max(10_000, 'Post cannot exceed 10k characters!')
      .refine((value) => value !== original, {
        message: 'Post content must be different!',
      }),
  })
}

type editPostFormData = z.infer<ReturnType<typeof editPostFormSchemaBuilder>>

interface EditPostModalProps {
  defaultPostContentValue: string
  isOpen: boolean
  postId: string
  handleToggleOpen: (_open: boolean) => void
  handleEditPost: (_newPostContent: string) => void
}

export function EditPostModal({
  defaultPostContentValue,
  isOpen,
  postId,
  handleToggleOpen,
  handleEditPost,
}: EditPostModalProps) {
  const schema = editPostFormSchemaBuilder(defaultPostContentValue)

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<editPostFormData>({
    resolver: zodResolver(schema),
  })

  function handleConfirmEdition(formData: editPostFormData) {
    const { content } = formData

    api.patch(`/posts/${postId}`, {
      content,
    })

    handleEditPost(content)
  }

  return (
    isOpen && (
      <Modal isOpen={isOpen} onToggleOpen={handleToggleOpen}>
        <DialogTitle asChild>
          <Title $level={2} $size="sm">
            Edit Post
          </Title>
        </DialogTitle>

        <EditPostModalForm onSubmit={handleSubmit(handleConfirmEdition)}>
          <FormField
            autoComplete="off"
            type="textarea"
            placeholder="Edit the post content..."
            defaultValue={defaultPostContentValue}
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
        </EditPostModalForm>
      </Modal>
    )
  )
}
