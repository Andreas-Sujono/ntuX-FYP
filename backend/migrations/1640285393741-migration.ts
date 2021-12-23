/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1640285393741 implements MigrationInterface {
    name = 'migration1640285393741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "givenName" character varying NOT NULL, "familyName" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "salutation" character varying, "nationality" character varying NOT NULL, "citizenship" character varying NOT NULL, "NRIC" character varying, "dateOfBirth" TIMESTAMP WITH TIME ZONE, "role" character varying NOT NULL, "isActive" boolean DEFAULT true, "confirmationCode" character varying, "codeExpiresAt" TIMESTAMP WITH TIME ZONE, "emailVerifiesAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
