/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { toggleCollection } from '../redux/features/collectionSlice'
import { setPreviewItem } from '../redux/features/searchSlice'

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()
    const collection = useSelector(state => state.collection.items)

    const isSaved = collection.some(i => i.id === item.id)

    const handleToggleSave = (e) => {
        e.stopPropagation()
        dispatch(toggleCollection(item))
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

                {/* Save Button */}
                <button
                    onClick={handleToggleSave}
                    className={`p-2 rounded-lg transition active:scale-95 cursor-pointer flex items-center justify-center ${
                        isSaved 
                            ? 'bg-[#D4621A] text-[#FEF3E2] shadow' 
                            : 'bg-[#2A1A0E] text-[#FEF3E2]/70 hover:text-[#FEF3E2] hover:bg-[#382414] border border-[#422A18]'
                    }`}
                    title={isSaved ? "Saved in Collection" : "Save to Collection"}
                >
                    <svg className={`w-4 h-4 ${isSaved ? 'fill-current' : 'none'}`} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ResultCard