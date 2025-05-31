import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface FetchOptions {
  method?: string
  headers?: HeadersInit
  body?: BodyInit
}

interface Cache {
  [key: string]: {
    data: any
    timestamp: number
  }
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const cache: Cache = {}

export function useFetch<T>(url: string, options?: FetchOptions) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error })
      }
    }

    fetchData()
  }, [url, JSON.stringify(options)])

  return state
} 