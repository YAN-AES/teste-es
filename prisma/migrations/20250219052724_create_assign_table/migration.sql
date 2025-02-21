-- CreateTable
CREATE TABLE "Assign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artistId" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
