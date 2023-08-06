import { TabsGroup, TabsItem } from "@/app/components/flowbite-components";
import { OrderForm } from "@/app/components/OrderForm";
import { HiArrowUp, HiShoppingCart } from "@/app/components/react-icons/hi";

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
          <TabsGroup aria-label="Default tabs" style="pills">
            <TabsItem active title="Comprar" icon={HiShoppingCart}>
              <OrderForm
                wallet_id={params.wallet_id}
                asset_id={params.asset_id}
                type="BUY"
              />
            </TabsItem>
            <TabsItem title="Vender" icon={HiArrowUp}>
              <OrderForm
                wallet_id={params.wallet_id}
                asset_id={params.asset_id}
                type="SELL"
              />
            </TabsItem>
          </TabsGroup>
        </div>
        <div>gráfico</div>
      </div>
    </div>
  );
}
