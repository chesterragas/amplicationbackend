import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { YesServiceBase } from "./base/yes.service.base";

@Injectable()
export class YesService extends YesServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
