import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = await params

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
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

  if (!post) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json(
    {
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
    },
    { status: 200 },
  )
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = await params
  const { content } = await request.json()

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  if (!content || content.length < 1) {
    return NextResponse.json(null, { status: 422 })
  }

  const newTags = [
    ...new Set<string>(
      content.match(/#(\w+)/g)?.map((tag: string) => tag.slice(1)) ?? [],
    ),
  ]

  await prisma.$transaction(async (transaction) => {
    await transaction.post.update({
      where: {
        id: postId,
        author_id: session.user.id,
      },
      data: { content },
    })

    const currentPostTags = await transaction.postTag.findMany({
      where: { post_id: postId },
      include: { tag: true },
    })

    const currentTagNames = currentPostTags.map((pt) => pt.tag.name)
    const toDelete = currentTagNames.filter((name) => !newTags.includes(name))
    const toInsert = newTags.filter((name) => !currentTagNames.includes(name))

    if (toDelete.length > 0) {
      await transaction.postTag.deleteMany({
        where: {
          post_id: postId,
          tag: { name: { in: toDelete } },
        },
      })

      await transaction.tag.updateMany({
        where: { name: { in: toDelete } },
        data: { references_count: { decrement: 1 } },
      })

      await transaction.tag.deleteMany({
        where: {
          name: { in: toDelete },
          references_count: { lte: 0 },
        },
      })
    }

    for (const name of toInsert) {
      const tag = await transaction.tag.upsert({
        where: { name },
        create: { name, references_count: 1 },
        update: { references_count: { increment: 1 } },
      })

      await transaction.postTag.create({
        data: { post_id: postId, tag_id: tag.id },
      })
    }
  })

  return new Response(null, { status: 204 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } },
) {
  const { postId } = await params

  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  await prisma.$transaction(async (transaction) => {
    const currentPostTags = await transaction.postTag.findMany({
      where: { post_id: postId },
      include: { tag: true },
    })

    const tagNames = currentPostTags.map((pt) => pt.tag.name)

    await transaction.post.delete({
      where: {
        id: postId,
        author_id: session.user.id,
      },
    })

    if (tagNames.length > 0) {
      await transaction.tag.updateMany({
        where: { name: { in: tagNames } },
        data: { references_count: { decrement: 1 } },
      })

      await transaction.tag.deleteMany({
        where: {
          name: { in: tagNames },
          references_count: { lte: 0 },
        },
      })
    }
  })

  return new Response(null, { status: 204 })
}
