import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.asset.findMany();
  }

  create(data: { id: string; symbol: string; price: number }) {
    return this.prisma.asset.create({
      data,
    });
  }
}
