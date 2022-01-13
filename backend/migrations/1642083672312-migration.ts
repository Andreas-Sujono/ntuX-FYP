/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642083672312 implements MigrationInterface {
    name = 'migration1642083672312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "jobRole"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "templateId"`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "bannerImageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "bannerImageUrl"`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "templateId" character varying`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "jobRole" character varying NOT NULL`);
    }

}
