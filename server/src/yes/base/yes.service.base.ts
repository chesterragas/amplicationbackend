import { PrismaService } from "nestjs-prisma";

import {
  FindOneYesArgs,
  FindManyYesArgs,
  YesCreateArgs,
  YesUpdateArgs,
  YesDeleteArgs,
  Subset,
  Yes,
} from "@prisma/client";

export class YesServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyYesArgs>(
    args: Subset<T, FindManyYesArgs>
  ): Promise<Yes[]> {
    return this.prisma.yes.findMany(args);
  }
  async findOne<T extends FindOneYesArgs>(
    args: Subset<T, FindOneYesArgs>
  ): Promise<Yes | null> {
    return this.prisma.yes.findOne(args);
  }
  async create<T extends YesCreateArgs>(
    args: Subset<T, YesCreateArgs>
  ): Promise<Yes> {
    return this.prisma.yes.create<T>(args);
  }
  async update<T extends YesUpdateArgs>(
    args: Subset<T, YesUpdateArgs>
  ): Promise<Yes> {
    return this.prisma.yes.update<T>(args);
  }
  async delete<T extends YesDeleteArgs>(
    args: Subset<T, YesDeleteArgs>
  ): Promise<Yes> {
    return this.prisma.yes.delete(args);
  }
}
