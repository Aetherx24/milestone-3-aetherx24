import { useState, useEffect } from 'react'

interface FetchOptions extends RequestInit {
  skip?: boolean
}

interface FetchState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

interface Cache {
  [key: string]: {
    data: any
    timestamp: number
  }
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const cache: Cache = {}

export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  })

  useEffect(() => {
    if (options.skip) {
      setState(prev => ({ ...prev, isLoading: false }))
      return
    }

    const controller = new AbortController()
    const { signal } = controller

    setState(prev => ({ ...prev, isLoading: true }))

    fetch(url, { ...options, signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        setState({
          data,
          error: null,
          isLoading: false,
        })
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          return
        }
        setState({
          data: null,
          error,
          isLoading: false,
        })
      })

    return () => {
      controller.abort()
    }
  }, [url, JSON.stringify(options)])

  return state
} 