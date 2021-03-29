import { ArgsType, Field } from "@nestjs/graphql";
import { YesWhereInput } from "./YesWhereInput";

@ArgsType()
class FindManyYesArgs {
  @Field(() => YesWhereInput, { nullable: true })
  where?: YesWhereInput;
}

export { FindManyYesArgs };
