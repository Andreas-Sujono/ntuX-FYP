/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640456437992 implements MigrationInterface {
    name = 'migration1640456437992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "premium_setting" ("id" SERIAL NOT NULL, "premiumPortfolioEnabled" boolean DEFAULT false, "pointMultiplier" integer DEFAULT '1', "expMultiplier" integer DEFAULT '1', "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "premiumPortfolioExpiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "pointMultiplierExpiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "expMultiplierExpiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e6e41b381c03a7045dc55eb300b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "color" character varying DEFAULT 'rgb(119, 236, 83)', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_5e66751897301a201d28c9c601c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_question" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "upvote" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "parentQuestionId" integer, CONSTRAINT "PK_9187833d5a275d6605b907c9f65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_answer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "upvote" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "questionId" integer, "parentAnswerId" integer, CONSTRAINT "PK_0066ceb7eddb5c9ec03763cd41a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor" ("id" SERIAL NOT NULL, "isActive" boolean DEFAULT true, "rating" integer, "totalStudent" integer DEFAULT '0', "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_984f6d98173bd54eb367e727491" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor_request" ("id" SERIAL NOT NULL, "description" character varying, "meetingLink" character varying, "meetingAt" TIMESTAMP WITH TIME ZONE, "duration" integer, "status" character varying DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "tutorId" integer, CONSTRAINT "PK_a9307c06b0f93cfca35b4c917f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_tag_questions_forum_question" ("forumTagId" integer NOT NULL, "forumQuestionId" integer NOT NULL, CONSTRAINT "PK_072c1d735eb755c68b8b19bc06a" PRIMARY KEY ("forumTagId", "forumQuestionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f61191005af52cd88ddbf6bb92" ON "forum_tag_questions_forum_question" ("forumTagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b51019f602b831fc8cbecafc44" ON "forum_tag_questions_forum_question" ("forumQuestionId") `);
        await queryRunner.query(`ALTER TABLE "course" ADD "totalHours" integer`);
        await queryRunner.query(`ALTER TABLE "forum_question" ADD CONSTRAINT "FK_5ee9023724707b069cb9829d4c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_question" ADD CONSTRAINT "FK_032dc46e3a095a9259556739b22" FOREIGN KEY ("parentQuestionId") REFERENCES "forum_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD CONSTRAINT "FK_88ea54b3d136e65c47598a61485" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD CONSTRAINT "FK_4dc02659009e258bc669d978704" FOREIGN KEY ("questionId") REFERENCES "forum_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD CONSTRAINT "FK_0e0ab55ecb1133f146ea6e59794" FOREIGN KEY ("parentAnswerId") REFERENCES "forum_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_request" ADD CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_request" ADD CONSTRAINT "FK_5a7c7436cf9e6d5ff2ac32c5512" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" ADD CONSTRAINT "FK_f61191005af52cd88ddbf6bb92d" FOREIGN KEY ("forumTagId") REFERENCES "forum_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" ADD CONSTRAINT "FK_b51019f602b831fc8cbecafc44a" FOREIGN KEY ("forumQuestionId") REFERENCES "forum_question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" DROP CONSTRAINT "FK_b51019f602b831fc8cbecafc44a"`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" DROP CONSTRAINT "FK_f61191005af52cd88ddbf6bb92d"`);
        await queryRunner.query(`ALTER TABLE "tutor_request" DROP CONSTRAINT "FK_5a7c7436cf9e6d5ff2ac32c5512"`);
        await queryRunner.query(`ALTER TABLE "tutor_request" DROP CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a"`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP CONSTRAINT "FK_0e0ab55ecb1133f146ea6e59794"`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP CONSTRAINT "FK_4dc02659009e258bc669d978704"`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP CONSTRAINT "FK_88ea54b3d136e65c47598a61485"`);
        await queryRunner.query(`ALTER TABLE "forum_question" DROP CONSTRAINT "FK_032dc46e3a095a9259556739b22"`);
        await queryRunner.query(`ALTER TABLE "forum_question" DROP CONSTRAINT "FK_5ee9023724707b069cb9829d4c9"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "totalHours"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b51019f602b831fc8cbecafc44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f61191005af52cd88ddbf6bb92"`);
        await queryRunner.query(`DROP TABLE "forum_tag_questions_forum_question"`);
        await queryRunner.query(`DROP TABLE "tutor_request"`);
        await queryRunner.query(`DROP TABLE "tutor"`);
        await queryRunner.query(`DROP TABLE "forum_answer"`);
        await queryRunner.query(`DROP TABLE "forum_question"`);
        await queryRunner.query(`DROP TABLE "forum_tag"`);
        await queryRunner.query(`DROP TABLE "premium_setting"`);
    }

}
