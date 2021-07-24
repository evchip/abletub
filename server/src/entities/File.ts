import { Field, Int, Mutation, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class File extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    file: string;

    @PrimaryColumn()
    postId!: number;

}

@ObjectType()
@Entity()
export class S3Payload extends BaseEntity {

    @Column()
    signedRequest: string;

    @Column()
    url: string;

}