import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminProductsPage from '@/app/admin/products/page'
import '@testing-library/jest-dom'

// Mock fetch
global.fetch = jest.fn()

describe('AdminProductsPage', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      price: 99.99,
      description: 'Test Description 1',
      category: {
        id: 1,
        name: 'Test Category',
        image: 'test-image.jpg',
        slug: 'test-category'
      },
      images: ['test-image.jpg']
    },
    {
      id: 2,
      name: 'Test Product 2',
      price: 149.99,
      description: 'Test Description 2',
      category: {
        id: 2,
        name: 'Test Category 2',
        image: 'test-image-2.jpg',
        slug: 'test-category-2'
      },
      images: ['test-image-2.jpg']
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    })
  })

  it('renders loading state initially', () => {
    render(<AdminProductsPage />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders products after loading', async () => {
    render(<AdminProductsPage />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    })

    // Check if prices are displayed
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()

    // Check if categories are displayed
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Test Category 2')).toBeInTheDocument()
  })

  it('handles product deletion', async () => {
    // Mock successful deletion
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })

    // Mock window.confirm
    window.confirm = jest.fn(() => true)

    render(<AdminProductsPage />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    // Click delete button for first product
    const deleteButtons = screen.getAllByText(/delete/i)
    fireEvent.click(deleteButtons[0])

    // Check if confirmation was requested
    expect(window.confirm).toHaveBeenCalled()

    // Check if delete API was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/products/1', {
        method: 'DELETE'
      })
    })

    // Check if product was removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument()
    })
  })

  it('handles deletion cancellation', async () => {
    // Mock window.confirm to return false
    window.confirm = jest.fn(() => false)

    render(<AdminProductsPage />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    // Click delete button
    const deleteButtons = screen.getAllByText(/delete/i)
    fireEvent.click(deleteButtons[0])

    // Check if confirmation was requested
    expect(window.confirm).toHaveBeenCalled()

    // Check if delete API was not called
    expect(global.fetch).not.toHaveBeenCalledWith('/api/products/1', {
      method: 'DELETE'
    })

    // Check if product is still in the list
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
  })

  it('handles API errors', async () => {
    // Mock API error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<AdminProductsPage />)

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument()
    })
  })

  it('handles pagination', async () => {
    // Mock paginated response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts.slice(0, 1))
    })

    render(<AdminProductsPage />)

    // Wait for first page to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    // Mock second page response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts.slice(1))
    })

    // Click next page button
    const nextPageButton = screen.getByRole('button', { name: /next/i })
    fireEvent.click(nextPageButton)

    // Check if second page is loaded
    await waitFor(() => {
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    })
  })

  it('disables pagination buttons appropriately', async () => {
    // Mock single page response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts.slice(0, 1))
    })

    render(<AdminProductsPage />)

    // Wait for page to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    // Check if previous button is disabled on first page
    const prevButton = screen.getByRole('button', { name: /previous/i })
    expect(prevButton).toBeDisabled()

    // Check if next button is enabled
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).not.toBeDisabled()
  })
}) 