import '@testing-library/jest-dom'
import React from 'react'
import { configure } from '@testing-library/react'
import { ImageProps } from 'next/image'

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
})

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, ...rest } = props
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img src={typeof src === 'string' ? src : (src as any).default || src} {...rest} />
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
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