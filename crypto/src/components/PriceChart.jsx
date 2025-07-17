const PriceChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-400">
                <p>No chart data available</p>
            </div>
        )
    }

    // Simple bar chart representation
    const maxPrice = Math.max(...data.map(coin => coin.current_price))
    const minPrice = Math.max(...data.map(coin => coin.current_price))
    const priceRange = maxPrice - minPrice

    return (
        <div className="h-64 flex items-end justify-between space-x-2 p-4">
      {data.map((coin, index) => {
        const height = priceRange > 0 ? ((coin.current_price - minPrice) / priceRange) * 200 : 100
        const isPositive = coin.price_change_percentage_24h > 0
        
        return (
          <div key={coin.id} className="flex-1 flex flex-col items-center">
            <div
              className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                isPositive ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ height: `${height}px` }}
              title={`${coin.name}: $${coin.current_price.toFixed(2)}`}
            />
            <div className="mt-2 text-xs text-gray-400 text-center">
              <p className="font-medium">{coin.symbol.toUpperCase()}</p>
              <p className={`${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(1)}%
              </p>
            </div>
          </div>
        )
      })}
    </div>
    )
}

export default PriceChart