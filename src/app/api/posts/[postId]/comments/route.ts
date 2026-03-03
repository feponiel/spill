import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = await params
  const { content } = await request.json()
  
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const author = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!author) {
    return NextResponse.json(null, { status: 404 })
  }

  const comment = await prisma.comment.create({
    data: {
      author_id: author.id,
      post_id: postId,
      content,
    }
  })

  return NextResponse.json(comment, { status: 201 })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = await params

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const userId = session.user.id

  const { searchParams } = new URL(request.url)

  const limit = Number(searchParams.get("limit")) || 5
  const page = Number(searchParams.get("page")) || 1

  const skip = (page - 1) * limit

  const myComments = await prisma.comment.findMany({
    where: {
      post_id: postId,
      author_id: userId
    },
    include: {
      author: true,
      commentLikes: {
        where: {
          user_id: userId,
        }
      },
      _count: {
        select: {
          commentLikes: true,
        }
      }
    },
    orderBy: {
      created_at: "desc"
    },
    skip,
    take: limit
  })

  const remaining = limit - myComments.length

  let otherComments: typeof myComments = []

  if (remaining > 0) {
    otherComments = await prisma.comment.findMany({
      where: {
        post_id: postId,
        NOT: {
          author_id: userId
        }
      },
      include: {
        author: true,
        commentLikes: {
          where: {
            user_id: userId,
          }
        },
        _count: {
          select: {
            commentLikes: true,
          }
        }
      },
      orderBy: [
        {
          commentLikes: {
            _count: "desc"
          }
        },
        {
          created_at: "desc"
        }
      ],
      take: remaining
    })
  }

  const finalComments = [...myComments, ...otherComments]

  return NextResponse.json(
    finalComments.map(comment => ({
      id: comment.id,
      author_id: comment.author_id,
      post_id: comment.post_id,
      content: comment.content,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      likes_amount: comment._count.commentLikes,
      is_liked: comment.commentLikes.length > 0,
      author: {
        name: comment.author.name,
        synthesis: comment.author.synthesis,
        avatar_url: comment.author.avatar_url
      }
    })),
    { status: 200 }
  )
}
