import { Post } from '@prisma/client'

export type PostWithEssentialInfo = Post & {
  comments_amount: number
  likes_amount: number
  is_liked: boolean

  author: {
    name: string
    synthesis: string
    avatar_url: string
  }
}
