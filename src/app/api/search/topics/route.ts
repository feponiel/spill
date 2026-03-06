import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('q') ?? ''

  const [exactMatch, related] = await Promise.all([
    prisma.tag.findFirst({
      where: {
        name: { equals: search },
      },
    }),
    prisma.tag.findMany({
      where: {
        name: {
          contains: search,
          not: { equals: search },
        },
      },
      orderBy: {
        references_count: 'desc',
      },
      take: 6,
    }),
  ])

  const results = [...(exactMatch ? [exactMatch] : []), ...related]

  return NextResponse.json(results, { status: 200 })
}
