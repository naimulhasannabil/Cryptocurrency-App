import { useState, useEffect } from "react";
import { Calendar, ExternalLink, TrendingUp, Clock, User, ArrowUpRight } from "lucide-react";

const News = () => {
    const [newsArticles, setNewsArticles] = useState([])
    const [loading, setLoading] = useState(true)

    // Mock news data
    const mockNews = [
        {
          id: 1,
          title: "Bitcoin Reaches New All-Time High as Institutional Adoption Continues",
          description: "Major financial institutions are increasingly adding Bitcoin to their portfolios, driving unprecedented demand and price growth across the cryptocurrency market.",
          publishedAt: "2024-01-15T10:30:00Z",
          source: "CryptoNews",
          author: "Sarah Johnson",
          url: "#",
          image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Market Analysis"
        },
        {
          id: 2,
          title: "Ethereum 2.0 Staking Rewards Attract Millions of Investors",
          description: "The transition to Ethereum 2.0 has created new opportunities for passive income through staking, with over $50 billion already locked in the protocol.",
          publishedAt: "2024-01-15T08:15:00Z",
          source: "BlockchainDaily",
          author: "Michael Chen",
          url: "#",
          image: "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Technology"
        },
        {
          id: 3,
          title: "DeFi Protocol Launches Revolutionary Yield Farming Program",
          description: "A new decentralized finance protocol is offering unprecedented returns through innovative yield farming mechanisms and liquidity mining programs.",
          publishedAt: "2024-01-15T07:45:00Z",
          source: "DeFi Weekly",
          author: "Alex Rodriguez",
          url: "#",
          image: "https://images.pexels.com/photos/8360873/pexels-photo-8360873.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "DeFi"
        },
        {
          id: 4,
          title: "Regulatory Clarity Brings Institutional Confidence to Crypto Markets",
          description: "Recent regulatory guidelines have provided much-needed clarity for institutional investors looking to enter the cryptocurrency space with confidence.",
          publishedAt: "2024-01-15T06:20:00Z",
          source: "Financial Times",
          author: "Emma Thompson",
          url: "#",
          image: "https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Regulation"
        },
        {
          id: 5,
          title: "NFT Market Shows Signs of Recovery with New Gaming Integrations",
          description: "The NFT market is experiencing renewed interest as gaming companies integrate blockchain technology into their platforms, creating new use cases.",
          publishedAt: "2024-01-15T05:00:00Z",
          source: "NFT Insider",
          author: "David Kim",
          url: "#",
          image: "https://images.pexels.com/photos/7567442/pexels-photo-7567442.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "NFTs"
        },
        {
          id: 6,
          title: "Central Bank Digital Currencies (CBDCs) Gain Momentum Globally",
          description: "Multiple countries are accelerating their CBDC development programs, potentially reshaping the global financial landscape in the coming years.",
          publishedAt: "2024-01-15T04:30:00Z",
          source: "Global Finance",
          author: "Lisa Wang",
          url: "#",
          image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "CBDCs"
        }
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setNewsArticles(mockNews)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const formatData = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getTimeAgo = (dateString) => {
    const now = new Date()
    const publishedDate = new Date(dateString)
    const diffInHours = Math.floor((now - publishedDate) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Market Analysis': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Technology': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'DeFi': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Regulation': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'NFTs': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'CBDCs': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    }
    return colors[category] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Crypto News</h1>
          <p className="text-slate-400">Stay updated with the latest cryptocurrency news</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="loading-shimmer h-48 rounded-2xl mb-6"></div>
              <div className="loading-shimmer h-4 mb-3"></div>
              <div className="loading-shimmer h-4 w-3/4 mb-6"></div>
              <div className="loading-shimmer h-3 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Crypto News</h1>
        <p className="text-slate-400">Stay updated with the latest cryptocurrency news and market insights</p>
      </div>

      {/* Featured Article */}
      <div className="card-dark mb-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={newsArticles[0]?.image}
              alt={newsArticles[0]?.title}
              className="w-full h-80 object-cover rounded-2xl"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(newsArticles[0]?.category)}`}>
                {newsArticles[0]?.category}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              <span className="text-lg font-semibold text-purple-400">Featured Story</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{newsArticles[0]?.title}</h2>
            <p className="text-slate-300 mb-6 text-lg leading-relaxed">{newsArticles[0]?.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-slate-400">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{newsArticles[0]?.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{getTimeAgo(newsArticles[0]?.publishedAt)}</span>
                </div>
              </div>
              <a href={newsArticles[0]?.url} className="btn-primary">
                Read Article
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.slice(1).map((article) => (
          <div key={article.id} className="crypto-card group">
            <div className="relative mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-xs font-medium">{getTimeAgo(article.publishedAt)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-sm text-purple-400 font-semibold">{article.source}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-purple-300 transition-colors">
              {article.title}
            </h3>
            
            <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">{article.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-slate-500">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{article.author}</span>
                </div>
              </div>
              <a 
                href={article.url} 
                className="text-purple-400 hover:text-purple-300 transition-colors p-2 hover:bg-purple-500/10 rounded-lg"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="btn-primary text-lg px-8 py-4">
          Load More Articles
        </button>
      </div>
    </div>
  )

}

export default News