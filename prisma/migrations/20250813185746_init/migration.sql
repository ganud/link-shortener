-- CreateTable
CREATE TABLE "public"."Link" (
    "id" SERIAL NOT NULL,
    "alias" VARCHAR(20) NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_alias_key" ON "public"."Link"("alias");
