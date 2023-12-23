import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { selectAccessToken } from "./AuthSlice";
import axios from "axios";

const initialState = {
    status: {
        subscribers: 'idle',
    },
    subscribers: []
}

const subscribersUrl = `${process.env.REACT_APP_BASE_URL}/subscribe/`

export const fetchSubscribers = createAsyncThunk('StateSlices/AdminSlices/fetchSubscribers', async(_, {getState}) => {
    const token = selectAccessToken(getState())
    try{
        const response = await axios.get(subscribersUrl,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        return response.data
    }
    catch(err){
        return err.message
    }
})

const HomeSlice = createSlice({
    name: 'adminHome',
    initialState: initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
            .addCase(fetchSubscribers.pending, (state, action)=>{
                state.status.subscribers = 'pending'
            })
            .addCase(fetchSubscribers.fulfilled, (state, action)=>{
                state.status.subscribers = 'success'
                state.subscribers = [...action.payload.allSubscribers]
            })
            .addCase(fetchSubscribers.rejected, (state, action)=>{
                state.status.subscribers = 'failed'
            })
    }
})

export default HomeSlice.reducer