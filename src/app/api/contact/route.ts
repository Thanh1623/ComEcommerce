import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone } = body;

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Hoặc email đã domain verified của bạn
      to: 'nguyenduythanh1623@gmail.com',
      subject: 'Yêu cầu liên hệ mới từ Website',
      html: `
        <h2>Yêu cầu liên hệ mới</h2>
        <p><strong>Tên:</strong> ${name}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
      `,
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
