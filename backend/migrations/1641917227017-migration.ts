/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1641917227017 implements MigrationInterface {
    name = 'migration1641917227017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "toAllAdmin" boolean DEFAULT false, "eventType" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying DEFAULT '', "itemId" integer, "pageRedirect" character varying, "metadata" json, "isViewed" boolean DEFAULT false, "viewedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "userId" integer, "courseBatchId" integer, "courseId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_25a81af2e359c6c8993a64a0450" FOREIGN KEY ("courseBatchId") REFERENCES "course_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_699b7621a5ab794cf211a9e67f6" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_699b7621a5ab794cf211a9e67f6"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_25a81af2e359c6c8993a64a0450"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
