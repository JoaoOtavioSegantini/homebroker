package entity

type Order struct {
	ID            string
	Investor      *Investor
	Asset         *Asset
	Shares        int
	PendingShares int
	Price         float64
	OrderType     string
	Status        string
	Transactions  []*Transaction
}

func NewOrder(orderId string, investor *Investor, asset *Asset, qtdShares int, price float64, orderType string) *Order {
	return &Order{
		ID:            orderId,
		Investor:      investor,
		Asset:         asset,
		Shares:        qtdShares,
		PendingShares: qtdShares,
		Price:         price,
		OrderType:     orderType,
		Status:        "OPEN",
		Transactions:  []*Transaction{},
	}
}
