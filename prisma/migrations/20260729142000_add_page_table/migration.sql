-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageKey" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "seo" TEXT NOT NULL,
    "sections" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_pageKey_key" ON "Page"("pageKey");

-- CreateIndex
CREATE UNIQUE INDEX "Page_path_key" ON "Page"("path");
