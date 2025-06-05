import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductFormClient } from '@/app/admin/products/[action]/[id]/ProductFormClient'
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

// Mock fetch
global.fetch = jest.fn()

describe('ProductFormClient', () => {
  const mockCategories = [
    { id: 1, name: 'Category 1', image: 'image1.jpg', slug: 'category-1' },
    { id: 2, name: 'Category 2', image: 'image2.jpg', slug: 'category-2' }
  ]

  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: {
      id: 1,
      name: 'Category 1',
      image: 'image1.jpg',
      slug: 'category-1'
    },
    images: ['image1.jpg', 'image2.jpg']
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    })
  })

  it('renders add product form correctly', async () => {
    render(<ProductFormClient params={{ action: 'add' }} />)

    // Check form elements
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByText(/add new product/i)).toBeInTheDocument()
  })

  it('renders edit product form with existing data', async () => {
    // Mock product fetch
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct)
      })

    render(<ProductFormClient params={{ action: 'edit', id: '1' }} />)

    // Wait for form to be populated
    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue('Test Product')
      expect(screen.getByLabelText(/price/i)).toHaveValue(99.99)
      expect(screen.getByLabelText(/description/i)).toHaveValue('Test Description')
    })

    expect(screen.getByText(/edit product/i)).toBeInTheDocument()
  })

  it('handles form submission for adding a new product', async () => {
    // Mock successful submission
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })

    render(<ProductFormClient params={{ action: 'add' }} />)

    // Fill in form
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
    fireEvent.click(screen.getByRole('button', { name: /save/i }))

    // Check if API was called correctly
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New Product',
          price: 149.99,
          description: 'New Description',
          categoryId: 1,
          images: ['']
        })
      })
    })
  })

  it('handles form submission for editing a product', async () => {
    // Mock successful submission
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
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
    fireEvent.click(screen.getByRole('button', { name: /save/i }))

    // Check if API was called correctly
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
          images: ['image1.jpg', 'image2.jpg']
        })
      })
    })
  })

  it('handles API errors', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<ProductFormClient params={{ action: 'add' }} />)

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to load categories/i)).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    render(<ProductFormClient params={{ action: 'add' }} />)

    // Submit form without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /save/i }))

    // Check if validation messages are displayed
    expect(screen.getByLabelText(/title/i)).toBeInvalid()
    expect(screen.getByLabelText(/price/i)).toBeInvalid()
    expect(screen.getByLabelText(/description/i)).toBeInvalid()
    expect(screen.getByLabelText(/category/i)).toBeInvalid()
  })

  it('handles image fields', async () => {
    render(<ProductFormClient params={{ action: 'add' }} />)

    // Add image field
    fireEvent.click(screen.getByText(/add image/i))

    // Check if new image field is added
    const imageInputs = screen.getAllByLabelText(/image/i)
    expect(imageInputs).toHaveLength(2)

    // Remove image field
    fireEvent.click(screen.getAllByText(/remove/i)[1])

    // Check if image field is removed
    expect(screen.getAllByLabelText(/image/i)).toHaveLength(1)
  })
}) 