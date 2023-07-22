import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletAssetsModule } from './wallet-assets/wallet-assets.module';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [WalletAssetsModule],
})
export class WalletsModule {}
