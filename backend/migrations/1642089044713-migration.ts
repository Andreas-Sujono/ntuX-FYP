/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642089044713 implements MigrationInterface {
    name = 'migration1642089044713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_request" ADD "courseId" integer`);
        await queryRunner.query(`ALTER TABLE "tutor_request" ADD CONSTRAINT "FK_4dd4486eba8bcf5057335fc4218" FOREIGN KEY ("courseId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_request" DROP CONSTRAINT "FK_4dd4486eba8bcf5057335fc4218"`);
        await queryRunner.query(`ALTER TABLE "tutor_request" DROP COLUMN "courseId"`);
    }

}
