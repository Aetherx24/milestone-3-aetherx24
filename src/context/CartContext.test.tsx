import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'
import '@testing-library/jest-dom'

const TestComponent = () => {
  const { items, addToCart, removeFromCart, clearCart } = useCart()
  
  return (
    <div>
      <div data-testid="item-count">{items.length}</div>
      <button onClick={() => addToCart({ 
        id: 1, 
        title: 'Test', 
        price: 10, 
        description: 'Test Description',
        images: [], 
        category: { 
          id: 1, 
          name: 'Test', 
          image: '', 
          slug: 'test' 
        }, 
        slug: 'test' 
      }, 1)}>
        Add Item
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

describe('CartContext', () => {
  const renderWithCart = (ui: React.ReactElement) => {
    return render(
      <CartProvider>
        {ui}
      </CartProvider>
    )
  }

  it('initializes with empty cart', () => {
    renderWithCart(<TestComponent />)
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })

  it('adds item to cart', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add Item'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('1')
  })

  it('removes item from cart', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Remove Item'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })

  it('clears cart', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Add Item'))
    fireEvent.click(screen.getByText('Clear Cart'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })
}) 