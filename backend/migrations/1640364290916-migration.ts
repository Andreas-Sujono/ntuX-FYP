/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640364290916 implements MigrationInterface {
    name = 'migration1640364290916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageUrl" character varying, "description" character varying DEFAULT '', "objectives" character varying DEFAULT '', "outline" character varying DEFAULT '', "status" character varying NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_batch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "registrationStartsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "registrationEndsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, CONSTRAINT "PK_99cd950985e25a70866bb9452bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_announcement" ("id" SERIAL NOT NULL, "metadata" character varying NOT NULL, "isSendingEmail" boolean DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_45de69eb3bfd84f866076a5342e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_content" ("id" SERIAL NOT NULL, "pageName" character varying NOT NULL, "pageId" character varying NOT NULL, "pageOrder" integer NOT NULL, "metadata" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_b5408ca87e293be3f489c1c5c81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_registration" ("id" SERIAL NOT NULL, "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_342432d731cbe6b4155174c5c4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_user" ("id" SERIAL NOT NULL, "activity" json, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, "userId" integer, "courseBatchId" integer, "studentRegistrationId" integer, CONSTRAINT "PK_bb2c8374d6f04bf9301895d1b33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_lecturers_user" ("courseId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_40f11ece5638bdd390a7f349b63" PRIMARY KEY ("courseId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3b6a9cab6798d768c6cd389d02" ON "course_lecturers_user" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78e99e759efc3024dc275b5733" ON "course_lecturers_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "course_batch" ADD CONSTRAINT "FK_873d8c693a6eecd1889ff3e4500" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_announcement" ADD CONSTRAINT "FK_5334cc847dbce101708eaf83948" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_announcement" ADD CONSTRAINT "FK_6ede8c5191a663508ab65c0a128" FOREIGN KEY ("courseBatchId") REFERENCES "course_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_content" ADD CONSTRAINT "FK_f576cd9875b81147fa515f68b56" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_content" ADD CONSTRAINT "FK_1f75c316ca05e73db9aa62c453e" FOREIGN KEY ("courseBatchId") REFERENCES "course_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_registration" ADD CONSTRAINT "FK_aee770f95b61e929342f6a764e9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_registration" ADD CONSTRAINT "FK_085b04420f39c189c292f15a91e" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_registration" ADD CONSTRAINT "FK_185281d10271f1236d8198226a6" FOREIGN KEY ("courseBatchId") REFERENCES "course_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_user" ADD CONSTRAINT "FK_70824fef35e6038e459e58e0358" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_user" ADD CONSTRAINT "FK_062e03d78da22a7bd9becbfaaac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_user" ADD CONSTRAINT "FK_5caa49fbe1551c1a1b558b2cd76" FOREIGN KEY ("courseBatchId") REFERENCES "course_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_user" ADD CONSTRAINT "FK_28e5a33fdc34b90051ef2ef4619" FOREIGN KEY ("studentRegistrationId") REFERENCES "student_registration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" ADD CONSTRAINT "FK_3b6a9cab6798d768c6cd389d020" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" ADD CONSTRAINT "FK_78e99e759efc3024dc275b57334" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" DROP CONSTRAINT "FK_78e99e759efc3024dc275b57334"`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" DROP CONSTRAINT "FK_3b6a9cab6798d768c6cd389d020"`);
        await queryRunner.query(`ALTER TABLE "course_user" DROP CONSTRAINT "FK_28e5a33fdc34b90051ef2ef4619"`);
        await queryRunner.query(`ALTER TABLE "course_user" DROP CONSTRAINT "FK_5caa49fbe1551c1a1b558b2cd76"`);
        await queryRunner.query(`ALTER TABLE "course_user" DROP CONSTRAINT "FK_062e03d78da22a7bd9becbfaaac"`);
        await queryRunner.query(`ALTER TABLE "course_user" DROP CONSTRAINT "FK_70824fef35e6038e459e58e0358"`);
        await queryRunner.query(`ALTER TABLE "student_registration" DROP CONSTRAINT "FK_185281d10271f1236d8198226a6"`);
        await queryRunner.query(`ALTER TABLE "student_registration" DROP CONSTRAINT "FK_085b04420f39c189c292f15a91e"`);
        await queryRunner.query(`ALTER TABLE "student_registration" DROP CONSTRAINT "FK_aee770f95b61e929342f6a764e9"`);
        await queryRunner.query(`ALTER TABLE "course_content" DROP CONSTRAINT "FK_1f75c316ca05e73db9aa62c453e"`);
        await queryRunner.query(`ALTER TABLE "course_content" DROP CONSTRAINT "FK_f576cd9875b81147fa515f68b56"`);
        await queryRunner.query(`ALTER TABLE "course_announcement" DROP CONSTRAINT "FK_6ede8c5191a663508ab65c0a128"`);
        await queryRunner.query(`ALTER TABLE "course_announcement" DROP CONSTRAINT "FK_5334cc847dbce101708eaf83948"`);
        await queryRunner.query(`ALTER TABLE "course_batch" DROP CONSTRAINT "FK_873d8c693a6eecd1889ff3e4500"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78e99e759efc3024dc275b5733"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b6a9cab6798d768c6cd389d02"`);
        await queryRunner.query(`DROP TABLE "course_lecturers_user"`);
        await queryRunner.query(`DROP TABLE "course_user"`);
        await queryRunner.query(`DROP TABLE "student_registration"`);
        await queryRunner.query(`DROP TABLE "course_content"`);
        await queryRunner.query(`DROP TABLE "course_announcement"`);
        await queryRunner.query(`DROP TABLE "course_batch"`);
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
