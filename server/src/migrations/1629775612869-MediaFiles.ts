import {MigrationInterface, QueryRunner} from "typeorm";

export class MediaFiles1629775612869 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "__post" ALTER COLUMN "audioFileName" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "__post" ALTER COLUMN "imageFileName" DROP NOT NULL`);
    }

    public async down(_: QueryRunner): Promise<void> {
        // await queryRunner.query(``);
    }

}
