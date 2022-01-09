/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1641742639438 implements MigrationInterface {
    name = 'migration1641742639438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goal_task" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goal_task" DROP COLUMN "image"`);
    }

}
