import { useDispatch, useSelector } from 'react-redux'
import { fetchMediaThunk } from '../redux/features/searchSlice'
import { useEffect } from 'react'
import ResultCard from './ResultCard'

const ResultGrid = () => {
    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

    useEffect(() => {
        if (!query) return
        dispatch(fetchMediaThunk({ query, activeTab }))
    }, [query, activeTab, dispatch])

    // Skeleton Loading Cards
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-72 sm:h-80 rounded-xl bg-[#2A1A0E] border border-[#422A18] animate-pulse p-4 flex flex-col justify-end">
                        <div className="h-4 bg-[#382414] rounded w-2/3 mb-2"></div>
                        <div className="h-3 bg-[#382414] rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        )
    }

    // Error View
    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <div className="inline-flex p-4 rounded-2xl bg-[#D4621A]/10 border border-[#D4621A]/30 text-[#D4621A] mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-[#FEF3E2] mb-2">Unable to Load Media</h3>
                <p className="text-[#FEF3E2]/70 text-sm max-w-md mx-auto mb-6">{error}</p>
            </div>
        )
    }

    // Empty Results View
    if (query && results.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-[#FEF3E2] mb-2">No Results Found</h3>
                <p className="text-[#FEF3E2]/70 text-sm max-w-md mx-auto">
                    We couldn't find any {activeTab} matching "<span className="text-[#F4AE52]">{query}</span>". Try searching with different keywords!
                </p>
            </div>
        )
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((item) => (
                    <ResultCard key={`${item.type}-${item.id}`} item={item} />
                ))}
            </div>
        </main>
    )
}

export default ResultGrid