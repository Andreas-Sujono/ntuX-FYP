/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640438600616 implements MigrationInterface {
    name = 'migration1640438600616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "goal_task" ("id" SERIAL NOT NULL, "taskName" character varying NOT NULL, "points" integer DEFAULT '0', "exps" integer DEFAULT '0', "deadline" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f839a62b05b5a593f990354a2b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "point_events" ("id" SERIAL NOT NULL, "eventType" character varying NOT NULL, "description" character varying, "points" integer DEFAULT '0', "exps" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, CONSTRAINT "PK_14cbd6b4e90db5df8728df1ce94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "isPublished" boolean DEFAULT false, "jobRole" character varying NOT NULL, "profileImageUrl" character varying, "description" character varying, "templateId" character varying, "resumeLink" character varying, "socialMediasJson" json, "educationsJSON" json, "workExperiencesJSON" json, "projectsJSON" json, "certificatesJSON" json, "skillsJSON" json, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "imageUrl" character varying, "totalPointsGet" integer, "totalExpsGet" integer, "isPublished" boolean DEFAULT false, "islimitedOnePerStudent" boolean DEFAULT false, "totalLimit" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward_redeemed" ("id" SERIAL NOT NULL, "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "rewardId" integer, CONSTRAINT "PK_41fde04799c7ecb30c0f5577fd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "website_activity" ("id" SERIAL NOT NULL, "date" date NOT NULL, "visitWithoutLogin" integer DEFAULT '0', "visitWithLogin" integer DEFAULT '0', "totalQuestion" integer DEFAULT '0', "totalAnswer" integer DEFAULT '0', "totalTutorRequest" integer DEFAULT '0', "totalTutorRequestAccepted" integer DEFAULT '0', CONSTRAINT "PK_1ddd7d5d2a9a3bbf9239650b6ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileImageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "totalPoints" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "totalExps" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "level" integer DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nationality" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "citizenship" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'STUDENT'`);
        await queryRunner.query(`ALTER TABLE "course_batch" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE "point_events" ADD CONSTRAINT "FK_d89e93d24fd1d04b88456b61d57" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" ADD CONSTRAINT "FK_9b3f97d5a13b9fb4bb18c05ec75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" ADD CONSTRAINT "FK_014f9860a9831197b4ace6ec244" FOREIGN KEY ("rewardId") REFERENCES "reward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reward_redeemed" DROP CONSTRAINT "FK_014f9860a9831197b4ace6ec244"`);
        await queryRunner.query(`ALTER TABLE "reward_redeemed" DROP CONSTRAINT "FK_9b3f97d5a13b9fb4bb18c05ec75"`);
        await queryRunner.query(`ALTER TABLE "point_events" DROP CONSTRAINT "FK_d89e93d24fd1d04b88456b61d57"`);
        await queryRunner.query(`ALTER TABLE "course_batch" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "citizenship" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nationality" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "totalExps"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "totalPoints"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileImageUrl"`);
        await queryRunner.query(`DROP TABLE "website_activity"`);
        await queryRunner.query(`DROP TABLE "reward_redeemed"`);
        await queryRunner.query(`DROP TABLE "reward"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "point_events"`);
        await queryRunner.query(`DROP TABLE "goal_task"`);
    }

}
