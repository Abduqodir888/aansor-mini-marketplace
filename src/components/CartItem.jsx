function CartItem({ item, onIncrease, onDecrease, onRemove, formatCurrency }) {
  return (
    <div className="cart-item">
      <div className="cart-item__media">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="cart-item__body">
        <p className="cart-item__title">{item.title}</p>
        <p className="cart-item__price">{formatCurrency(item.price)}</p>
        <div className="cart-item__controls">
          <div className="quantity">
            <button
              className="pill"
              type="button"
              onClick={() => onDecrease(item.id)}
              aria-label={`Decrease ${item.title} quantity`}
            >
              −
            </button>
            <span className="quantity__value">{item.quantity}</span>
            <button
              className="pill"
              type="button"
              onClick={() => onIncrease(item.id)}
              aria-label={`Increase ${item.title} quantity`}
            >
              +
            </button>
          </div>
          <button
            className="btn-ghost"
            type="button"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="cart-item__total">
        {formatCurrency(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default CartItem
