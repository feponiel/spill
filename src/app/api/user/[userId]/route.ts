import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
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
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json(user, { status: 200 })
}
