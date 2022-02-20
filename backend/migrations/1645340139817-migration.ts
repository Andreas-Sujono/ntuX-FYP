/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1645340139817 implements MigrationInterface {
    name = 'migration1645340139817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_website_activity" ("id" SERIAL NOT NULL, "date" date NOT NULL, "visitWithLogin" integer DEFAULT '0', "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_3d11724b0f300f6eedb3b82f7f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_website_activity" ADD CONSTRAINT "FK_b6a4bfa3adf176e3b05472a4b9e" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_website_activity" ADD CONSTRAINT "FK_0c989f08ed3ae935bef0d95b81b" FOREIGN KEY ("courseBatchId") REFERENCES "course_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_website_activity" DROP CONSTRAINT "FK_0c989f08ed3ae935bef0d95b81b"`);
        await queryRunner.query(`ALTER TABLE "course_website_activity" DROP CONSTRAINT "FK_b6a4bfa3adf176e3b05472a4b9e"`);
        await queryRunner.query(`DROP TABLE "course_website_activity"`);
    }

}
