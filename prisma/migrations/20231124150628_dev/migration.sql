/*
  Warnings:

  - You are about to drop the column `prcentage` on the `InsuranceType` table. All the data in the column will be lost.
  - You are about to drop the column `billsId` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the `SubTests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BillToTest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `percentage` to the `InsuranceType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubTestType" AS ENUM ('ONERESULT', 'DESCRIPTION', 'OPTIONS');

-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PENDING', 'CANCELLED', 'READY');

-- DropForeignKey
ALTER TABLE "SubTests" DROP CONSTRAINT "SubTests_testId_fkey";

-- DropForeignKey
ALTER TABLE "_BillToTest" DROP CONSTRAINT "_BillToTest_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillToTest" DROP CONSTRAINT "_BillToTest_B_fkey";

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "insuranceTypeId" TEXT,
ADD COLUMN     "status" "BillStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "subTotal" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InsuranceType" DROP COLUMN "prcentage",
ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "age" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "billsId";

-- DropTable
DROP TABLE "SubTests";

-- DropTable
DROP TABLE "_BillToTest";

-- DropEnum
DROP TYPE "SubTestype";

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "SubTestType" NOT NULL,
    "maleNormal" TEXT DEFAULT '',
    "femaleNormal" TEXT DEFAULT '',
    "result" TEXT,
    "description" TEXT,
    "selectedOption" TEXT,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "testId" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billTestId" TEXT,

    CONSTRAINT "SubTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubTestOption" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "subTestId" TEXT,
    "billSubTestId" TEXT,

    CONSTRAINT "SubTestOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "testId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billId" TEXT,

    CONSTRAINT "BillTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSubTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "SubTestType" NOT NULL,
    "maleNormal" TEXT DEFAULT '',
    "femaleNormal" TEXT DEFAULT '',
    "result" TEXT,
    "description" TEXT,
    "selectedOption" TEXT,
    "order" INTEGER NOT NULL,
    "billTestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subTestId" TEXT,

    CONSTRAINT "BillSubTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubTest_testId_idx" ON "SubTest"("testId");

-- CreateIndex
CREATE INDEX "SubTestOption_subTestId_idx" ON "SubTestOption"("subTestId");

-- AddForeignKey
ALTER TABLE "SubTest" ADD CONSTRAINT "SubTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTestOption" ADD CONSTRAINT "SubTestOption_subTestId_fkey" FOREIGN KEY ("subTestId") REFERENCES "SubTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTestOption" ADD CONSTRAINT "SubTestOption_billSubTestId_fkey" FOREIGN KEY ("billSubTestId") REFERENCES "BillSubTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_insuranceTypeId_fkey" FOREIGN KEY ("insuranceTypeId") REFERENCES "InsuranceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillTest" ADD CONSTRAINT "BillTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillTest" ADD CONSTRAINT "BillTest_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSubTest" ADD CONSTRAINT "BillSubTest_billTestId_fkey" FOREIGN KEY ("billTestId") REFERENCES "BillTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSubTest" ADD CONSTRAINT "BillSubTest_subTestId_fkey" FOREIGN KEY ("subTestId") REFERENCES "SubTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
