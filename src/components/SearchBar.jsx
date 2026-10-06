import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const TRENDING_TAGS = ['Nature', 'Cyberpunk', 'Space', 'Architecture', 'Wallpapers', 'Abstract']

const SearchBar = () => {
    const dispatch = useDispatch()
    const currentQuery = useSelector((state) => state.search.query)
    const [text, setText] = useState(currentQuery || '')

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) return
        dispatch(setQuery(searchTerm.trim()))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        handleSearch(text)
    }

    return (
        <section className="py-10 sm:py-14 px-4 sm:px-8 max-w-5xl mx-auto text-center">
            {/* Title Header */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FEF3E2] mb-3">
                Discover Royalty-Free <span className="text-[#F4AE52]">Media Assets</span>
            </h1>
            <p className="text-[#FEF3E2]/70 text-base max-w-xl mx-auto mb-8">
                Search millions of high-resolution photos, 4K videos, and GIFs from top sources.
            </p>

            {/* Form */}
            <form onSubmit={submitHandler} className="max-w-2xl mx-auto relative flex items-center">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#F4AE52]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full pl-12 pr-28 py-3.5 bg-[#2A1A0E] border border-[#422A18] focus:border-[#D4621A] rounded-xl text-[#FEF3E2] placeholder-[#FEF3E2]/40 outline-none text-base transition shadow-sm"
                        type="text"
                        placeholder="Search photos, videos, or GIFs..."
                    />

                    {text && (
                        <button
                            type="button"
                            onClick={() => setText('')}
                            className="absolute right-24 top-1/2 -translate-y-1/2 text-[#FEF3E2]/60 hover:text-[#FEF3E2] p-1 text-sm"
                        >
                            ✕
                        </button>
                    )}

                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4621A] hover:bg-[#b85012] active:scale-95 text-[#FEF3E2] font-semibold px-5 py-2 rounded-lg transition cursor-pointer text-sm"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Quick Trending Tags */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-[#F4AE52] mr-1">Trending:</span>
                {TRENDING_TAGS.map((tag, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setText(tag)
                            handleSearch(tag)
                        }}
                        className="px-3.5 py-1 rounded-full bg-[#2A1A0E] hover:bg-[#F4AE52] text-[#FEF3E2] hover:text-[#2A1A0E] border border-[#422A18] font-medium transition cursor-pointer"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default SearchBar