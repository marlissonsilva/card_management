-- CreateTable
CREATE TABLE "user" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "invoice_closing" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "member" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "purchase" (
    "uuid" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "date_purchase" TIMESTAMP(3) NOT NULL,
    "installments_count" INTEGER NOT NULL DEFAULT 1,
    "member_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "installment" (
    "uuid" TEXT NOT NULL,
    "purchase_uuid" TEXT NOT NULL,
    "installment_number" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "due_date" DATE NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "installment_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "idx_members_user" ON "member"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "unique_member_per_user" ON "member"("user_uuid", "uuid");

-- CreateIndex
CREATE INDEX "idx_purchases_member" ON "purchase"("member_uuid");

-- CreateIndex
CREATE INDEX "idx_installments_purchase" ON "installment"("purchase_uuid");

-- CreateIndex
CREATE INDEX "idx_installments_due_date" ON "installment"("due_date");

-- CreateIndex
CREATE UNIQUE INDEX "unique_installment_number" ON "installment"("purchase_uuid", "installment_number");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_member_uuid_fkey" FOREIGN KEY ("member_uuid") REFERENCES "member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installment" ADD CONSTRAINT "installment_purchase_uuid_fkey" FOREIGN KEY ("purchase_uuid") REFERENCES "purchase"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
