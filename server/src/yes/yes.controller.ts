import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { YesService } from "./yes.service";
import { YesControllerBase } from "./base/yes.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("yeses")
@common.Controller("yeses")
export class YesController extends YesControllerBase {
  constructor(
    protected readonly service: YesService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
