import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/products/route'
import { GET as getProduct, PUT, DELETE } from '@/app/api/products/[id]/route'

// Mock fetch
global.fetch = jest.fn()

describe('Products API', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: {
      id: 1,
      name: 'Test Category',
      image: 'test-image.jpg',
      slug: 'test-category'
    },
    images: ['test-image.jpg']
  }

  const mockProducts = [mockProduct]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/products', () => {
    it('fetches products with pagination', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })

      const request = new NextRequest('http://localhost:3000/api/products?offset=0&limit=10')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockProducts)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
      )
    })

    it('handles API errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to fetch products' })
    })
  })

  describe('POST /api/products', () => {
    it('creates a new product', async () => {
      const newProduct = {
        title: 'New Product',
        price: 149.99,
        description: 'New Description',
        categoryId: 1,
        images: ['new-image.jpg']
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...newProduct, id: 2 })
      })

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct)
      })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({ ...newProduct, id: 2 })
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...newProduct,
            price: Number(newProduct.price),
            categoryId: Number(newProduct.categoryId)
          })
        }
      )
    })

    it('validates required fields', async () => {
      const invalidProduct = {
        title: 'New Product'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(invalidProduct)
      })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toEqual({ error: 'Missing required fields' })
    })
  })

  describe('GET /api/products/[id]', () => {
    it('fetches a single product', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct)
      })

      const request = new NextRequest('http://localhost:3000/api/products/1')
      const response = await getProduct(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockProduct)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/products/1'
      )
    })

    it('handles non-existent product', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      })

      const request = new NextRequest('http://localhost:3000/api/products/999')
      const response = await getProduct(request, { params: Promise.resolve({ id: '999' }) })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to fetch product' })
    })
  })

  describe('PUT /api/products/[id]', () => {
    it('updates a product', async () => {
      const updatedProduct = {
        title: 'Updated Product',
        price: 199.99,
        description: 'Updated Description',
        categoryId: 2,
        images: ['updated-image.jpg']
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ...updatedProduct, id: 1 })
      })

      const request = new NextRequest('http://localhost:3000/api/products/1', {
        method: 'PUT',
        body: JSON.stringify(updatedProduct)
      })
      const response = await PUT(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({ ...updatedProduct, id: 1 })
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/products/1',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        }
      )
    })
  })

  describe('DELETE /api/products/[id]', () => {
    it('deletes a product', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      })

      const request = new NextRequest('http://localhost:3000/api/products/1', {
        method: 'DELETE'
      })
      const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({ success: true })
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.escuelajs.co/api/v1/products/1',
        {
          method: 'DELETE'
        }
      )
    })

    it('handles deletion errors', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      })

      const request = new NextRequest('http://localhost:3000/api/products/1', {
        method: 'DELETE'
      })
      const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({ error: 'Failed to delete product' })
    })
  })
}) 