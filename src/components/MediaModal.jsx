import { useSelector, useDispatch } from 'react-redux'
import { setPreviewItem } from '../redux/features/searchSlice'
import { toggleCollection } from '../redux/features/collectionSlice'
import { useState } from 'react'

const MediaModal = () => {
    const dispatch = useDispatch()
    const item = useSelector(state => state.search.previewItem)
    const collection = useSelector(state => state.collection.items)
    const [copied, setCopied] = useState(false)

    if (!item) return null

    const isSaved = collection.some(i => i.id === item.id)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(item.src || item.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1c1109]/90 backdrop-blur-sm">
            <div 
                className="relative w-full max-w-4xl max-h-[90vh] bg-[#2A1A0E] border border-[#422A18] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => dispatch(setPreviewItem(null))}
                    className="absolute top-4 right-4 z-10 p-2 text-[#FEF3E2]/70 hover:text-[#FEF3E2] bg-[#1c1109]/80 hover:bg-[#382414] rounded-full transition"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Media Container */}
                <div className="flex-1 bg-[#1c1109] flex items-center justify-center min-h-[300px] md:min-h-[450px] max-h-[60vh] md:max-h-[85vh] overflow-hidden p-2">
                    {item.type === 'photo' && (
                        <img 
                            src={item.src} 
                            alt={item.title} 
                            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                        />
                    )}
                    {item.type === 'video' && (
                        <video 
                            src={item.src} 
                            controls 
                            autoPlay 
                            loop 
                            className="max-h-full max-w-full rounded-lg shadow-lg"
                        />
                    )}
                    {item.type === 'gif' && (
                        <img 
                            src={item.src} 
                            alt={item.title} 
                            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                        />
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-[#2A1A0E] border-t md:border-t-0 md:border-l border-[#422A18]">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#F4AE52]/20 text-[#F4AE52] border border-[#F4AE52]/30">
                                {item.type}
                            </span>
                            <span className="text-xs text-[#FEF3E2]/60">High Quality</span>
                        </div>

                        <h3 className="text-xl font-bold text-[#FEF3E2] capitalize leading-snug mb-4 line-clamp-3">
                            {item.title || 'Untitled Media'}
                        </h3>
                    </div>

                    <div className="space-y-3 mt-6">
                        <button
                            onClick={() => dispatch(toggleCollection(item))}
                            className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                                isSaved
                                    ? 'bg-[#D4621A]/20 text-[#D4621A] border border-[#D4621A]/40'
                                    : 'bg-[#D4621A] hover:bg-[#b85012] text-[#FEF3E2] shadow-lg'
                            }`}
                        >
                            <svg className={`w-5 h-5 ${isSaved ? 'fill-current' : 'none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {isSaved ? 'Saved in Collection' : 'Save to Collection'}
                        </button>

                        <button
                            onClick={handleCopyLink}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#382414] hover:bg-[#422A18] text-[#FEF3E2] font-medium text-sm flex items-center justify-center gap-2 border border-[#422A18] transition cursor-pointer"
                        >
                            <svg className="w-4 h-4 text-[#F4AE52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {copied ? 'Copied Direct Link!' : 'Copy Direct Link'}
                        </button>

                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 px-4 rounded-xl bg-[#1c1109] text-[#FEF3E2]/70 hover:text-[#FEF3E2] font-medium text-sm flex items-center justify-center gap-2 border border-[#422A18] transition text-center"
                            >
                                <span>View Provider Source ↗</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaModal
