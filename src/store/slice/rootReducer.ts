import loadingReducer from './loadingSlice'
import photoReducer from './photoSlice'
const rootReducer = {
    loading: loadingReducer,
    photo: photoReducer,
}
export default rootReducer
