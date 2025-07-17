import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, TrendingUp, Search, Bell, Wallet, Home, BarChart3, Newspaper, Settings } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/portfolio', label: 'Portfolio', icon: Wallet },
        { path: '/markets', label: 'Markets', icon: BarChart3 },
        { path: '/news', label: 'News', icon: Newspaper },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">HODLIT</span>
                <div className="text-xs text-slate-400 -mt-1">Crypto Tracker</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search crypto..."
                className="pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 w-80 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
            <button className="p-3 text-slate-400 hover:text-white transition-colors rounded-2xl hover:bg-slate-800/50 relative">
              <Bell className="w-6 h-6" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></div>
            </button>
            <button className="p-3 text-slate-400 hover:text-white transition-colors rounded-2xl hover:bg-slate-800/50">
              <Settings className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold">RJ</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-3 rounded-2xl hover:bg-slate-800/50 transition-all duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/30">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="px-4 py-4 border-t border-slate-700/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">RJ</span>
              </div>
              <div>
                <div className="text-white font-semibold">Richard Johnson</div>
                <div className="text-slate-400 text-sm">Premium Member</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
    )
};

export default Navbar;