import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, total } = body;

    if (!name || !phone || !address || total === undefined) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        name,
        phone,
        address,
        total,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return NextResponse.json({ error: 'Không thể tạo đơn hàng' }, { status: 500 });
  }
}
