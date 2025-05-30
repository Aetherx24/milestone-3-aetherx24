import '@testing-library/jest-dom'
import React from 'react'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props
    return React.createElement('img', {
      src: typeof src === 'string' ? src : (src as any).src,
      alt,
      ...rest,
    })
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
})) 