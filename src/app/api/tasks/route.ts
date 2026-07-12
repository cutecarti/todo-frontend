import { NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { createTaskSchema } from '@/shared/lib/taskSchemas'

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = createTaskSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
      { status: 400 },
    )
  }

  const task = await prisma.task.create({
    data: {
      title: parsed.data.title,
      isDone: false,
    },
  })

  return NextResponse.json(task, { status: 201 })
}

export async function DELETE() {
  await prisma.task.deleteMany({})

  return new NextResponse(null, { status: 204 })
}
