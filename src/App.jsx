import { useEffect, useMemo, useState } from 'react'
import CartList from './components/CartList.jsx'
import CartSummary from './components/CartSummary.jsx'
import './App.css'

const STORAGE_KEY = 'mini-marketplace:cart'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    value,
  )

const loadCart = () => {
  if (typeof localStorage === 'undefined') return []
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to parse saved cart', error)
    return []
  }
}

function App() {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    const handleAddFromCatalog = (event) => {
      const product = event.detail
      if (!product?.id) return

      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        }
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price) || 0,
            image: product.image,
            quantity: 1,
          },
        ]
      })
    }

    window.addEventListener('cart:add', handleAddFromCatalog)
    return () => {
      window.removeEventListener('cart:add', handleAddFromCatalog)
    }
  }, [])

  const totals = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc.count += item.quantity
          acc.amount += item.quantity * item.price
          return acc
        },
        { count: 0, amount: 0 },
      ),
    [items],
  )

  useEffect(() => {
    const meta = document.getElementById('cart-meta')
    if (meta) {
      meta.textContent = totals.count
        ? `${items.length} items • ${totals.count} pcs`
        : 'Empty'
    }
  }, [items.length, totals.count])

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="cart-shell">
      <CartSummary
        totalItems={totals.count}
        totalAmount={formatCurrency(totals.amount)}
      />
      <CartList
        items={items}
        onIncrease={(id) => updateQuantity(id, 1)}
        onDecrease={(id) => updateQuantity(id, -1)}
        onRemove={removeItem}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}

export default App
