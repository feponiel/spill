import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  })

  if (!user) {
    return NextResponse.json(null, { status: 404 })
  }

  const posts = await prisma.post.findMany({
    where: {
      author_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      author: true,
      postLikes: {
        where: {
          user_id: session.user.id,
        },
      },
      _count: {
        select: {
          postLikes: true,
          comments: true,
        },
      },
    },
  })

  return NextResponse.json(
    posts.map((post) => ({
      id: post.id,
      author_id: post.author_id,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      comments_amount: post._count.comments,
      likes_amount: post._count.postLikes,
      is_liked: post.postLikes.length > 0,

      author: {
        name: post.author.name,
        synthesis: post.author.synthesis,
        avatar_url: post.author.avatar_url,
      },
    })),
    { status: 200 },
  )
}
