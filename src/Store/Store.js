import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './StateSlices/AdminSlices/AuthSlice'
import AdminHomeReducer from './StateSlices/AdminSlices/HomeSlice'
import ManageReducer from './StateSlices/AdminSlices/ManageSlice'
import HomeReducer from './StateSlices/UserSlices/HomeSlice'
import MusicReducer from './StateSlices/UserSlices/MusicSlice'
import ShowsReducer from './StateSlices/UserSlices/ShowsSlice'

const Store = configureStore({
    reducer:{
        auth: AuthReducer,
        home: HomeReducer,
        adminHome: AdminHomeReducer,
        music: MusicReducer,
        shows: ShowsReducer,
        manage: ManageReducer
    }
})

export default Store