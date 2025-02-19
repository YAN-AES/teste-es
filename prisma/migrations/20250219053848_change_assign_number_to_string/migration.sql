-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artistId" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Assign" ("artistId", "cep", "city", "contractor", "createdAt", "eventDate", "id", "neighborhood", "number", "state", "street") SELECT "artistId", "cep", "city", "contractor", "createdAt", "eventDate", "id", "neighborhood", "number", "state", "street" FROM "Assign";
DROP TABLE "Assign";
ALTER TABLE "new_Assign" RENAME TO "Assign";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
