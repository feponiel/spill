import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q") ?? ""

  const [exactMatch, related] = await Promise.all([
    prisma.user.findFirst({
      where: {
        name: { equals: search }
      }
    }),
    prisma.user.findMany({
      where: {
        name: {
          contains: search,
          not: { equals: search }
        }
      },
      take: 6
    })
  ])

  const results = [
    ...(exactMatch ? [exactMatch] : []),
    ...related
  ]

  return NextResponse.json(results, { status: 200 })
}
