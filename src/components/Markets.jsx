import { useState } from "react";
import { useCrypto } from "../contexts/CryptoContext";
import { Search, TrendingUp, TrendingDown, Star, Filter, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";

const Markets = () => {
    const { cryptoData, loading, error, addToWatchlist} = useCrypto()
    const [searchTerm, setSearchTerm] =useState('')
    const [sortBy, setSortBy] = useState('market_cap')
    const [sortOrder, setSortOrder] = useState('desc')

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        }).format(amount)
    }

    const formatMarketCap = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 2
        }).format(amount)
    }

    const filteredData = cryptoData
    .filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortBy] - b[sortBy]
        } else {
            return b[sortBy] - a[sortBy]
        }
    })

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('desc')
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <LoadingSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="card bg-gradient-to-r from-red-900/20 to-red-800/20 border-red-700/50 text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-3">Error Loading Markets</h2>
                    <p className="text-red-300">{error}</p>
                </div>
            </div>
        )
    }

    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Cryptocurrency Markets</h1>
        <p className="text-slate-400">Real-time prices and market data for all cryptocurrencies</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search cryptocurrencies by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 text-lg py-4"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field pl-10 pr-8 py-4 appearance-none bg-slate-800/50"
            >
              <option value="market_cap">Market Cap</option>
              <option value="current_price">Price</option>
              <option value="price_change_percentage_24h">24h Change</option>
              <option value="total_volume">Volume</option>
            </select>
          </div>
          <button className="btn-secondary px-6">
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((coin, index) => (
          <div key={coin.id} className="crypto-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white">{coin.name}</h3>
                  <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <button
                onClick={() => addToWatchlist(coin)}
                className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-xl transition-all duration-300"
              >
                <Star className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-2xl font-bold text-white mb-2">
                {formatCurrency(coin.current_price)}
              </div>
              <div className={`flex items-center space-x-1 ${
                coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {coin.price_change_percentage_24h >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Market Cap</span>
                <span className="text-white font-medium">{formatMarketCap(coin.market_cap)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Volume (24h)</span>
                <span className="text-white font-medium">
                  {coin.total_volume ? formatMarketCap(coin.total_volume) : 'N/A'}
                </span>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="h-16 bg-slate-800/30 rounded-2xl p-2 mb-4">
              <svg className="w-full h-full">
                {coin.sparkline_in_7d?.price && (
                  <polyline
                    points={coin.sparkline_in_7d.price.slice(-20).map((price, index) => 
                      `${(index / 19) * 100},${50 - ((price - Math.min(...coin.sparkline_in_7d.price.slice(-20))) / 
                      (Math.max(...coin.sparkline_in_7d.price.slice(-20)) - Math.min(...coin.sparkline_in_7d.price.slice(-20)))) * 40}`
                    ).join(' ')}
                    fill="none"
                    stroke={coin.price_change_percentage_24h >= 0 ? "#10b981" : "#ef4444"}
                    strokeWidth="2"
                  />
                )}
              </svg>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 btn-primary text-sm py-2">
                Buy
              </button>
              <button className="flex-1 btn-secondary text-sm py-2">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    )

}

export default Markets