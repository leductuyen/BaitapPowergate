import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
    isLoading: boolean
}

const initialState: LoadingState = {
    isLoading: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoading(state) {
            state.isLoading = true
        },
        hiddenLoading(state) {
            state.isLoading = false
        },
    },
})

//actions
export const { showLoading, hiddenLoading } = loadingSlice.actions

//selector
export const selectLoadingStatus = (state: any) => state.loading.isLoading

//reducers
const loadingReducer = loadingSlice.reducer
export default loadingReducer
