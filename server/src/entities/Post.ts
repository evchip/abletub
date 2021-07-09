import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class _Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type: 'date'})
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({type: 'text'})
    title!: string;
}