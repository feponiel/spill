import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
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

  await prisma.commentLike.create({
    data: {
      user: {
        connect: { id: author.id },
      },
      comment: {
        connect: { id: commentId },
      },
    },
  })

  return NextResponse.json(null, { status: 201 })
}

export async function DELETE(request: NextRequest, { params }: { params: { commentId: string } }) {
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

  await prisma.commentLike.delete({
    where: {
      user_id_comment_id: {
        comment_id: commentId,
        user_id: author.id
      }
    }
  })

  return new Response(null, { status: 204 });
}
