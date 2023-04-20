import { createSlice } from '@reduxjs/toolkit'

interface Photo {
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

interface PhotoState {
    photos: Photo[]
}

const initialState: PhotoState = {
    photos: [],
}
const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        dataPhotos(state, action) {
            state.photos = action.payload
        },
        resetPhoto(state) {
            state.photos = []
        },
    },
})

// actions
export const { dataPhotos, resetPhoto } = photoSlice.actions

// selector
export const selectorPhotos = (state: any) => state.photo.photos

// reducers
const photoReducer = photoSlice.reducer
export default photoReducer
