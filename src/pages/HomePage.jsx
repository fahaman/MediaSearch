import { useSelector } from 'react-redux'
import ResultGrid from '../components/ResultGrid'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import MediaModal from '../components/MediaModal'

const HomePage = () => {
    const { query } = useSelector((store) => store.search)

    return (
        <div className="min-h-screen pb-16">
            <SearchBar />

            {query ? (
                <div>
                    <Tabs />
                    <ResultGrid />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto px-4 text-center pt-2 pb-12">
                    <div className="p-8 sm:p-10 rounded-2xl bg-[#2A1A0E] border border-[#422A18] shadow-lg">
                        <div className="w-14 h-14 rounded-xl bg-[#D4621A]/20 text-[#F4AE52] border border-[#D4621A]/30 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-[#FEF3E2] mb-2">
                            High-Resolution Photos, Videos & GIFs
                        </h2>
                        <p className="text-[#FEF3E2]/70 text-sm sm:text-base max-w-lg mx-auto">
                            Type any search keyword above or tap a trending topic to browse royalty-free visual assets.
                        </p>
                    </div>
                </div>
            )}

            {/* Lightbox Modal */}
            <MediaModal />
        </div>
    )
}

export default HomePage