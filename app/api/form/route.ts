import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = formData.get('name')
    const instagram = formData.get('instagram')
    const email = formData.get('email')

    console.log('FORM DATA:', { name, instagram, email })

    return NextResponse.json({
      status: 'ok',
      name: name ? String(name) : '',
      instagram: instagram ? String(instagram) : '',
      email: email ? String(email) : ''
    })

  } catch (error: any) {
    console.error('REAL ERROR:', error)

    return NextResponse.json(
      {
        status: 'error',
        message: error?.message,
        stack: error?.stack
      },
      { status: 500 }
    )
  }
}