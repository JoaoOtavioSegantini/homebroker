async function initTransaction(formData: FormData) {
    "use server";
    const shares = formData.get("shares");
    const price = formData.get("price");
    const wallet_id = formData.get("wallet_id");
    const asset_id = formData.get("asset_id");
    const type = formData.get("type");

    return await fetch(`http://localhost:8000/wallets/${wallet_id}/orders`, {
        method: "POST",
        body: JSON.stringify({ shares, price, asset_id, type }),
    });
}

export function OrderForm(props: { asset_id: string; wallet_id: string }) {
    return (
        <div>
            <h1>Order Form</h1>
            <form action={initTransaction}>
                <input name="asset_id" type="hidden" defaultValue={props.asset_id} />
                <input name="wallet_id" type="hidden" defaultValue={props.wallet_id} />
                <input name="type" type="hidden" defaultValue={"BUY"} />
                <input
                    name="shares"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="quantidade"
                />
                <br />
                <input
                    name="price"
                    type="number"
                    min={1}
                    step={0.1}
                    placeholder="preço"
                />
                <br />
                <button>Comprar</button>
            </form>
        </div>
    );
}
