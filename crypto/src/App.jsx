import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { CryptoProvider } from './contexts/CryptoContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4 mx-auto'></div>
          <h2 className='text-2xl font-bold text-white mb-2'>HODLIT</h2>
          <p className='text-slate-400'>Loading your crypto dashboard</p>
        </div>
      </div>
    )
  }


  return (
    <CryptoProvider>
      <Router>
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
          <Navbar />
          <main className='pt-20'></main>
        </div>
      </Router>
    </CryptoProvider>
  )
}

export default App
