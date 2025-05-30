import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from './CategoryFilter'
import '@testing-library/jest-dom'

const mockCategories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
]

describe('CategoryFilter', () => {
  it('renders all categories', () => {
    render(<CategoryFilter categories={mockCategories} />)
    
    expect(screen.getByText('Categories')).toBeInTheDocument()
    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it('handles category click', () => {
    render(<CategoryFilter categories={mockCategories} />)
    
    const categoryButton = screen.getByText('Category 1')
    fireEvent.click(categoryButton)
    
    // Check if the button has the selected style
    expect(categoryButton).toHaveClass('bg-blue-600')
  })

  it('handles category deselection', () => {
    render(<CategoryFilter categories={mockCategories} />)
    
    const categoryButton = screen.getByText('Category 1')
    
    // Click to select
    fireEvent.click(categoryButton)
    expect(categoryButton).toHaveClass('bg-blue-600')
    
    // Click again to deselect
    fireEvent.click(categoryButton)
    expect(categoryButton).not.toHaveClass('bg-blue-600')
  })
}) 