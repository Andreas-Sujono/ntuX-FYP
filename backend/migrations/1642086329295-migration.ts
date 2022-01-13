/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642086329295 implements MigrationInterface {
    name = 'migration1642086329295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c7751280bd369915fddd890f799"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c7751280bd369915fddd890f799"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "portfolioId"`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "UQ_9d041c43c782a9135df1388ae16" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_9d041c43c782a9135df1388ae16"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "UQ_9d041c43c782a9135df1388ae16"`);
        await queryRunner.query(`ALTER TABLE "portfolio" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "portfolioId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c7751280bd369915fddd890f799" UNIQUE ("portfolioId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c7751280bd369915fddd890f799" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
