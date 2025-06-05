import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { ProductFormClient } from '@/app/admin/products/[action]/[id]/ProductFormClient'
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock fetch
global.fetch = jest.fn()

describe('ProductFormClient', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn()
  }

  const mockCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
  ]

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: { id: 1, name: 'Category 1' },
    images: ['test-image.jpg']
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    })
  })

  it('renders add product form', async () => {
    render(<ProductFormClient params={{ action: 'add' }} />)
    
    // Check form elements
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByText('Add New Product')).toBeInTheDocument()
  })

  it('renders edit product form with existing data', async () => {
    // Mock product fetch
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    })

    render(<ProductFormClient params={{ action: 'edit', id: '1' }} />)

    // Wait for form to be populated
    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue('Test Product')
      expect(screen.getByLabelText(/price/i)).toHaveValue('99.99')
      expect(screen.getByLabelText(/description/i)).toHaveValue('Test Description')
    })
  })

  it('handles form submission for new product', async () => {
    // Mock successful submission
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1 })
    })

    render(<ProductFormClient params={{ action: 'add' }} />)

    // Fill out form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Product' }
    })
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '149.99' }
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Description' }
    })
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: '1' }
    })

    // Submit form
    fireEvent.click(screen.getByText('Add New Product'))

    // Check if API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New Product',
          description: 'New Description',
          images: [''],
          price: 149.99,
          categoryId: 1
        })
      })
    })

    // Check if redirected after success
    expect(mockRouter.push).toHaveBeenCalledWith('/admin/products')
  })

  it('handles form submission for editing product', async () => {
    // Mock successful submission
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProduct)
    }).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1 })
    })

    render(<ProductFormClient params={{ action: 'edit', id: '1' }} />)

    // Wait for form to be populated
    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue('Test Product')
    })

    // Update form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Updated Product' }
    })

    // Submit form
    fireEvent.click(screen.getByText('Edit Product'))

    // Check if API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/products/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'Updated Product',
          price: 99.99,
          description: 'Test Description',
          categoryId: 1,
          images: ['test-image.jpg']
        })
      })
    })

    // Check if redirected after success
    expect(mockRouter.push).toHaveBeenCalledWith('/admin/products')
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<ProductFormClient params={{ action: 'add' }} />)

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to load categories')).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    render(<ProductFormClient params={{ action: 'add' }} />)

    // Submit form without filling required fields
    fireEvent.click(screen.getByText('Add New Product'))

    // Check for validation messages
    expect(screen.getByLabelText(/title/i)).toBeInvalid()
    expect(screen.getByLabelText(/price/i)).toBeInvalid()
    expect(screen.getByLabelText(/description/i)).toBeInvalid()
    expect(screen.getByLabelText(/category/i)).toBeInvalid()
  })
}) 