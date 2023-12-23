import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    status: {
        songs: 'idle'
    },
    songs: []
}

const songsUrl = `${process.env.REACT_APP_BASE_URL}/song/`

export const fetchSongs = createAsyncThunk('StateSlices/AdminSlices/fetchSongs', async ()=>{
    try{
        const response = await axios.get(songsUrl, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
    catch(err){
        return err.message
    }
})


const ManageSlice = createSlice({
    name: 'manage',
    initialState: initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchSongs.pending, (state, action) =>{
                state.status.songs = "pending"
            })
            .addCase(fetchSongs.fulfilled, (state, action) =>{
                state.status.songs = "success"
                state.songs = [...action.payload.allSongs]
            })
            .addCase(fetchSongs.rejected, (state, action) =>{
                state.status.songs ="rejected"
                console.log(action.error)
            })
    }
})

export default ManageSlice.reducer