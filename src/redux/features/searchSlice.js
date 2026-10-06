import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhotos, fetchVideos, fetchGIF } from '../../api/mediaApi'

const initialHistory = JSON.parse(localStorage.getItem('search_history')) || ['Nature', 'Cyberpunk', 'Space', 'Architecture']

// Async Thunk for fetching media using Redux Toolkit
export const fetchMediaThunk = createAsyncThunk(
    'search/fetchMedia',
    async ({ query, activeTab }, { getState, rejectWithValue }) => {
        try {
            const state = getState().search
            const cacheKey = `${query.toLowerCase().trim()}_${activeTab}`

            // Return cached result only if cache exists and has non-empty items
            if (state.cache[cacheKey] && state.cache[cacheKey].length > 0) {
                return { cacheKey, data: state.cache[cacheKey], isCached: true }
            }

            let data = []
            if (activeTab === 'photos') {
                data = await fetchPhotos(query)
            } else if (activeTab === 'videos') {
                data = await fetchVideos(query)
            } else if (activeTab === 'gif') {
                data = await fetchGIF(query)
            }

            return { cacheKey, data, isCached: false }
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch media assets.')
        }
    }
)

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: '',
        activeTab: 'photos',
        results: [],
        cache: {},
        loading: false,
        error: null,
        history: initialHistory,
        previewItem: null
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
            if (action.payload && !state.history.includes(action.payload)) {
                state.history = [action.payload, ...state.history.slice(0, 7)]
                localStorage.setItem('search_history', JSON.stringify(state.history))
            }
        },
        setActiveTabs(state, action) {
            state.activeTab = action.payload
        },
        clearResults(state) {
            state.results = []
        },
        clearHistory(state) {
            state.history = []
            localStorage.removeItem('search_history')
        },
        setPreviewItem(state, action) {
            state.previewItem = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMediaThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMediaThunk.fulfilled, (state, action) => {
                const { cacheKey, data } = action.payload
                state.results = data || []
                // Only cache if results are non-empty
                if (cacheKey && data && data.length > 0) {
                    state.cache[cacheKey] = data
                }
                state.loading = false
            })
            .addCase(fetchMediaThunk.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const {
    setQuery,
    setActiveTabs,
    clearResults,
    clearHistory,
    setPreviewItem
} = searchSlice.actions

export default searchSlice.reducer;