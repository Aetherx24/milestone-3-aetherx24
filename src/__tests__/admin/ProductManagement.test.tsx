import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ProductManagement from '@/app/admin/products/page'
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}))

// Mock fetch
global.fetch = jest.fn()

describe('ProductManagement', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn()
  }

  const mockSession = {
    data: {
      user: {
        role: 'admin'
      }
    },
    status: 'authenticated'
  }

  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      description: 'Test Description 1',
      category: {
        id: 1,
        name: 'Test Category'
      },
      images: ['test-image-1.jpg']
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 149.99,
      description: 'Test Description 2',
      category: {
        id: 2,
        name: 'Test Category 2'
      },
      images: ['test-image-2.jpg']
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSession as jest.Mock).mockReturnValue(mockSession)
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    })
  })

  it('renders product management page', async () => {
    render(<ProductManagement />)
    
    // Check if the page title is rendered
    expect(screen.getByText('Product Management')).toBeInTheDocument()
    
    // Check if the add product button is rendered
    expect(screen.getByText('Add Product')).toBeInTheDocument()
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    })
  })

  it('handles product deletion', async () => {
    // Mock confirm dialog
    window.confirm = jest.fn(() => true)
    
    // Mock successful deletion
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    }).mockResolvedValueOnce({
      ok: true
    })

    render(<ProductManagement />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    // Click delete button for first product
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])

    // Check if confirm dialog was shown
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this product?')

    // Check if delete API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/products/1', {
        method: 'DELETE'
      })
    })
  })

  it('navigates to add product page', () => {
    render(<ProductManagement />)
    
    // Click add product button
    fireEvent.click(screen.getByText('Add Product'))
    
    // Check if router was called with correct path
    expect(mockRouter.push).toHaveBeenCalledWith('/admin/products/add')
  })

  it('navigates to edit product page', async () => {
    render(<ProductManagement />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    // Click edit button for first product
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])

    // Check if router was called with correct path
    expect(mockRouter.push).toHaveBeenCalledWith('/admin/products/edit/1')
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<ProductManagement />)

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error loading products')).toBeInTheDocument()
    })
  })

  it('restricts access to non-admin users', () => {
    // Mock non-admin session
    ;(useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          role: 'user'
        }
      },
      status: 'authenticated'
    })

    render(<ProductManagement />)

    // Check if access denied message is displayed
    expect(screen.getByText('Access Denied')).toBeInTheDocument()
  })
}) 