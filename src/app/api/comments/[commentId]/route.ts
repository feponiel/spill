import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { commentId: string } },
) {
  const { commentId } = await params
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

  await prisma.comment.update({
    where: {
      id: commentId,
    },

    data: {
      content,
    },
  })

  return new Response(null, { status: 204 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { commentId: string } },
) {
  const { commentId } = await params

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

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  })

  return new Response(null, { status: 204 })
}
