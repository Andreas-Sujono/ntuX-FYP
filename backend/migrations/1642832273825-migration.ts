/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642832273825 implements MigrationInterface {
    name = 'migration1642832273825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tutor_review" ("id" SERIAL NOT NULL, "rating" integer, "review" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "tutorId" integer, "userId" integer, "tutorRequestId" integer, CONSTRAINT "PK_f35249285a8ad78da63c1800d8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tutor_message" ("id" SERIAL NOT NULL, "chat" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "tutorId" integer, "userId" integer, "tutorRequestId" integer, CONSTRAINT "PK_62f50c0592ab8d10a72fee7b481" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tutor_review" ADD CONSTRAINT "FK_0aa4fd889aae64e0034412b1f5e" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_review" ADD CONSTRAINT "FK_624d72e300cb8a7b8d7a42af983" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_review" ADD CONSTRAINT "FK_0ae178bf191ac364ff9a8d34c19" FOREIGN KEY ("tutorRequestId") REFERENCES "tutor_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_message" ADD CONSTRAINT "FK_170ac5fd99f93f45e73c3290ba4" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_message" ADD CONSTRAINT "FK_3ae855e6a5a63df48cebebe7b01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_message" ADD CONSTRAINT "FK_0dee15362cf56778b85ba14403a" FOREIGN KEY ("tutorRequestId") REFERENCES "tutor_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_message" DROP CONSTRAINT "FK_0dee15362cf56778b85ba14403a"`);
        await queryRunner.query(`ALTER TABLE "tutor_message" DROP CONSTRAINT "FK_3ae855e6a5a63df48cebebe7b01"`);
        await queryRunner.query(`ALTER TABLE "tutor_message" DROP CONSTRAINT "FK_170ac5fd99f93f45e73c3290ba4"`);
        await queryRunner.query(`ALTER TABLE "tutor_review" DROP CONSTRAINT "FK_0ae178bf191ac364ff9a8d34c19"`);
        await queryRunner.query(`ALTER TABLE "tutor_review" DROP CONSTRAINT "FK_624d72e300cb8a7b8d7a42af983"`);
        await queryRunner.query(`ALTER TABLE "tutor_review" DROP CONSTRAINT "FK_0aa4fd889aae64e0034412b1f5e"`);
        await queryRunner.query(`DROP TABLE "tutor_message"`);
        await queryRunner.query(`DROP TABLE "tutor_review"`);
    }

}
