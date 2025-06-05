import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import { CartProvider } from '@/context/CartContext'
import '@testing-library/jest-dom'
import { Product } from '@/types'
import { ReactNode } from 'react'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => {
    return <img src={props.src} alt={props.alt} />
  },
}))

// Mock CartContext
jest.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    cart: [],
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    getItemQuantity: jest.fn(),
    isInCart: jest.fn()
  }),
  CartProvider: ({ children }: { children: ReactNode }) => <>{children}</>
}))

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  images: ['https://example.com/image.jpg'],
  category: {
    id: 1,
    name: 'Test Category',
    image: 'https://example.com/category.jpg',
    slug: 'test-category'
  }
}

interface TestWrapperProps {
  children: ReactNode;
  mockAddToCart?: jest.Mock;
}

// Custom wrapper component for testing
const TestWrapper = ({ children, mockAddToCart = jest.fn() }: TestWrapperProps) => {
  const mockCartContext = {
    addToCart: mockAddToCart,
    cart: [],
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    getItemQuantity: jest.fn(),
    isInCart: jest.fn()
  };

  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Image of Test Product')
  });

  it('calls addToCart when Add to Cart button is clicked', () => {
    const mockAddToCart = jest.fn();
    jest.spyOn(require('@/context/CartContext'), 'useCart').mockReturnValue({
      addToCart: mockAddToCart,
      cart: [],
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getItemQuantity: jest.fn(),
      isInCart: jest.fn()
    });

    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
}) 