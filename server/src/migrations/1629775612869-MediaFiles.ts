import {MigrationInterface, QueryRunner} from "typeorm";

export class MediaFiles1629775612869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "__post" ALTER COLUMN "fileName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
