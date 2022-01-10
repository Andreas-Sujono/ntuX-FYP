/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1641823339726 implements MigrationInterface {
    name = 'migration1641823339726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "theme" character varying DEFAULT 'DEFAULT'`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "hideNav" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "portfolioId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c7751280bd369915fddd890f799" UNIQUE ("portfolioId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c7751280bd369915fddd890f799" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c7751280bd369915fddd890f799"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c7751280bd369915fddd890f799"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "portfolioId"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "hideNav"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "theme"`);
    }

}
