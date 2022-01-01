/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1641063674968 implements MigrationInterface {
    name = 'migration1641063674968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "jobRole" character varying`);
        await queryRunner.query(`ALTER TABLE "forum_question" ADD "metadata" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD "metadata" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forum_question" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forum_question" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ALTER COLUMN "description" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forum_answer" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forum_question" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forum_question" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "forum_question" DROP COLUMN "metadata"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "jobRole"`);
    }

}
