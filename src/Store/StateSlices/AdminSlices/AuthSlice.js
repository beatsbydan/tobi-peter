import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    accessToken: ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    }
})

export const {setAccessToken, setAuthAccessToken} = AuthSlice.actions

export const selectAccessToken = (state) => state.auth.accessToken

export default AuthSlice.reducer