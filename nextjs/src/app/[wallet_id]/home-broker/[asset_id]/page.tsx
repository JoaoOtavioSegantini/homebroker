import MyWallet from "../../../components/MyWallet";
import { OrderForm } from "../../../components/OrderForm";

export default async function HomeBrokerPage({
  params,
}: {
  params: { wallet_id: string; asset_id: string };
}) {
  return (
    <div>
      <h1>Home broker</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>
            <OrderForm
              wallet_id={params.wallet_id}
              asset_id={params.asset_id}
            />
          </div>
          <div>
            <MyWallet wallet_id={params.wallet_id} />
          </div>
        </div>
        <div>gráfico</div>
      </div>
    </div>
  );
}
