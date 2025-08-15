-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Link" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
