import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import { CartProvider } from '@/context/CartContext'
import '@testing-library/jest-dom'
import { Product } from '@/types'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => {
    return <img src={props.src} alt={props.alt} />
  },
}))

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
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

describe('ProductCard', () => {
  const mockOnAddToCart = jest.fn();

  const renderProductCard = () => {
    return render(
      <CartProvider>
        <ProductCard 
          product={mockProduct} 
          onAddToCart={mockOnAddToCart}
        />
      </CartProvider>
    )
  }

  it('renders product information correctly', () => {
    renderProductCard()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('View Details')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  it('renders product image with correct alt text', () => {
    renderProductCard()
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Image of Test Product')
  })

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    renderProductCard()
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    expect(mockOnAddToCart).toHaveBeenCalled()
  })
}) 