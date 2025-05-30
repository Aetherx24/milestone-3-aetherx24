import { render, screen, fireEvent } from '@testing-library/react'
import CategoryFilter from '@/components/CategoryFilter'
import '@testing-library/jest-dom'

const mockCategories = [
  { id: 1, name: 'Category 1', image: 'image1.jpg', slug: 'category-1' },
  { id: 2, name: 'Category 2', image: 'image2.jpg', slug: 'category-2' },
]

describe('CategoryFilter', () => {
  const mockOnCategorySelect = jest.fn()

  beforeEach(() => {
    mockOnCategorySelect.mockClear()
  })

  it('renders all categories', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        onCategorySelect={mockOnCategorySelect}
      />
    )

    expect(screen.getByText('All Categories')).toBeInTheDocument()
    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it('calls onCategorySelect with null when All Categories is clicked', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        onCategorySelect={mockOnCategorySelect}
      />
    )

    fireEvent.click(screen.getByText('All Categories'))
    expect(mockOnCategorySelect).toHaveBeenCalledWith(null)
  })

  it('calls onCategorySelect with category id when a category is clicked', () => {
    render(
      <CategoryFilter 
        categories={mockCategories} 
        onCategorySelect={mockOnCategorySelect}
      />
    )

    fireEvent.click(screen.getByText('Category 1'))
    expect(mockOnCategorySelect).toHaveBeenCalledWith(1)
  })
}) 