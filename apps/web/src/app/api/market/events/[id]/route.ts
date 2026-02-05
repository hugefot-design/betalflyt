import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const row = await prisma.marketEvent.findUnique({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      publishedAtUtc: true,
      source: true,
      title: true,
      summary: true,
      url: true,
      eventType: true,
      sentiment: true,
      crackScore: true,
      bucket: true,
      topFactors: true,
      explanationJson: true,
    },
  });

  if (!row) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, event: row });
}
