import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    status: {
        images: 'idle',
        blogs: 'idle'
    },
    images: [],
    blogs: []
}

const imagesUrl = `${process.env.REACT_APP_BASE_URL}/admin/album`
const blogsUrl = `${process.env.REACT_APP_BASE_URL}/blog/`

export const fetchImages = createAsyncThunk('StateSlices/UserSlices/fetchImages', async ()=>{
    try{
        const response = await axios.get(imagesUrl, {
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

export const fetchBlogs = createAsyncThunk('StateSlices/fetchBlogs', async ()=>{
    try{
        const response = await axios.get(blogsUrl, {
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

const MusicSlice = createSlice({
    name: 'music',
    initialState: initialState,
    extraReducers(builder){
        builder 
            .addCase(fetchImages.pending, (state, action)=>{
                state.status.images = 'pending'
            })
            .addCase(fetchImages.fulfilled, (state, action)=>{
                state.status.images = 'success'
                state.images = [...action.payload.album]
            })
            .addCase(fetchImages.rejected, (state, action)=>{
                state.status.images = 'rejected'
                console.log(action.error)
            })
            .addCase(fetchBlogs.pending, (state, action)=>{
                state.status.blogs = 'pending'
            })
            .addCase(fetchBlogs.fulfilled, (state, action)=>{
                state.status.blogs = 'success'
                state.blogs = [...action.payload.AllBlogs]
            })
            .addCase(fetchBlogs.rejected, (state, action)=>{
                state.status.blogs = 'rejected'
            })
    }

})

export const {h} = MusicSlice.actions

export default MusicSlice.reducer
