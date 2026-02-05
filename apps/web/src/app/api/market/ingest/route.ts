import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type IngestEvent = {
  id: string;
  created_at_utc?: string;
  published_at_utc?: string | null;
  source?: string | null;
  title: string;
  summary?: string | null;
  url?: string | null;
  event_type?: string | null;
  sentiment?: string | null;
  crack_score: number;
  bucket?: string | null;
  top_factors?: string | null;
  explanation_json?: string | null;
};

type IngestTick = {
  id: string;
  created_at_utc: string;
  symbol: string;
  price?: number | null;
  change?: number | null;
  change_pct?: number | null;
  session?: string | null;
};

function requireToken(req: Request) {
  const expected = process.env.MARKET_INGEST_TOKEN;
  if (!expected) {
    return { ok: false as const, status: 500, msg: "MARKET_INGEST_TOKEN is not set" };
  }
  const got = req.headers.get("x-ingest-token") || "";
  if (got !== expected) {
    return { ok: false as const, status: 401, msg: "unauthorized" };
  }
  return { ok: true as const };
}

export async function POST(req: Request) {
  const auth = requireToken(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.msg }, { status: auth.status });
  }

  const body = (await req.json().catch(() => null)) as
    | { events?: IngestEvent[]; ticks?: IngestTick[] }
    | null;

  const events = Array.isArray(body?.events) ? body!.events : [];
  const ticks = Array.isArray(body?.ticks) ? body!.ticks : [];

  // Upsert events
  for (const e of events) {
    await prisma.marketEvent.upsert({
      where: { id: e.id },
      create: {
        id: e.id,
        createdAt: new Date(e.created_at_utc || new Date().toISOString()),
        publishedAtUtc: e.published_at_utc ? new Date(e.published_at_utc) : null,
        source: e.source ?? null,
        title: e.title,
        summary: e.summary ?? null,
        url: e.url ?? null,
        eventType: e.event_type ?? null,
        sentiment: e.sentiment ?? null,
        crackScore: Number(e.crack_score),
        bucket: e.bucket ?? null,
        topFactors: e.top_factors ?? null,
        explanationJson: e.explanation_json ?? null,
      },
      update: {
        publishedAtUtc: e.published_at_utc ? new Date(e.published_at_utc) : null,
        source: e.source ?? null,
        title: e.title,
        summary: e.summary ?? null,
        url: e.url ?? null,
        eventType: e.event_type ?? null,
        sentiment: e.sentiment ?? null,
        crackScore: Number(e.crack_score),
        bucket: e.bucket ?? null,
        topFactors: e.top_factors ?? null,
        explanationJson: e.explanation_json ?? null,
      },
    });
  }

  // Insert ticks (id is deterministic from the bot, so upsert is safe)
  for (const t of ticks) {
    await prisma.marketTick.upsert({
      where: { id: t.id },
      create: {
        id: t.id,
        createdAtUtc: new Date(t.created_at_utc),
        symbol: t.symbol,
        price: t.price ?? null,
        change: t.change ?? null,
        changePct: t.change_pct ?? null,
        session: t.session ?? null,
      },
      update: {
        createdAtUtc: new Date(t.created_at_utc),
        symbol: t.symbol,
        price: t.price ?? null,
        change: t.change ?? null,
        changePct: t.change_pct ?? null,
        session: t.session ?? null,
      },
    });
  }

  return NextResponse.json({ ok: true, events: events.length, ticks: ticks.length });
}
