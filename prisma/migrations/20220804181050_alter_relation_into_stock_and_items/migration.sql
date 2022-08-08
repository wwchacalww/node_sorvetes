-- CreateTable
CREATE TABLE "_ItemsToStock" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemsToStock_AB_unique" ON "_ItemsToStock"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemsToStock_B_index" ON "_ItemsToStock"("B");

-- AddForeignKey
ALTER TABLE "_ItemsToStock" ADD CONSTRAINT "_ItemsToStock_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemsToStock" ADD CONSTRAINT "_ItemsToStock_B_fkey" FOREIGN KEY ("B") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
