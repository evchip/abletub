import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class _Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({type: 'date'})
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;

    @Field()
    @Column()
    title!: string;
}
