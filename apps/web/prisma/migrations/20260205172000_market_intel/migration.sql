-- CreateTable
CREATE TABLE IF NOT EXISTS "MarketEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAtUtc" TIMESTAMP(3),
    "source" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "url" TEXT,
    "eventType" TEXT,
    "sentiment" TEXT,
    "crackScore" DOUBLE PRECISION NOT NULL,
    "bucket" TEXT,
    "topFactors" TEXT,
    "explanationJson" TEXT,

    CONSTRAINT "MarketEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MarketEvent_createdAt_idx" ON "MarketEvent"("createdAt");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MarketEvent_crackScore_idx" ON "MarketEvent"("crackScore");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MarketEvent_bucket_idx" ON "MarketEvent"("bucket");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "MarketEvent_url_key" ON "MarketEvent"("url");


-- CreateTable
CREATE TABLE IF NOT EXISTS "MarketTick" (
    "id" TEXT NOT NULL,
    "createdAtUtc" TIMESTAMP(3) NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "change" DOUBLE PRECISION,
    "changePct" DOUBLE PRECISION,
    "session" TEXT,

    CONSTRAINT "MarketTick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MarketTick_createdAtUtc_idx" ON "MarketTick"("createdAtUtc");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "MarketTick_symbol_createdAtUtc_idx" ON "MarketTick"("symbol", "createdAtUtc");
