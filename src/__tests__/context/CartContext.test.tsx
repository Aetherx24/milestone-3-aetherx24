import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import '@testing-library/jest-dom'
import { ReactNode } from 'react'
import { Product } from '@/types'

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  images: ['/test-image.jpg'],
  category: {
    id: 1,
    name: 'Test Category',
    image: '/test-category.jpg',
    slug: 'test-category'
  }
}

function TestComponent() {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity, isInCart } = useCart()

  return (
    <div>
      <div data-testid="cart-count">{items.length}</div>
      <div data-testid="item-quantity">{getItemQuantity(mockProduct.id)}</div>
      <div data-testid="is-in-cart">{isInCart(mockProduct.id).toString()}</div>
      <button onClick={() => addToCart(mockProduct)}>Add to Cart</button>
      <button onClick={() => removeFromCart(mockProduct.id)}>Remove from Cart</button>
      <button onClick={() => updateQuantity(mockProduct.id, 2)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

function renderWithCart(ui: React.ReactElement) {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with empty cart', () => {
    renderWithCart(<TestComponent />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('false')
  })

  it('adds item to cart', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('1')
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('true')
  })

  it('removes item from cart', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add to Cart'))
    fireEvent.click(screen.getByText('Remove from Cart'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('false')
  })

  it('updates item quantity', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add to Cart'))
    fireEvent.click(screen.getByText('Update Quantity'))
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('2')
  })

  it('clears cart', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add to Cart'))
    fireEvent.click(screen.getByText('Clear Cart'))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('0')
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('false')
  })

  it('checks if item is in cart', () => {
    renderWithCart(<TestComponent />)
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('false')
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('true')
  })

  it('handles adding same item multiple times', () => {
    renderWithCart(<TestComponent />)
    fireEvent.click(screen.getByText('Add to Cart'))
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(screen.getByTestId('item-quantity')).toHaveTextContent('2')
  })

  it('handles invalid localStorage data', () => {
    localStorage.setItem('cart', 'invalid-json')
    renderWithCart(<TestComponent />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })
}) 