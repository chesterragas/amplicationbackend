import { ArgsType, Field } from "@nestjs/graphql";
import { YesWhereUniqueInput } from "./YesWhereUniqueInput";

@ArgsType()
class FindOneYesArgs {
  @Field(() => YesWhereUniqueInput, { nullable: false })
  where!: YesWhereUniqueInput;
}

export { FindOneYesArgs };
