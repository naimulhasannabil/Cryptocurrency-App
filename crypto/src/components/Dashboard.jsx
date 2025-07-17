import { useState, useEffect } from "react";
import { useCrypto } from "../contexts/CryptoContext";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Star, Plus, Activity, Users, Globe, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import CircularProgress from './CircularProgress'
import LoadingSkeleton from './LoadingSkeleton'

const Dashboard = () => {
    const { cryptoData, loading, error, addToWatchlist, addToPortfolio } = useCrypto()
    const [marketStats, setMarketStats] = useState({
        totalMarketCap: 0,
        totalVolume: 0,
        btcDominance: 0,
        activeCoins: 0
    })

    useEffect(() => {
        if (cryptoData.length > 0) {
            const totalMarketCap = cryptoData.reduce((sum, coin) => sum + coin.market_cap, 0)
            const totalVolume = cryptoData.reduce((sum, coin) => sum + (coin.total_volume || 0), 0)
            const btcMarketCap = cryptoData.find(coin => coin.id === 'bitcoin')?.market_cap || 0
            const btcDominance = totalMarketCap > 0 ? (btcMarketCap / totalMarketCap) * 100 : 0

            setMarketStats({
                totalMarketCap,
                totalVolume,
                btcDominance,
                activeCoins: cryptoData.length
            })
        }
    }, [cryptoData])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 2
        }).format(amount)
    }

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        }).format(amount)
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
                   <h2 className="text-2xl font-bold text-red-400 mb-3">Error Loading Data</h2>
                   <p className="text-red-300">{error}</p>
               </div>
           </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Hello, Richard Johnson</h1>
            <p className="text-slate-400">Welcome back to your crypto dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/30 hover:border-purple-500/30 transition-all">
              <Star className="w-6 h-6 text-slate-400" />
            </button>
            <button className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Add Asset
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Portfolio Value Card */}
        <div className="lg:col-span-2 card-dark">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-300 mb-1">Portfolio Value</h3>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-white">$144,129.00</span>
                <div className="flex items-center space-x-1 text-emerald-400">
                  <ArrowUpRight className="w-5 h-5" />
                  <span className="font-semibold">+2.4%</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <CircularProgress 
                percentage={75} 
                size={120} 
                strokeWidth={8}
                color="url(#portfolioGradient)"
              />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          {/* Mini Chart */}
          <div className="h-24 bg-slate-800/30 rounded-2xl p-4 mb-4">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polyline
                points="0,60 50,40 100,45 150,30 200,35 250,25 300,20 350,30"
                fill="url(#chartGradient)"
                stroke="#a855f7"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mb-2"></div>
                <span className="text-sm text-slate-400">BTC</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mb-2"></div>
                <span className="text-sm text-slate-400">ETH</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full mb-2"></div>
                <span className="text-sm text-slate-400">Others</span>
              </div>
            </div>
            <button className="btn-secondary text-sm">View Details</button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="card-dark">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">USD Balance</h4>
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">$237,801.00</div>
            <div className="flex items-center text-emerald-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span className="text-sm">+5.2% today</span>
            </div>
          </div>

          <div className="card-dark">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">BTC Dominance</h4>
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{marketStats.btcDominance.toFixed(1)}%</div>
            <div className="flex items-center text-red-400">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              <span className="text-sm">-0.3% today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Cryptocurrencies */}
      <div className="card-dark mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Top Cryptocurrencies</h3>
          <button className="btn-secondary">View All</button>
        </div>
        
        <div className="space-y-4">
          {cryptoData.slice(0, 5).map((coin, index) => (
            <div key={coin.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl hover:bg-slate-800/50 transition-all">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{coin.name}</h4>
                  <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-white">{formatPrice(coin.current_price)}</div>
                <div className={`text-sm flex items-center ${
                  coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {coin.price_change_percentage_24h >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
              
              <div className="w-16 h-8">
                <svg className="w-full h-full">
                  {coin.sparkline_in_7d?.price && (
                    <polyline
                      points={coin.sparkline_in_7d.price.slice(-10).map((price, index) => 
                        `${(index / 9) * 60},${30 - ((price - Math.min(...coin.sparkline_in_7d.price.slice(-10))) / 
                        (Math.max(...coin.sparkline_in_7d.price.slice(-10)) - Math.min(...coin.sparkline_in_7d.price.slice(-10)))) * 20}`
                      ).join(' ')}
                      fill="none"
                      stroke={coin.price_change_percentage_24h >= 0 ? "#10b981" : "#ef4444"}
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{formatCurrency(marketStats.totalMarketCap)}</div>
              <div className="text-sm text-slate-400">Market Cap</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{formatCurrency(marketStats.totalVolume)}</div>
              <div className="text-sm text-slate-400">24h Volume</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-2xl">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{marketStats.activeCoins}</div>
              <div className="text-sm text-slate-400">Active Coins</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-500/20 rounded-2xl">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">2.4M+</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Dashboard