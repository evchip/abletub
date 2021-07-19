import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, CreateDateColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, ObjectType, Int } from "type-graphql";
import { User } from './User';
import { _Post as Post } from './Post';

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {

    @Column({ type: "int" })
    value: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => User, (user) => user.updoots)
    user: User;

    @PrimaryColumn()
    postId: number;

    @ManyToOne(() => Post, (post) => post.updoots)
    post: Post;


}
