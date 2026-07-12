import { NextResponse } from 'next/server'
import { prisma } from '@/shared/lib/prisma'
import { updateTaskSchema } from '@/shared/lib/taskSchemas'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const task = await prisma.task.findUnique({ where: { id } })

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  return NextResponse.json(task)
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = updateTaskSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
      { status: 400 },
    )
  }

  const existing = await prisma.task.findUnique({ where: { id } })

  if (!existing) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(parsed.data.title !== undefined ? { title: parsed.data.title } : {}),
      ...(parsed.data.isDone !== undefined
        ? { isDone: parsed.data.isDone }
        : {}),
    },
  })

  return NextResponse.json(task)
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const existing = await prisma.task.findUnique({ where: { id } })

  if (!existing) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  await prisma.task.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
