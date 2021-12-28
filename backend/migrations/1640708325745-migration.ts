/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640708325745 implements MigrationInterface {
    name = 'migration1640708325745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" DROP CONSTRAINT "FK_78e99e759efc3024dc275b57334"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "premiumSettingId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7756ffa80e7a6505ee716999eb2" UNIQUE ("premiumSettingId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7756ffa80e7a6505ee716999eb2" FOREIGN KEY ("premiumSettingId") REFERENCES "premium_setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" ADD CONSTRAINT "FK_78e99e759efc3024dc275b57334" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" DROP CONSTRAINT "FK_78e99e759efc3024dc275b57334"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7756ffa80e7a6505ee716999eb2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7756ffa80e7a6505ee716999eb2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "premiumSettingId"`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" ADD CONSTRAINT "FK_78e99e759efc3024dc275b57334" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
