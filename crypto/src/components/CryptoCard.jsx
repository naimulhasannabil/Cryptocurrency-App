import { useState } from "react";
import { Star, Plus, TrendingUp, TrendingUpDown, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";

const CryptoCard = ({ coin, onAddtoWatchlist, onAddToPortfolio }) => {
    const [isWatchlisted, setIsWatchlisted] = useState(false)
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [amount, setAmount] = useState('')

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

    const handleWatchlist = () => {
        setIsWatchlisted(!isWatchlisted)
        onAddtoWatchlist(coin)
    }

    const handleBuy = () => {
        if (amount && parseFloat(amount) > 0) {
            onAddToPortfolio(coin, parseFloat(amount))
            setShowBuyModal(false)
            setAmount('')
        }
    }

    const isPositive = coin.price_change_percentage_24h > 0

    return (
        <>
      <div className="crypto-card group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={coin.image} 
                alt={coin.name} 
                className="w-14 h-14 rounded-full ring-2 ring-slate-700 group-hover:ring-purple-500/50 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {coin.name}
              </h3>
              <p className="text-sm text-slate-400 font-medium">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <button 
            onClick={handleWatchlist}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isWatchlisted 
                ? 'text-yellow-400 bg-yellow-400/20 ring-2 ring-yellow-400/30' 
                : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10'
            }`}
          >
            <Star className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl font-bold text-white">
              {formatCurrency(coin.current_price)}
            </span>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isPositive 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="text-sm font-semibold">
                {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Market Cap</span>
            <span className="text-slate-300 font-medium">{formatMarketCap(coin.market_cap)}</span>
          </div>
        </div>

        {/* Enhanced Mini Chart */}
        <div className="mb-6 h-20 relative bg-slate-800/30 rounded-2xl p-3">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${coin.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0"/>
              </linearGradient>
            </defs>
            {coin.sparkline_in_7d?.price && (
              <>
                <polyline
                  points={coin.sparkline_in_7d.price.map((price, index) => 
                    `${(index / (coin.sparkline_in_7d.price.length - 1)) * 100},${
                      100 - ((price - Math.min(...coin.sparkline_in_7d.price)) / 
                      (Math.max(...coin.sparkline_in_7d.price) - Math.min(...coin.sparkline_in_7d.price))) * 80
                    }`
                  ).join(' ')}
                  fill={`url(#gradient-${coin.id})`}
                  stroke={isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth="2"
                />
              </>
            )}
          </svg>
          <div className="absolute top-2 right-2 text-xs text-slate-400">7d</div>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={() => setShowBuyModal(true)}
            className="flex-1 btn-primary text-sm py-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Buy Now
          </button>
          <button className="flex-1 btn-secondary text-sm py-3">
            View Details
          </button>
        </div>
      </div>

      {/* Enhanced Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 w-full max-w-md border border-slate-700/50 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-2xl font-bold text-white">Buy {coin.name}</h3>
                <p className="text-slate-400">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Amount ({coin.symbol.toUpperCase()})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field text-lg"
                placeholder="0.00"
                step="0.000001"
              />
            </div>
            
            <div className="bg-slate-700/30 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Current Price:</span>
                <span className="text-white font-semibold">{formatCurrency(coin.current_price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Cost:</span>
                <span className="text-2xl font-bold text-white">
                  {amount ? formatCurrency(parseFloat(amount) * coin.current_price) : '$0.00'}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleBuy}
                className="flex-1 btn-primary text-lg py-4"
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Confirm Purchase
              </button>
              <button
                onClick={() => setShowBuyModal(false)}
                className="flex-1 btn-secondary text-lg py-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    )
};

export default CryptoCard;