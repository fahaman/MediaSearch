/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { removeCollection, removeToast } from '../redux/features/collectionSlice'
import { setPreviewItem } from '../redux/features/searchSlice'

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()

    const removeFromCollection = (e) => {
        e.stopPropagation()
        dispatch(removeCollection(item.id))
        dispatch(removeToast())
    }

    const handleCardClick = () => {
        dispatch(setPreviewItem(item))
    }

    return (
        <div 
            onClick={handleCardClick}
            className="w-full h-72 relative group bg-[#2A1A0E] rounded-xl overflow-hidden shadow border border-[#422A18] hover:border-[#F4AE52]/40 transition cursor-pointer flex flex-col justify-end"
        >
            {/* Media Content */}
            <div className="absolute inset-0 bg-[#1c1109] overflow-hidden">
                {item.type === 'photo' && (
                    <img 
                        loading="lazy"
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300" 
                        src={item.thumbnail || item.src} 
                        alt={item.title || 'Photo'} 
                    />
                )}
                {item.type === 'video' && (
                    <video 
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        src={item.src} 
                    />
                )}
                {item.type === 'gif' && (
                    <img 
                        loading="lazy"
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300" 
                        src={item.thumbnail || item.src} 
                        alt={item.title || 'GIF'} 
                    />
                )}
            </div>

            {/* Card Overlay */}
            <div className="card-overlay relative z-10 p-4 flex items-end justify-between gap-3 pt-12">
                <div className="flex-1 overflow-hidden">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#1c1109] text-[#F4AE52] rounded border border-[#422A18] mb-1">
                        {item.type}
                    </span>
                    <h2 className="text-sm font-semibold text-[#FEF3E2] capitalize line-clamp-1">
                        {item.title || 'Untitled Media'}
                    </h2>
                </div>

                {/* Remove Button */}
                <button
                    onClick={removeFromCollection}
                    className="p-2 rounded-lg bg-[#2A1A0E] hover:bg-[#D4621A] text-[#FEF3E2]/70 hover:text-[#FEF3E2] border border-[#422A18] transition active:scale-95 cursor-pointer flex items-center justify-center"
                    title="Remove from Collection"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CollectionCard