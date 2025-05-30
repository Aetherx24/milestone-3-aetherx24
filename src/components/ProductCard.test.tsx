import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'
import { CartProvider } from '@/context/CartContext'
import '@testing-library/jest-dom'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  category: {
    id: 1,
    name: 'Test Category',
    image: 'https://test.com/image.jpg',
    slug: 'test-category'
  },
  images: ['https://test.com/image.jpg'],
  slug: 'test-product'
}

describe('ProductCard', () => {
  const renderWithCart = (ui: React.ReactElement) => {
    return render(
      <CartProvider>
        {ui}
      </CartProvider>
    )
  }

  it('renders product information correctly', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByAltText('Test Product')).toBeInTheDocument()
  })

  it('handles add to cart click', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    // Check if toast message appears
    expect(screen.getByText('Added 1 item to cart!')).toBeInTheDocument()
  })

  it('changes quantity when select value changes', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    const quantitySelect = screen.getByLabelText('Quantity:')
    fireEvent.change(quantitySelect, { target: { value: '3' } })
    
    expect(quantitySelect).toHaveValue('3')
  })

  it('navigates to product details when clicking view details', () => {
    renderWithCart(<ProductCard product={mockProduct} />)
    
    const viewDetailsLink = screen.getByText('View Details')
    expect(viewDetailsLink).toHaveAttribute('href', '/product/1')
  })
}) 