import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    status: 'idle',
    music: {},
    subscription:{
        status: 'idle',
        error: null
    }
}

const musicUrl = `${process.env.REACT_APP_BASE_URL}/song/recent`
const subscriptionUrl = `${process.env.REACT_APP_BASE_URL}/subscribe/create`

export const fetchMusic = createAsyncThunk('StateSlices/UserSlices/fetchMusic', async ()=>{
    try{
        const response = await axios.get(musicUrl, {
            headers:{
                'Content-Type': 'application/json',
            }
        })
        return response.data
    }
    catch(err){
        return err.message
    }
})

export const sendSubscription = createAsyncThunk('StateSlices/UserSlices/sendSubscription', async(formData, {rejectWithValue})=>{
    try{
        const response = await axios.post(subscriptionUrl, {...formData}, {
            headers:{
                'Content-Type':'application/json'
            }
        })
        return response.data
    }
    catch(err){
        if(err.response.status === 403){
            return rejectWithValue("You are registered")
        }
        return err
    }
})

const HomeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers:{
        clearSubscriptionErrors: (state, action) => {
            state.subscription.status = "idle"
            state.subscription.error = null
        }
    },
    extraReducers(builder){
        builder 
            .addCase(fetchMusic.pending, (state, action)=>{
                state.status = 'pending'
            })
            .addCase(fetchMusic.fulfilled, (state, action)=>{
                state.status = 'success'
                state.music = {...action.payload?.recentSong}
            })
            .addCase(fetchMusic.rejected, (state, action)=>{
                state.status = 'failure'
            })
            .addCase(sendSubscription.pending, (state, action)=>{
                state.subscription.status = "pending"
            })
            .addCase(sendSubscription.fulfilled, (state, action)=>{
                state.subscription.status = "success"
            })
            .addCase(sendSubscription.rejected, (state, action)=>{
                state.subscription.status = "failure"
                state.subscription.error = action.payload
            })
    }
})

export const {clearSubscriptionErrors} = HomeSlice.actions

export default HomeSlice.reducer
