import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 30), 500);
  const symbol = (searchParams.get("symbol") || "").trim();

  const where = symbol ? { symbol } : {};

  const rows = await prisma.marketTick.findMany({
    where,
    orderBy: { createdAtUtc: "desc" },
    take: isFinite(limit) ? limit : 30,
    select: {
      id: true,
      createdAtUtc: true,
      symbol: true,
      price: true,
      change: true,
      changePct: true,
      session: true,
    },
  });

  return NextResponse.json({ ok: true, ticks: rows });
}
