import { createContext, useContext, useState, useEffect } from 'react'

const CryptoContext = createContext()

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider')
  }
  return context
}

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [watchlist, setWatchlist] = useState([])

  // Fetch cryptocurrency data from CoinGecko API
  const fetchCryptoData = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data')
      }
      
      const data = await response.json()
      setCryptoData(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      // Fallback mock data if API fails
      setCryptoData(mockCryptoData)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for fallback
  const mockCryptoData = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 43250.00,
      market_cap: 845000000000,
      price_change_percentage_24h: 2.34,
      price_change_percentage_7d_in_currency: 5.67,
      sparkline_in_7d: { price: [42000, 42500, 43000, 42800, 43200, 43500, 43250] }
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2650.00,
      market_cap: 318000000000,
      price_change_percentage_24h: -1.23,
      price_change_percentage_7d_in_currency: 3.45,
      sparkline_in_7d: { price: [2600, 2620, 2680, 2640, 2655, 2670, 2650] }
    },
    {
      id: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      current_price: 0.48,
      market_cap: 16800000000,
      price_change_percentage_24h: 4.56,
      price_change_percentage_7d_in_currency: 8.92,
      sparkline_in_7d: { price: [0.45, 0.46, 0.47, 0.48, 0.49, 0.47, 0.48] }
    }
  ]

  // Add to portfolio
  const addToPortfolio = (coin, amount) => {
    const existingCoin = portfolio.find(item => item.id === coin.id)
    if (existingCoin) {
      setPortfolio(prev => 
        prev.map(item => 
          item.id === coin.id 
            ? { ...item, amount: item.amount + amount }
            : item
        )
      )
    } else {
      setPortfolio(prev => [...prev, { ...coin, amount }])
    }
  }

  // Remove from portfolio
  const removeFromPortfolio = (coinId) => {
    setPortfolio(prev => prev.filter(item => item.id !== coinId))
  }

  // Add to watchlist
  const addToWatchlist = (coin) => {
    if (!watchlist.find(item => item.id === coin.id)) {
      setWatchlist(prev => [...prev, coin])
    }
  }

  // Remove from watchlist
  const removeFromWatchlist = (coinId) => {
    setWatchlist(prev => prev.filter(item => item.id !== coinId))
  }

  useEffect(() => {
    fetchCryptoData()
    // Refresh data every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000)
    return () => clearInterval(interval)
  }, [])

  const value = {
    cryptoData,
    loading,
    error,
    portfolio,
    watchlist,
    addToPortfolio,
    removeFromPortfolio,
    addToWatchlist,
    removeFromWatchlist,
    refreshData: fetchCryptoData
  }

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  )
}