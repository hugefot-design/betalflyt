import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
  const minScore = Number(searchParams.get("minScore") || 0);

  const rows = await prisma.marketEvent.findMany({
    where: {
      crackScore: { gte: isFinite(minScore) ? minScore : 0 },
    },
    orderBy: { createdAt: "desc" },
    take: isFinite(limit) ? limit : 50,
    select: {
      id: true,
      createdAt: true,
      publishedAtUtc: true,
      source: true,
      title: true,
      url: true,
      crackScore: true,
      bucket: true,
      topFactors: true,
    },
  });

  return NextResponse.json({ ok: true, events: rows });
}
