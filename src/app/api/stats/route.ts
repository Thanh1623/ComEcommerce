import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear, format, subDays, subWeeks, subMonths, subQuarters, subYears } from 'date-fns';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'week'; // Default to week

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'day': startDate = subDays(now, 7); break;
      case 'month': startDate = subMonths(now, 6); break;
      case 'quarter': startDate = subQuarters(now, 4); break;
      case 'year': startDate = subYears(now, 2); break;
      case 'week':
      default:
        startDate = subWeeks(now, 4);
    }

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: startDate } },
      select: { total: true, createdAt: true },
    });

    // Helper to group by format
    const formatStr = period === 'day' ? 'yyyy-MM-dd' : period === 'week' ? 'yyyy-ww' : period === 'month' ? 'yyyy-MM' : period === 'quarter' ? 'yyyy-Qq' : 'yyyy';
    
    const statsByPeriod: Record<string, number> = {};
    orders.forEach(order => {
      const key = format(order.createdAt, formatStr);
      statsByPeriod[key] = (statsByPeriod[key] || 0) + order.total;
    });

    const chartData = Object.entries(statsByPeriod).map(([date, revenue]) => ({
      date,
      revenue,
    })).sort((a, b) => a.date.localeCompare(b.date));

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      totalRevenue,
      orderCount: orders.length,
      chartData,
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
