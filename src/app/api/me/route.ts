import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!profile) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json({
    id: profile.id,
    name: profile.name,
    synthesis: profile.synthesis,
    avatar_url: profile.avatar_url,
    banner_url: profile.banner_url,
    created_at: profile.created_at,
  })
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  const { synthesis, banner_url } = await request.json()

  const updatedUser = await prisma.user.update({
    where: {
      id: session.user.id,
    },

    data: {
      synthesis,
      banner_url,
    },
  })

  return NextResponse.json(updatedUser)
}

export async function DELETE() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }

  await prisma.user.delete({
    where: {
      id: session.user.id,
    },
  })

  return new Response(null, { status: 204 })
}
