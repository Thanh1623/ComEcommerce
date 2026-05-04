import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { OrderStatus } from '@prisma/client';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, total, items } = body;

    if (!name || !phone || !address || total === undefined || !items) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        name,
        phone,
        address,
        total,
        items,
      },
    });

    // Send email notification
    if (resend) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'nguyenduythanh1623@gmail.com',
        subject: `Đơn hàng mới từ ${name}`,
        html: `
          <h1>Đơn hàng mới!</h1>
          <p><strong>Khách hàng:</strong> ${name}</p>
          <p><strong>Điện thoại:</strong> ${phone}</p>
          <p><strong>Địa chỉ:</strong> ${address}</p>
          <h3>Sản phẩm:</h3>
          <ul>
            ${items.map((i: any) => `<li>${i.name} x ${i.quantity}</li>`).join('')}
          </ul>
          <p><strong>Tổng tiền:</strong> ${total.toLocaleString('vi-VN')} đ</p>
        `,
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return NextResponse.json({ error: `Không thể tạo đơn hàng: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    console.log('PATCH request body:', body);
    const { id, status } = body;
    
    // Explicitly cast to OrderStatus enum
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus, updatedAt: new Date() },
    });
    
    // Ensure Date objects are serialized properly for JSON
    const serializedOrder = {
      ...updatedOrder,
      createdAt: updatedOrder.createdAt.toISOString(),
      updatedAt: updatedOrder.updatedAt.toISOString(),
    };

    console.log('Order updated successfully:', serializedOrder);
    return NextResponse.json(serializedOrder);
  } catch (error) {
    console.error('Lỗi chi tiết khi cập nhật đơn hàng:', error);
    return NextResponse.json(
      { error: `Failed to update order: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.order.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Order deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
