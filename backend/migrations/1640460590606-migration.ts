/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640460590606 implements MigrationInterface {
    name = 'migration1640460590606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "premium_setting" ("id" SERIAL NOT NULL, "premiumPortfolioEnabled" boolean DEFAULT false, "pointMultiplier" integer DEFAULT '1', "expMultiplier" integer DEFAULT '1', "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "premiumPortfolioExpiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "pointMultiplierExpiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "expMultiplierExpiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e6e41b381c03a7045dc55eb300b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageUrl" character varying, "description" character varying DEFAULT '', "objectives" character varying DEFAULT '', "outline" character varying DEFAULT '', "totalHours" integer, "status" character varying NOT NULL DEFAULT 'DRAFT', "code" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "profileImageUrl" character varying, "fullName" character varying NOT NULL, "givenName" character varying NOT NULL, "familyName" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "salutation" character varying, "nationality" character varying, "citizenship" character varying, "NRIC" character varying, "dateOfBirth" TIMESTAMP WITH TIME ZONE, "role" character varying NOT NULL DEFAULT 'STUDENT', "isActive" boolean DEFAULT true, "confirmationCode" character varying, "codeExpiresAt" TIMESTAMP WITH TIME ZONE, "totalPoints" integer DEFAULT '0', "totalExps" integer DEFAULT '0', "level" integer DEFAULT '1', "emailVerifiesAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "goal_task" ("id" SERIAL NOT NULL, "taskName" character varying NOT NULL, "points" integer DEFAULT '0', "exps" integer DEFAULT '0', "deadline" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f839a62b05b5a593f990354a2b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "point_events" ("id" SERIAL NOT NULL, "eventType" character varying NOT NULL, "description" character varying, "points" integer DEFAULT '0', "exps" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, CONSTRAINT "PK_14cbd6b4e90db5df8728df1ce94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "isPublished" boolean DEFAULT false, "jobRole" character varying NOT NULL, "profileImageUrl" character varying, "description" character varying, "templateId" character varying, "resumeLink" character varying, "socialMediasJson" json, "educationsJSON" json, "workExperiencesJSON" json, "projectsJSON" json, "certificatesJSON" json, "skillsJSON" json, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "imageUrl" character varying, "totalPointsGet" integer, "totalExpsGet" integer, "isPublished" boolean DEFAULT false, "islimitedOnePerStudent" boolean DEFAULT false, "totalLimit" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward_redeemed" ("id" SERIAL NOT NULL, "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "rewardId" integer, CONSTRAINT "PK_41fde04799c7ecb30c0f5577fd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "website_activity" ("id" SERIAL NOT NULL, "date" date NOT NULL, "visitWithoutLogin" integer DEFAULT '0', "visitWithLogin" integer DEFAULT '0', "totalQuestion" integer DEFAULT '0', "totalAnswer" integer DEFAULT '0', "totalTutorRequest" integer DEFAULT '0', "totalTutorRequestAccepted" integer DEFAULT '0', CONSTRAINT "PK_1ddd7d5d2a9a3bbf9239650b6ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_batch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "registrationStartsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "registrationEndsAt" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL DEFAULT 'DRAFT', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, CONSTRAINT "PK_99cd950985e25a70866bb9452bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_announcement" ("id" SERIAL NOT NULL, "metadata" character varying NOT NULL, "isSendingEmail" boolean DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_45de69eb3bfd84f866076a5342e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_content" ("id" SERIAL NOT NULL, "pageName" character varying NOT NULL, "pageId" character varying NOT NULL, "pageOrder" integer NOT NULL, "metadata" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_b5408ca87e293be3f489c1c5c81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_registration" ("id" SERIAL NOT NULL, "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "courseId" integer, "courseBatchId" integer, CONSTRAINT "PK_342432d731cbe6b4155174c5c4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_user" ("id" SERIAL NOT NULL, "activity" json, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "courseId" integer, "userId" integer, "courseBatchId" integer, "studentRegistrationId" integer, CONSTRAINT "PK_bb2c8374d6f04bf9301895d1b33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "color" character varying DEFAULT 'rgb(119, 236, 83)', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_5e66751897301a201d28c9c601c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_question" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "upvote" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "parentQuestionId" integer, CONSTRAINT "PK_9187833d5a275d6605b907c9f65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_answer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "upvote" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "questionId" integer, "parentAnswerId" integer, CONSTRAINT "PK_0066ceb7eddb5c9ec03763cd41a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor" ("id" SERIAL NOT NULL, "isActive" boolean DEFAULT true, "rating" integer, "totalStudent" integer DEFAULT '0', "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_984f6d98173bd54eb367e727491" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor_request" ("id" SERIAL NOT NULL, "description" character varying, "meetingLink" character varying, "meetingAt" TIMESTAMP WITH TIME ZONE, "duration" integer, "status" character varying DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "tutorId" integer, CONSTRAINT "PK_a9307c06b0f93cfca35b4c917f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_lecturers_user" ("courseId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_40f11ece5638bdd390a7f349b63" PRIMARY KEY ("courseId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3b6a9cab6798d768c6cd389d02" ON "course_lecturers_user" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78e99e759efc3024dc275b5733" ON "course_lecturers_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "forum_tag_questions_forum_question" ("forumTagId" integer NOT NULL, "forumQuestionId" integer NOT NULL, CONSTRAINT "PK_072c1d735eb755c68b8b19bc06a" PRIMARY KEY ("forumTagId", "forumQuestionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f61191005af52cd88ddbf6bb92" ON "forum_tag_questions_forum_question" ("forumTagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b51019f602b831fc8cbecafc44" ON "forum_tag_questions_forum_question" ("forumQuestionId") `);
        await queryRunner.query(`ALTER TABLE "point_events" ADD CONSTRAINT "FK_d89e93d24fd1d04b88456b61d57" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" ADD CONSTRAINT "FK_9b3f97d5a13b9fb4bb18c05ec75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" ADD CONSTRAINT "FK_014f9860a9831197b4ace6ec244" FOREIGN KEY ("rewardId") REFERENCES "reward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "forum_question" ADD CONSTRAINT "FK_5ee9023724707b069cb9829d4c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_question" ADD CONSTRAINT "FK_032dc46e3a095a9259556739b22" FOREIGN KEY ("parentQuestionId") REFERENCES "forum_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD CONSTRAINT "FK_88ea54b3d136e65c47598a61485" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD CONSTRAINT "FK_4dc02659009e258bc669d978704" FOREIGN KEY ("questionId") REFERENCES "forum_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forum_answer" ADD CONSTRAINT "FK_0e0ab55ecb1133f146ea6e59794" FOREIGN KEY ("parentAnswerId") REFERENCES "forum_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_request" ADD CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_request" ADD CONSTRAINT "FK_5a7c7436cf9e6d5ff2ac32c5512" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" ADD CONSTRAINT "FK_3b6a9cab6798d768c6cd389d020" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" ADD CONSTRAINT "FK_78e99e759efc3024dc275b57334" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" ADD CONSTRAINT "FK_f61191005af52cd88ddbf6bb92d" FOREIGN KEY ("forumTagId") REFERENCES "forum_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" ADD CONSTRAINT "FK_b51019f602b831fc8cbecafc44a" FOREIGN KEY ("forumQuestionId") REFERENCES "forum_question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" DROP CONSTRAINT "FK_b51019f602b831fc8cbecafc44a"`);
        await queryRunner.query(`ALTER TABLE "forum_tag_questions_forum_question" DROP CONSTRAINT "FK_f61191005af52cd88ddbf6bb92d"`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" DROP CONSTRAINT "FK_78e99e759efc3024dc275b57334"`);
        await queryRunner.query(`ALTER TABLE "course_lecturers_user" DROP CONSTRAINT "FK_3b6a9cab6798d768c6cd389d020"`);
        await queryRunner.query(`ALTER TABLE "tutor_request" DROP CONSTRAINT "FK_5a7c7436cf9e6d5ff2ac32c5512"`);
        await queryRunner.query(`ALTER TABLE "tutor_request" DROP CONSTRAINT "FK_c7d4e2d5e2f44ee12777409f82a"`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP CONSTRAINT "FK_0e0ab55ecb1133f146ea6e59794"`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP CONSTRAINT "FK_4dc02659009e258bc669d978704"`);
        await queryRunner.query(`ALTER TABLE "forum_answer" DROP CONSTRAINT "FK_88ea54b3d136e65c47598a61485"`);
        await queryRunner.query(`ALTER TABLE "forum_question" DROP CONSTRAINT "FK_032dc46e3a095a9259556739b22"`);
        await queryRunner.query(`ALTER TABLE "forum_question" DROP CONSTRAINT "FK_5ee9023724707b069cb9829d4c9"`);
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
        await queryRunner.query(`ALTER TABLE "reward_redeemed" DROP CONSTRAINT "FK_014f9860a9831197b4ace6ec244"`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" DROP CONSTRAINT "FK_9b3f97d5a13b9fb4bb18c05ec75"`);
        await queryRunner.query(`ALTER TABLE "point_events" DROP CONSTRAINT "FK_d89e93d24fd1d04b88456b61d57"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b51019f602b831fc8cbecafc44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f61191005af52cd88ddbf6bb92"`);
        await queryRunner.query(`DROP TABLE "forum_tag_questions_forum_question"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78e99e759efc3024dc275b5733"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b6a9cab6798d768c6cd389d02"`);
        await queryRunner.query(`DROP TABLE "course_lecturers_user"`);
        await queryRunner.query(`DROP TABLE "tutor_request"`);
        await queryRunner.query(`DROP TABLE "tutor"`);
        await queryRunner.query(`DROP TABLE "forum_answer"`);
        await queryRunner.query(`DROP TABLE "forum_question"`);
        await queryRunner.query(`DROP TABLE "forum_tag"`);
        await queryRunner.query(`DROP TABLE "course_user"`);
        await queryRunner.query(`DROP TABLE "student_registration"`);
        await queryRunner.query(`DROP TABLE "course_content"`);
        await queryRunner.query(`DROP TABLE "course_announcement"`);
        await queryRunner.query(`DROP TABLE "course_batch"`);
        await queryRunner.query(`DROP TABLE "website_activity"`);
        await queryRunner.query(`DROP TABLE "reward_redeemed"`);
        await queryRunner.query(`DROP TABLE "reward"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "point_events"`);
        await queryRunner.query(`DROP TABLE "goal_task"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "premium_setting"`);
    }

}
