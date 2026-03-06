import { FormField } from '@/components/FormField'
import { Modal } from '@/components/Modal'
import { EditProfileModalForm } from './styles'
import { Title } from '@/styles/global'
import { DialogTitle } from '@radix-ui/react-dialog'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { LoadingWheel } from '@/components/LoadingWheel'
import { AuthUser, useAuthUserStore } from '@/store/useAuthUserStore'

const editProfileFormSchema = z.object({
  synthesis: z
    .string()
    .trim()
    .refine((val) => val === '' || (val.length >= 10 && val.length <= 30), {
      message: 'Synthesis must be between 10-30 characters!',
    }),

  banner_url: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (val === '') return true

        try {
          const parsed = new URL(val)
          return /\.(jpg|jpeg|png|webp|gif)$/i.test(parsed.pathname)
        } catch {
          return false
        }
      },
      { message: 'Banner URL must be a valid image!' },
    ),
})

type editProfileFormData = z.infer<typeof editProfileFormSchema>

interface EditProfileModalProps {
  user: AuthUser
  isOpen: boolean
  handleToggleModal: (_open: boolean) => void
}

export function EditProfileModal({
  user,
  isOpen,
  handleToggleModal,
}: EditProfileModalProps) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<editProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
  })

  const { updateUser } = useAuthUserStore()

  const closeModal = () => handleToggleModal(false)

  async function handleEditProfile(formData: editProfileFormData) {
    const { synthesis, banner_url } = formData

    const { data } = await api.patch('/me', {
      synthesis,
      banner_url,
    })

    updateUser({ synthesis: data.synthesis, banner_url: data.banner_url })

    closeModal()
  }

  return (
    <Modal isOpen={isOpen} onToggleOpen={handleToggleModal}>
      <DialogTitle asChild>
        <Title $level={2} $size="sm">
          Edit Profile
        </Title>
      </DialogTitle>

      <EditProfileModalForm onSubmit={handleSubmit(handleEditProfile)}>
        <FormField
          name="name"
          defaultValue={user.name}
          label="Name"
          isDisabled
          disabledMessage="This field was synced with your GitHub and can't be edited"
        />

        <FormField
          name="avatar_url"
          defaultValue={user.avatar_url}
          label="Profile Picture"
          isDisabled
          disabledMessage="This field was synced with your GitHub and can't be edited"
        />

        <FormField
          autoComplete="off"
          placeholder="Your denomination (e.g., Java Developer)..."
          defaultValue={user.synthesis ?? ''}
          label="Synthesis"
          hasValidationError={!!errors.synthesis}
          validationErrorMessage={errors.synthesis?.message}
          {...register('synthesis')}
        />

        <FormField
          autoComplete="off"
          placeholder="URL of your banner picture..."
          defaultValue={user.banner_url ?? ''}
          label="Banner picture"
          {...register('banner_url')}
        />

        <button type="submit">
          {isSubmitting ? (
            <LoadingWheel size="sm" color="white" />
          ) : (
            <span>Submit Edit</span>
          )}
        </button>
      </EditProfileModalForm>
    </Modal>
  )
}
