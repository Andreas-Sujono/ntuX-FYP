/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640953703808 implements MigrationInterface {
    name = 'migration1640953703808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward" ADD "redeemedCount" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" ADD "status" character varying DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward_redeemed" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "redeemedCount"`);
    }

}
