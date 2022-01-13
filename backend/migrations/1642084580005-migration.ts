/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642084580005 implements MigrationInterface {
    name = 'migration1642084580005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7756ffa80e7a6505ee716999eb2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7756ffa80e7a6505ee716999eb2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "premiumSettingId"`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ADD CONSTRAINT "UQ_e0cb6a14b2afb1dc21aab05b07d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "premium_setting" ADD CONSTRAINT "FK_e0cb6a14b2afb1dc21aab05b07d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "premium_setting" DROP CONSTRAINT "FK_e0cb6a14b2afb1dc21aab05b07d"`);
        await queryRunner.query(`ALTER TABLE "premium_setting" DROP CONSTRAINT "UQ_e0cb6a14b2afb1dc21aab05b07d"`);
        await queryRunner.query(`ALTER TABLE "premium_setting" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "premiumSettingId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7756ffa80e7a6505ee716999eb2" UNIQUE ("premiumSettingId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7756ffa80e7a6505ee716999eb2" FOREIGN KEY ("premiumSettingId") REFERENCES "premium_setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
