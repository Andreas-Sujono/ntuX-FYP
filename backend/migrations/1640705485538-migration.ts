/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640705485538 implements MigrationInterface {
    name = 'migration1640705485538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "avatar" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "imageUrl" character varying NOT NULL, "pointsRequired" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_50e36da9d45349941038eaf149d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_website_activity" ("id" SERIAL NOT NULL, "date" date NOT NULL, "visitWithoutLogin" integer DEFAULT '0', "visitWithLogin" integer DEFAULT '0', "totalQuestion" integer DEFAULT '0', "totalAnswer" integer DEFAULT '0', "totalTutorRequest" integer DEFAULT '0', "totalTutorRequestAccepted" integer DEFAULT '0', "userId" integer, CONSTRAINT "PK_bcaf4aa43116af948aa1b3ee61a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "avatar_users_user" ("avatarId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e732bedf591b1c785fbfdbbd97c" PRIMARY KEY ("avatarId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d21c3b931fff127b1fa1454fd8" ON "avatar_users_user" ("avatarId") `);
        await queryRunner.query(`CREATE INDEX "IDX_76887b2cf0b689d886ae07a33b" ON "avatar_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalExpsGet"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalPointsGet"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarColor" character varying DEFAULT '#f44336'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "currentAvatarId" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalPointsRequired" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalExpsRequired" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "isDefault" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6a3cfa1d647fe1dc68c10a6ab20" FOREIGN KEY ("currentAvatarId") REFERENCES "avatar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_website_activity" ADD CONSTRAINT "FK_e4f4b4b6d19d9ca78d05559dd31" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "avatar_users_user" ADD CONSTRAINT "FK_d21c3b931fff127b1fa1454fd87" FOREIGN KEY ("avatarId") REFERENCES "avatar"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "avatar_users_user" ADD CONSTRAINT "FK_76887b2cf0b689d886ae07a33b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatar_users_user" DROP CONSTRAINT "FK_76887b2cf0b689d886ae07a33b9"`);
        await queryRunner.query(`ALTER TABLE "avatar_users_user" DROP CONSTRAINT "FK_d21c3b931fff127b1fa1454fd87"`);
        await queryRunner.query(`ALTER TABLE "student_website_activity" DROP CONSTRAINT "FK_e4f4b4b6d19d9ca78d05559dd31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6a3cfa1d647fe1dc68c10a6ab20"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "isDefault"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalExpsRequired"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "totalPointsRequired"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currentAvatarId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarColor"`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalPointsGet" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "totalExpsGet" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76887b2cf0b689d886ae07a33b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d21c3b931fff127b1fa1454fd8"`);
        await queryRunner.query(`DROP TABLE "avatar_users_user"`);
        await queryRunner.query(`DROP TABLE "student_website_activity"`);
        await queryRunner.query(`DROP TABLE "avatar"`);
    }

}
