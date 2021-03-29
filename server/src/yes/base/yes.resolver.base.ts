import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { DeleteYesArgs } from "./DeleteYesArgs";
import { FindManyYesArgs } from "./FindManyYesArgs";
import { FindOneYesArgs } from "./FindOneYesArgs";
import { Yes } from "./Yes";
import { YesService } from "../yes.service";

@graphql.Resolver(() => Yes)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class YesResolverBase {
  constructor(
    protected readonly service: YesService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Yes])
  @nestAccessControl.UseRoles({
    resource: "Yes",
    action: "read",
    possession: "any",
  })
  async yeses(
    @graphql.Args() args: FindManyYesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Yes[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Yes",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Yes, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Yes",
    action: "read",
    possession: "own",
  })
  async yes(
    @graphql.Args() args: FindOneYesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Yes | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Yes",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Yes)
  @nestAccessControl.UseRoles({
    resource: "Yes",
    action: "delete",
    possession: "any",
  })
  async deleteYes(@graphql.Args() args: DeleteYesArgs): Promise<Yes | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
