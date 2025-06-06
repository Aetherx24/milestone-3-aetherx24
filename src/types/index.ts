export interface Category {
  id: number
  name: string
  image: string
  slug: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  category: {
    id: number
    name: string
    image: string
    slug: string
  }
} 