import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType, Int } from "type-graphql";
import { User } from './User';
import { Updoot } from './Updoot';

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

    @Field(() => Int, { nullable: true })
    voteStatus!: number | null; // 1 or -1 or null

    @Field()
    @Column()
    creatorId!: number;

    @Field()
    @ManyToOne(() => User, user => user.posts)
    creator!: User;

    @OneToMany(() => Updoot, (updoot) => updoot.post)
    updoots!: Updoot[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt!: Date;
}
