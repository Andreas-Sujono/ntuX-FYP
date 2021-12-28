/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640704185040 implements MigrationInterface {
    name = 'migration1640704185040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_website_activity" ("id" SERIAL NOT NULL, "date" date NOT NULL, "visitWithoutLogin" integer DEFAULT '0', "visitWithLogin" integer DEFAULT '0', "totalQuestion" integer DEFAULT '0', "totalAnswer" integer DEFAULT '0', "totalTutorRequest" integer DEFAULT '0', "totalTutorRequestAccepted" integer DEFAULT '0', "userId" integer, CONSTRAINT "PK_bcaf4aa43116af948aa1b3ee61a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "avatar_shop" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "imageUrl" character varying NOT NULL, "pointsRequired" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_8666b0a4ae2873d4be8d25d76f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalPointsGet"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalExpsGet"`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalPointsGet" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalExpsGet" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarColor" character varying DEFAULT '#f44336'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarId" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalPointsRequired" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalExpsRequired" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "isDefault" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "student_website_activity" ADD CONSTRAINT "FK_e4f4b4b6d19d9ca78d05559dd31" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "avatar_shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`);
        await queryRunner.query(`ALTER TABLE "student_website_activity" DROP CONSTRAINT "FK_e4f4b4b6d19d9ca78d05559dd31"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "isDefault"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalExpsRequired"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalPointsRequired"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarColor"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalExpsGet"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalPointsGet"`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalExpsGet" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalPointsGet" integer`);
        await queryRunner.query(`DROP TABLE "avatar_shop"`);
        await queryRunner.query(`DROP TABLE "student_website_activity"`);
    }

}
