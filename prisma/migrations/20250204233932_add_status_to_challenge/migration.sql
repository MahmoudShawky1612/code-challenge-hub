-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "status" "ChallengeStatus" NOT NULL DEFAULT 'OPEN';
