import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        total: true,
        createdAt: true,
        status: true,
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;

    // Group by date for chart (simple last 7 days)
    const statsByDate: Record<string, number> = {};
    orders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0];
      statsByDate[date] = (statsByDate[date] || 0) + order.total;
    });

    const chartData = Object.entries(statsByDate).map(([date, revenue]) => ({
      date,
      revenue,
    })).sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      totalRevenue,
      orderCount,
      chartData,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
