import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CollectionCard from "../components/CollectionCard"
import MediaModal from "../components/MediaModal"
import { clearCollection } from '../redux/features/collectionSlice'

const CollectionPage = () => {
  const collection = useSelector(state => state.collection.items)
  const dispatch = useDispatch()

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire collection?')) {
      dispatch(clearCollection())
    }
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {collection.length > 0 ? (
        <div>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#422A18] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FEF3E2]">
                  Your Collection
                </h1>
                <span className="px-3 py-1 text-xs font-bold bg-[#F4AE52]/20 text-[#F4AE52] border border-[#F4AE52]/30 rounded-full">
                  {collection.length} {collection.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-[#FEF3E2]/70 text-sm mt-1">
                Saved photos, videos, and GIFs stored locally in your collection.
              </p>
            </div>

            <button 
              onClick={clearAll} 
              className="self-start sm:self-auto active:scale-95 transition cursor-pointer bg-[#D4621A]/20 hover:bg-[#D4621A] text-[#FEF3E2] border border-[#D4621A]/40 px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Collection
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {collection.map((item) => (
              <CollectionCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto py-16 text-center">
          <div className="w-20 h-20 bg-[#2A1A0E] border border-[#422A18] rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl">
            ❤️
          </div>
          <h2 className="text-2xl font-bold text-[#FEF3E2] mb-2">
            Your Collection is Empty
          </h2>
          <p className="text-[#FEF3E2]/70 text-sm mb-8">
            You haven't saved any photos, videos, or GIFs yet. Explore and save your favorite media assets!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4621A] hover:bg-[#b85012] text-[#FEF3E2] font-semibold text-sm shadow-lg transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Start Searching
          </Link>
        </div>
      )}

      {/* Lightbox Modal */}
      <MediaModal />
    </div>
  )
}

export default CollectionPage