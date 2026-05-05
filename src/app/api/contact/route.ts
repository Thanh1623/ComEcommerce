import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    // TODO: Implement email sending logic here (e.g., using nodemailer, Resend, SendGrid)
    console.log('Received contact request:', { name, phone });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
