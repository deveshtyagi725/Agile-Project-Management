import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for token on mount
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr))
        setIsAuthenticated(true)
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)

    // Listen for storage changes (from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (e.newValue) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return { isAuthenticated, user, loading }
}
