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
  title: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  images: ['test-image.jpg'],
  category: {
    id: 1,
    name: 'Test Category',
    image: 'test-category.jpg',
    slug: 'test-category'
  },
  slug: 'test-product'
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
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category.name)).toBeInTheDocument()
  })

  it('renders product image with correct alt text', () => {
    renderProductCard()
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockProduct.images[0])
    expect(image).toHaveAttribute('alt', mockProduct.title)
  })

  it('has working add to cart button', () => {
    renderProductCard()
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addToCartButton).toBeInTheDocument()
    
    fireEvent.click(addToCartButton)
    // You might want to add more assertions here based on your cart implementation
  })
}) 