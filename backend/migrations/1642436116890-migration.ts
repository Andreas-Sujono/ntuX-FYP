/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642436116890 implements MigrationInterface {
    name = 'migration1642436116890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD CONSTRAINT "UQ_6a8a2d8e7d39c22e48b1c63de90" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "tutor" ADD CONSTRAINT "FK_6a8a2d8e7d39c22e48b1c63de90" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor" DROP CONSTRAINT "FK_6a8a2d8e7d39c22e48b1c63de90"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP CONSTRAINT "UQ_6a8a2d8e7d39c22e48b1c63de90"`);
        await queryRunner.query(`ALTER TABLE "tutor" DROP COLUMN "userId"`);
    }

}
