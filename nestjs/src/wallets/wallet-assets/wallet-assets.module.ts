import { Module } from '@nestjs/common';
import { WalletAssetsService } from './wallet-assets.service';
import { WalletAssetsController } from './wallet-assets.controller';

@Module({
  controllers: [WalletAssetsController],
  providers: [WalletAssetsService],
})
export class WalletAssetsModule {}
