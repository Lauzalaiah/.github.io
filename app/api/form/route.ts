import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const name = (formData.get('name') || '').toString()
    const instagram = (formData.get('instagram') || '').toString()
    const email = (formData.get('email') || '').toString()

    const text = `${name} | ${instagram} | ${email}`

    // DEBUG (tu peux voir ça dans logs Vercel)
    console.log('FORM RECEIVED:', { name, instagram, email })

    return NextResponse.json({
      status: 'ok',
      name,
      instagram,
      email,
      text
    })

  } catch (error: any) {
    console.error('ERROR:', error)

    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}