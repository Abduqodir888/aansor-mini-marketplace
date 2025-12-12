function CartSummary({ totalItems, totalAmount }) {
  return (
    <div className="cart-summary">
      <div>
        <p className="summary-label">Items</p>
        <p className="summary-value">{totalItems}</p>
      </div>
      <div>
        <p className="summary-label">Total</p>
        <p className="summary-value">{totalAmount}</p>
      </div>
    </div>
  )
}

export default CartSummary
