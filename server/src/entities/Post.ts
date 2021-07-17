import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, CreateDateColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType, Int } from "type-graphql";
import { User } from './User';

@ObjectType()
@Entity()
export class _Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    text!: string;

    @Field()
    @Column({type: 'int', default: 0})
    points!: number;

    @Field()
    @Column()
    creatorId!: number;

    @Field()
    @ManyToOne(() => User, user => user.posts)
    creator!: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;
}
