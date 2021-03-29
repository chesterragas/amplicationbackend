import { Module } from "@nestjs/common";
import { YesModuleBase } from "./base/yes.module.base";
import { YesService } from "./yes.service";
import { YesController } from "./yes.controller";
import { YesResolver } from "./yes.resolver";

@Module({
  imports: [YesModuleBase],
  controllers: [YesController],
  providers: [YesService, YesResolver],
  exports: [YesService],
})
export class YesModule {}
