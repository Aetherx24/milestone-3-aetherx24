import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from '@/components/CategoryFilter'
import '@testing-library/jest-dom'

const mockCategories = ['Category 1', 'Category 2']

describe('CategoryFilter', () => {
  it('renders all categories', () => {
    render(<CategoryFilter categories={mockCategories} />)
    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument()
    })
  })

  it('handles category selection', () => {
    render(<CategoryFilter categories={mockCategories} />)
    const categoryButton = screen.getByText(mockCategories[0])
    fireEvent.click(categoryButton)
    expect(categoryButton).toHaveClass('bg-gray-100')
  })

  it('toggles category selection', () => {
    render(<CategoryFilter categories={mockCategories} />)
    const categoryButton = screen.getByText(mockCategories[0])
    
    // First click should select the category
    fireEvent.click(categoryButton)
    expect(categoryButton).toHaveClass('bg-gray-100')
    
    // Second click should deselect the category
    fireEvent.click(categoryButton)
    expect(categoryButton).toHaveClass('bg-gray-100')
  })
}) 