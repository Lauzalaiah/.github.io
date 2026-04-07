import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ test: 'ok' })
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get('name')?.toString() || ''
    const instagram = formData.get('instagram')?.toString() || ''
    const email = formData.get('email')?.toString() || ''

    return NextResponse.json({
      status: 'ok',
      data: { name, instagram, email }
    })

  } catch {
    return NextResponse.json(
      { status: 'error', message: 'server error' },
      { status: 500 }
    )
  }
}