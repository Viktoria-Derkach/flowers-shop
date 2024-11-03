import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FLowerModel {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  color: string;
  @Field(() => Float)
  price: string;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
