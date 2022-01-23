/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642436315488 implements MigrationInterface {
    name = 'migration1642436315488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tutor_courses_course" ("tutorId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_171f284eafbf68420f8e369d924" PRIMARY KEY ("tutorId", "courseId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_454d4e23c8dc3cd201dae03e3d" ON "tutor_courses_course" ("tutorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0654c2e5f985e35c1822e02d3f" ON "tutor_courses_course" ("courseId") `);
        await queryRunner.query(`ALTER TABLE "tutor_courses_course" ADD CONSTRAINT "FK_454d4e23c8dc3cd201dae03e3d7" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tutor_courses_course" ADD CONSTRAINT "FK_0654c2e5f985e35c1822e02d3fd" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_courses_course" DROP CONSTRAINT "FK_0654c2e5f985e35c1822e02d3fd"`);
        await queryRunner.query(`ALTER TABLE "tutor_courses_course" DROP CONSTRAINT "FK_454d4e23c8dc3cd201dae03e3d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0654c2e5f985e35c1822e02d3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_454d4e23c8dc3cd201dae03e3d"`);
        await queryRunner.query(`DROP TABLE "tutor_courses_course"`);
    }

}
