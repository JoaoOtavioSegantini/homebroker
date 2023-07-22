import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.wallet.findMany();
  }

  create(input: { id: string }) {
    return this.prisma.wallet.create({
      data: {
        id: input.id,
      },
    });
  }
}
