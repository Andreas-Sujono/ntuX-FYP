/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1641738588918 implements MigrationInterface {
    name = 'migration1641738588918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" DROP CONSTRAINT "FK_b51019f602b831fc8cbecafc44a"`);
        await queryRunner.query(`CREATE TABLE "goal_task_users_user" ("goalTaskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_fe9ddb19a118ed63881d7d85554" PRIMARY KEY ("goalTaskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9684ee64459eb3c2a5b654e176" ON "goal_task_users_user" ("goalTaskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_757ffdaf81839d2c4d60d80cd1" ON "goal_task_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "goal_task" ADD "moduleType" character varying`);
        await queryRunner.query(`ALTER TABLE "goal_task" ADD "taskType" character varying`);
        await queryRunner.query(`ALTER TABLE "goal_task" ADD "level" integer DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "goal_task" ADD "quantity" integer DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLoginAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "goal_task_users_user" ADD CONSTRAINT "FK_9684ee64459eb3c2a5b654e176b" FOREIGN KEY ("goalTaskId") REFERENCES "goal_task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "goal_task_users_user" ADD CONSTRAINT "FK_757ffdaf81839d2c4d60d80cd18" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" ADD CONSTRAINT "FK_b51019f602b831fc8cbecafc44a" FOREIGN KEY ("forumQuestionId") REFERENCES "forum_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" DROP CONSTRAINT "FK_b51019f602b831fc8cbecafc44a"`);
        await queryRunner.query(`ALTER TABLE "goal_task_users_user" DROP CONSTRAINT "FK_757ffdaf81839d2c4d60d80cd18"`);
        await queryRunner.query(`ALTER TABLE "goal_task_users_user" DROP CONSTRAINT "FK_9684ee64459eb3c2a5b654e176b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLoginAt"`);
        await queryRunner.query(`ALTER TABLE "goal_task" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "goal_task" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "goal_task" DROP COLUMN "taskType"`);
        await queryRunner.query(`ALTER TABLE "goal_task" DROP COLUMN "moduleType"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_757ffdaf81839d2c4d60d80cd1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9684ee64459eb3c2a5b654e176"`);
        await queryRunner.query(`DROP TABLE "goal_task_users_user"`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" ADD CONSTRAINT "FK_b51019f602b831fc8cbecafc44a" FOREIGN KEY ("forumQuestionId") REFERENCES "forum_question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
