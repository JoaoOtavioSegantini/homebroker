import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { InitTransactionDto, InputExecuteTransactionDto } from './order.dto';
import { OrderStatus, OrderType } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order as OrderSchema } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject('ORDERS_PUBLISHER')
    private readonly kafkaClient: ClientKafka,
    @InjectModel(OrderSchema.name) private orderModel: Model<OrderSchema>,
  ) {}

  all(filter: { wallet_id: string }) {
    return this.prisma.order.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Transactions: true,
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  async initTransaction(input: InitTransactionDto) {
    const order = await this.prisma.order.create({
      data: {
        asset_id: input.asset_id,
        wallet_id: input.wallet_id,
        shares: input.shares,
        partial: input.shares,
        price: input.price,
        type: input.type,
        status: OrderStatus.PENDING,
        version: 1,
      },
    });

    this.kafkaClient.emit('input', {
      order_id: order.id,
      investor_id: order.wallet_id,
      asset_id: order.asset_id,
      shares: order.shares,
      price: order.price,
      order_type: order.type,
    });
    return order;
  }

  async executeTransaction(input: InputExecuteTransactionDto) {
    return this.prisma.$transaction(async (_prisma) => {
      const order = await _prisma.order.findUniqueOrThrow({
        where: { id: input.order_id },
      });

      await _prisma.order.update({
        where: { id: input.order_id, version: order.version },
        data: {
          partial: order.partial - input.negotiated_shares,
          status: input.status,
          Transactions: {
            create: {
              broker_transaction_id: input.broker_transaction_id,
              related_investor_id: input.related_investor_id,
              shares: input.negotiated_shares,
              price: input.price,
            },
          },
          version: { increment: 1 },
        },
      });
      if (input.status === OrderStatus.CLOSED) {
        await _prisma.asset.update({
          where: { id: order.asset_id },
          data: {
            price: input.price,
          },
        });

        const walletAsset = await _prisma.walletAsset.findUnique({
          where: {
            wallet_id_asset_id: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
            },
          },
        });
        if (walletAsset) {
          console.log(walletAsset);
          //se já tiver o ativo na carteira, atualiza a quantidade de ativos
          await _prisma.walletAsset.update({
            where: {
              wallet_id_asset_id: {
                asset_id: order.asset_id,
                wallet_id: order.wallet_id,
              },
              version: walletAsset.version,
            },
            data: {
              shares:
                order.type === OrderType.BUY
                  ? walletAsset.shares + order.shares
                  : walletAsset.shares - order.shares,
              version: { increment: 1 },
            },
          });
        } else {
          //só poderia adicionar na carteira se a ordem for de compra
          await _prisma.walletAsset.create({
            data: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
              shares: input.negotiated_shares,
              version: 1,
            },
          });
        }
      }
    });
  }
}
