/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640967045894 implements MigrationInterface {
    name = 'migration1640967045894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_announcement" ADD "status" character varying DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE "course_announcement" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "course_announcement" ADD "metadata" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_announcement" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "course_announcement" ADD "metadata" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course_announcement" DROP COLUMN "status"`);
    }

}
