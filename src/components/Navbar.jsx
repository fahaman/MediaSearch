import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const location = useLocation()
  const collectionCount = useSelector((state) => state.collection.items.length)

  return (
    <header className="sticky top-0 z-40 w-full bg-[#2A1A0E] border-b border-[#422A18] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#D4621A] flex items-center justify-center shadow-md group-hover:bg-[#b85012] transition">
            <svg className="w-6 h-6 text-[#FEF3E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-[#FEF3E2]">
              Media<span className="text-[#F4AE52]">Search</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
              location.pathname === '/'
                ? 'bg-[#D4621A] text-[#FEF3E2]'
                : 'text-[#FEF3E2]/80 hover:text-[#FEF3E2] hover:bg-[#382414]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>

          <Link
            to="/collection"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
              location.pathname === '/collection'
                ? 'bg-[#D4621A] text-[#FEF3E2]'
                : 'text-[#FEF3E2]/80 hover:text-[#FEF3E2] hover:bg-[#382414]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Collection
            {collectionCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-[#F4AE52] text-[#2A1A0E] rounded-full">
                {collectionCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar