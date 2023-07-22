import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletAsset as WalletAssetSchema } from './wallet-asset.schema';

@Injectable()
export class WalletAssetsService {
  constructor(
    private prisma: PrismaService,
    @InjectModel(WalletAssetSchema.name)
    private walletAssetModel: Model<WalletAssetSchema>,
  ) {}

  all(filter: { wallet_id: string }) {
    return this.prisma.walletAsset.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Asset: {
          select: {
            id: true,
            symbol: true,
            price: true,
          },
        },
      },
    });
  }

  create(input: { wallet_id: string; asset_id: string; shares: number }) {
    return this.prisma.walletAsset.create({
      data: {
        wallet_id: input.wallet_id,
        asset_id: input.asset_id,
        shares: input.shares,
        version: 1,
      },
    });
  }
}
