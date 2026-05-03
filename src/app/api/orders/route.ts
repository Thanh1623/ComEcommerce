import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Lỗi khi fetch đơn hàng:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    console.log('PATCH request body:', body);
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Thiếu id hoặc status' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Lỗi khi update đơn hàng:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    
    if (!id) {
        return NextResponse.json({ error: 'Thiếu id' }, { status: 400 });
    }

    await prisma.order.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
