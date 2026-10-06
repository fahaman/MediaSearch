import { createSlice } from "@reduxjs/toolkit";
import { toast, Zoom } from 'react-toastify';

const initialState = {
    items: JSON.parse(localStorage.getItem('collection')) || []
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        toggleCollection: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index, 1);
                toast.info('Removed from Collection 🗑️', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    theme: "dark",
                    transition: Zoom,
                });
            } else {
                state.items.push(action.payload);
                toast.success('Saved to Collection ❤️', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    theme: "dark",
                    transition: Zoom,
                });
            }
            localStorage.setItem('collection', JSON.stringify(state.items));
        },
        addCollection: (state, action) => {
            const alreadyExists = state.items.find(
                item => item.id === action.payload.id
            )
            if (!alreadyExists) {
                state.items.push(action.payload);
                localStorage.setItem('collection', JSON.stringify(state.items))
            }
        },
        removeCollection: (state, action) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            )
            localStorage.setItem('collection', JSON.stringify(state.items))
        },
        clearCollection: (state) => {
            state.items = []
            localStorage.removeItem('collection')
            toast.warn('Collection Cleared 🧹', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "dark"
            });
        },
        addedToast: () => {
            toast.success('Saved to Collection ❤️', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "dark",
                transition: Zoom,
            });
        },
        removeToast: () => {
            toast.info('Removed from Collection 🗑️', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "dark",
                transition: Zoom,
            });
        }
    }
})

export const {
    toggleCollection,
    addCollection,
    removeCollection,
    clearCollection,
    addedToast,
    removeToast,
} = collectionSlice.actions;

export default collectionSlice.reducer;