import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import { CartProvider } from '@/context/CartContext'
import '@testing-library/jest-dom'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  images: ['/test-image.jpg'],
  category: {
    id: 1,
    name: 'Test Category',
    image: '',
    slug: 'test-category'
  }
}

describe('ProductCard', () => {
  const renderProductCard = () => {
    return render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    )
  }

  it('renders product information correctly', () => {
    renderProductCard()
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText('View Details')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('renders product image with correct alt text', () => {
    renderProductCard()
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', `Image of ${mockProduct.name}`)
  })

  it('adds product to cart when Add to Cart button is clicked', () => {
    renderProductCard()
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    expect(screen.getByText('Added (1)')).toBeInTheDocument()
  })
}) 