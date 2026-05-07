import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductAdd from './pages/ProductAdd'
import ProductEdit from './pages/ProductEdit'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary transition-colors duration-300">
        <header className="glass-nav">
          <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-pink-500 rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-12 transition-all duration-500">
                <span className="text-white font-black text-sm">SM</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg md:text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Manajer Toko
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mt-0.5">Sistem Inventaris</span>
              </div>
            </Link>
            
            <nav className="flex items-center gap-2 md:gap-6">
              <Link to="/" className="hidden md:block text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                Beranda
              </Link>
              
              <button 
                onClick={toggleDarkMode}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/50 border border-border hover:bg-muted transition-all duration-300 group"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 6.364l.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <Link to="/add" className="btn-primary scale-90 md:scale-100">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Tambah Produk</span>
                <span className="sm:hidden">Tambah</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<ProductAdd />} />
              <Route path="/edit/:id" element={<ProductEdit />} />
            </Routes>
          </div>
        </main>
        
        <footer className="border-t py-12 mt-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              &copy; 2026 Manajer Toko. Didesain dengan keunggulan visual.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
