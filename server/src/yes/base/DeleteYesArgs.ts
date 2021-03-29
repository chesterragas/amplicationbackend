import { ArgsType, Field } from "@nestjs/graphql";
import { YesWhereUniqueInput } from "./YesWhereUniqueInput";

@ArgsType()
class DeleteYesArgs {
  @Field(() => YesWhereUniqueInput, { nullable: false })
  where!: YesWhereUniqueInput;
}

export { DeleteYesArgs };
