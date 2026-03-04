import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
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

  const { content } = await request.json()

  if (!content || content.length < 1) {
    return NextResponse.json(null, { status: 422 })
  }

  const tags = [...new Set<string>(
    content.match(/#(\w+)/g)?.map((tag: string) => tag.slice(1)) ?? []
  )]

  const post = await prisma.$transaction(async (transaction) => {
    const post = await transaction.post.create({
      data: {
        author_id: author.id,
        content,
      }
    })

    for (const name of tags) {
      const tag = await transaction.tag.upsert({
        where: { name },
        create: { name, references_count: 1 },
        update: { references_count: { increment: 1 } }
      })

      await transaction.postTag.create({
        data: { post_id: post.id, tag_id: tag.id }
      })
    }

    return post
  })

  return NextResponse.json(post, { status: 201 })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tag = searchParams.get("tag")

  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const posts = await prisma.post.findMany({
    where: tag ? {
      postTags: {
        some: {
          tag: { name: tag }
        }
      }
    } : undefined,

    orderBy: {
      created_at: "desc"
    },
    
    include: {
      author: true,
      postLikes: {
        where: {
          user_id: session.user.id
        },
      },
      _count: {
        select: {
          postLikes: true,
          comments: true
        }
      }
    }
  })

  return NextResponse.json(posts.map(post => ({
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
      avatar_url: post.author.avatar_url
    }
  })), { status: 200 })
}
