/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1643037965429 implements MigrationInterface {
    name = 'migration1643037965429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_review" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "tutor_review" ADD "rating" double precision`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "rating" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD "rating" integer`);
        await queryRunner.query(`ALTER TABLE "tutor_review" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "tutor_review" ADD "rating" integer`);
    }

}
