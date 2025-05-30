import { useState, useEffect } from 'react'

interface Cache {
  [key: string]: {
    data: any
    timestamp: number
  }
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const cache: Cache = {}

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cachedData = cache[url]
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
          setData(cachedData.data)
          setLoading(false)
          return
        }

        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        
        // Update cache
        cache[url] = {
          data: result,
          timestamp: Date.now()
        }
        
        setData(result)
        setError(null)
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, JSON.stringify(options)])

  return { data, error, loading }
} 