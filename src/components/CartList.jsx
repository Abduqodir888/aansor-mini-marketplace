import CartItem from './CartItem.jsx'

function CartList({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  formatCurrency,
}) {
  if (!items.length) {
    return (
      <div className="empty-state">
        <p className="muted">Your cart is empty. Add something from Products.</p>
      </div>
    )
  }

  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  )
}

export default CartList
