import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'

const TABS_CONFIG = [
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'gif', label: 'GIFs', icon: '👾' }
]

const Tabs = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)

    return (
        <div className="flex justify-center my-6 px-4">
            <div className="inline-flex p-1 bg-[#2A1A0E] border border-[#422A18] rounded-xl shadow-sm">
                {TABS_CONFIG.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => dispatch(setActiveTabs(tab.id))}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2 cursor-pointer ${
                                isActive
                                    ? 'bg-[#D4621A] text-[#FEF3E2] shadow-sm'
                                    : 'text-[#FEF3E2]/70 hover:text-[#FEF3E2] hover:bg-[#382414]'
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs