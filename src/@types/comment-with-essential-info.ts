import { Comment } from "@prisma/client"

export type CommentWithEssentialInfo = Comment & {
  likes_amount: number
  is_liked: boolean

  author: {
    name: string
    synthesis: string
    avatar_url: string
  }
}