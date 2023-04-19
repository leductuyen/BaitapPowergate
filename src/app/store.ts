import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../store/slice/rootReducer'

export const store = configureStore({
    reducer: rootReducer,
})
