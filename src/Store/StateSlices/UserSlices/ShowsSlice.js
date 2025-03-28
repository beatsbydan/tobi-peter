import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    status: {
        all: 'idle',
    },
    shows: {
        allShows: {
            upcomingShows: [],
            pastShows: []
        },
        upcomingShows: [],
        pastShows: []
    }
}

const filterShows = (shows) => {
    if(shows.length > 0){
        return shows.slice(0, 3)
    }
    else{
        return []
    }
}

const showsUrl = `${process.env.REACT_APP_BASE_URL}/show/`

export const fetchShows = createAsyncThunk('StateSlices/UserSlices/fetchShows', async ()=>{
    try{
        const response = await axios.get(showsUrl, {
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

const ShowsSlice = createSlice({
    name: 'shows',
    initialState: initialState,
    extraReducers(builder){
        builder 
            .addCase(fetchShows.pending, (state, action)=>{
                state.status.all = 'pending'
            })
            .addCase(fetchShows.fulfilled, (state, action)=>{
                state.status.all = 'success'
                state.shows.allShows.upcomingShows = [...action.payload?.pendingShows]
                state.shows.upcomingShows = filterShows([...action.payload?.pendingShows])
                state.shows.allShows.pastShows = [...action.payload?.completedShows]
                state.shows.pastShows = filterShows([...action.payload?.completedShows])
            })
            .addCase(fetchShows.rejected, (state, action)=>{
                state.status.all = 'rejected'
            })
    }

})

export default ShowsSlice.reducer
