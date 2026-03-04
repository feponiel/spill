import { DialogTitle } from "@radix-ui/react-dialog";
import { Modal } from "../Modal";
import { Title } from "@/styles/global";
import { FormField } from "../FormField";
import { CreatePostModalForm } from "./styles";
import { api } from "@/lib/axios";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingWheel } from "../LoadingWheel";
import { useRouter, usePathname } from "next/navigation"

const createPostFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Post cannot be empty!")
    .max(10_000, "Post cannot exceed 10k characters!")
})

type createPostFormData = z.infer<typeof createPostFormSchema>

interface CreatePostModalProps {
  isOpen: boolean
  handleToggleOpen: (open: boolean) => void
}

export function CreatePostModal({ isOpen, handleToggleOpen }: CreatePostModalProps) {
  const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm<createPostFormData>({
    resolver: zodResolver(createPostFormSchema)
  })

  const router = useRouter()
  const pathname = usePathname()

  async function handleCreatePost(formData: createPostFormData) {
    const { content } = formData

    await api.post('/posts', {
      content,
    })

    if (pathname === "/") {
      window.location.reload()
    } else {
      router.push("/")
    }
  }

  return (
    <Modal isOpen={ isOpen } onToggleOpen={ handleToggleOpen }>
      <DialogTitle asChild>
        <Title $level={2} $size="sm">Create New Post</Title>
      </DialogTitle>

      <CreatePostModalForm onSubmit={ handleSubmit(handleCreatePost) }>
        <FormField
          autoComplete="off"
          type="textarea"
          placeholder="Write down the post content..."
          hasValidationError={ !!errors.content }
          validationErrorMessage={ errors.content?.message }
          {...register("content")}
        />

        <button type="submit">
          { isSubmitting ? (
            <LoadingWheel size="sm" color="white" />
          ) : (
            <span>Submit Edit</span>
          ) }
        </button>
      </CreatePostModalForm>
    </Modal>
  )
}
