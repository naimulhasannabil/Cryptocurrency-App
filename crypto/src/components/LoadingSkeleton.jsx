const LoadingSkeleton = () => {
    return(
        <div className="animate-pulse space-y-8">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-16 py-16">
        <div className="loading-shimmer h-16 w-96 mx-auto mb-6 rounded-2xl"></div>
        <div className="loading-shimmer h-8 w-128 mx-auto mb-10 rounded-xl"></div>
        <div className="flex justify-center space-x-6">
          <div className="loading-shimmer h-14 w-40 rounded-xl"></div>
          <div className="loading-shimmer h-14 w-40 rounded-xl"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="loading-shimmer h-4 w-24 mb-3 rounded"></div>
                <div className="loading-shimmer h-8 w-32 mb-2 rounded"></div>
                <div className="loading-shimmer h-3 w-16 rounded"></div>
              </div>
              <div className="loading-shimmer w-12 h-12 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Gainers & Losers Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {[...Array(2)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="loading-shimmer h-6 w-40 rounded"></div>
              <div className="loading-shimmer w-6 h-6 rounded"></div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="loading-shimmer w-6 h-6 rounded"></div>
                    <div className="loading-shimmer w-10 h-10 rounded-full"></div>
                    <div>
                      <div className="loading-shimmer h-4 w-20 mb-1 rounded"></div>
                      <div className="loading-shimmer h-3 w-12 rounded"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="loading-shimmer h-4 w-16 mb-1 rounded"></div>
                    <div className="loading-shimmer h-3 w-12 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Crypto Cards Skeleton */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="loading-shimmer h-8 w-64 rounded"></div>
          <div className="loading-shimmer h-10 w-32 rounded-xl"></div>
        </div>
        <div className="crypto-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="crypto-card-enhanced">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="loading-shimmer w-14 h-14 rounded-full"></div>
                  <div>
                    <div className="loading-shimmer h-5 w-20 mb-2 rounded"></div>
                    <div className="loading-shimmer h-3 w-12 rounded"></div>
                  </div>
                </div>
                <div className="loading-shimmer w-10 h-10 rounded-xl"></div>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="loading-shimmer h-8 w-24 rounded"></div>
                  <div className="loading-shimmer h-6 w-16 rounded-full"></div>
                </div>
                <div className="loading-shimmer h-4 w-32 rounded"></div>
              </div>
              <div className="loading-shimmer h-20 w-full mb-6 rounded-xl"></div>
              <div className="flex space-x-3">
                <div className="loading-shimmer h-10 flex-1 rounded-xl"></div>
                <div className="loading-shimmer h-10 flex-1 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="loading-shimmer h-6 w-40 rounded"></div>
          <div className="loading-shimmer h-4 w-32 rounded"></div>
        </div>
        <div className="loading-shimmer h-64 w-full rounded-xl"></div>
      </div>
    </div>
    )
}

export default LoadingSkeleton;