/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642084095508 implements MigrationInterface {
    name = 'migration1642084095508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "expiredAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "premiumPortfolioExpiredAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "pointMultiplierExpiredAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "expMultiplierExpiredAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "expMultiplierExpiredAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "pointMultiplierExpiredAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "premiumPortfolioExpiredAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ALTER COLUMN "expiredAt" SET NOT NULL`);
    }

}
