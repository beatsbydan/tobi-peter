import {useState, useEffect, useReducer, useContext} from 'react'
import ManageContext from './ManageContext'
import useAlert from '../../../../Hooks/useAlert'
import useAuth from '../../../../Hooks/useAuth'
import ValidateSong from '../../Pages/Manage/Song/ValidateSong'
import axios from 'axios'
import Context from '../../../User/Context/Context'
import { ValidateFiles } from '../../Pages/Manage/Images/CreateImages/ValidateFiles'
import { ValidateBlogs } from '../../Pages/Manage/Blogs/CreateBlogs/ValidateBlogs'

const ManageContextProvider = (props) => {
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()
    const [song, setSong] = useState({})
    const userCtx = useContext(Context)
    const [allSongs, setAllSongs] = useState([])

    // HELPER FUNCTIONS

    const getFormattedDate = (date) => {
        const myDate = new Date(date)
        const year = myDate.toLocaleString("default", { year: "numeric" });
        const month = myDate.toLocaleString("default", { month: "2-digit" });
        const day = myDate.toLocaleString("default", { day: "2-digit" });
        const formattedDate = year + "-" + month + "-" + day;
        return formattedDate
    }

    // PEND STATE
    const initialPendState = {
        isPending: false   
    }
    const pendReducer = (state,action) =>{
        if(action.type === 'PENDING'){
            return{
                isPending: true
            }
        }
        if(action.type === 'COMPLETED'){
            return{
                isPending: false
            }
        }
    }
    const [pending, dispatchPending] = useReducer(pendReducer, initialPendState)

    // SONG

    const getSongs = () => {
        dispatchPending({type: 'PENDING'})
        setTimeout(()=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/song/`)
            .then(res=>{
                if(res.status === 200){
                    setAllSongs(res.data.allSongs)        
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return
            })
        },3000)
    }
    const getSong = async (id) => {
        dispatchPending({type: 'PENDING'})
        await axios.get(`${process.env.REACT_APP_BASE_URL}/song/${id}`)
        .then(res=>{
            if(res.status === 200){
                setSong(res.data.song)
                setUpdateData({
                    date: getFormattedDate(res.data.song.releaseDate),
                    title: res.data.song.title,
                    appleMusic: res.data.song.streamingLink?.appleMusic,
                    spotify: res.data.song.streamingLink?.spotify,
                    audiomack: res.data.song.streamingLink?.audiomack,
                    youtube: res.data.song.streamingLink?.youtube,
                    tidal: res.data.song.streamingLink?.tidal,
                    boomPlay: res.data.song.streamingLink?.boomPlay,
                    youtubeMusic: res.data.song.streamingLink?.youtubeMusic
                })
                dispatchPending({type: 'COMPLETED'})
            }
        })
        .catch(err=>{
            return
        })
    }
    const deleteSong = async (id) =>{
        let success = {}
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/song/delete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.yes = true
                setAlert('success', 'Song Deleted!')
                getSongs()
                userCtx.getSong()
            }
        })
        .catch(err=>{
            success.yes = false
            setAlert('failure', 'Song not deleted!')
            return
        })
        return success
    }
    useEffect(()=>{
        getSongs()
    },[])
    
    const [createDataErrors, setCreateDataErrors] = useState({})
    const [updateDataErrors, setUpdateDataErrors] = useState({})
    const [createFile, setCreateFile] = useState({})
    const [createData, setCreateData] = useState({
        date:'',
        title:'',
        appleMusic: '',
        spotify: '',
        audiomack: '',
        youtube: '',
        tidal: '',
        boomPlay: '',
        youtubeMusic: ''
    })
    const [updateData, setUpdateData] = useState({
        date:'',
        title:'',
        appleMusic: '',
        spotify: '',
        audiomack: '',
        youtube: '',
        tidal: '',
        boomPlay: '',
        youtubeMusic: ''
    })
    const handleCreateFileChange = (e) => {
        setCreateFile(e.target.files[0])
    }
    const handleCreateDataChange = (e) => {
        const {id, value} = e.target;
        setCreateData(prev=>{
            return {...prev, [id]:value}
        })
    }
    const handleUpdateDataChange = (e) => {
        const {id, value} = e.target;
        setUpdateData(prev=>{
            return {...prev, [id]:value}
        })
    }
    const handleCreateSubmit = async () => {
        let success = {}
        const data = {
            title: createData.title,
            releaseDate: createData.date,
            streamingLinks: {
                appleMusic: createData.appleMusic,
                spotify: createData.spotify,
                audiomack: createData.audiomack,
                youtube: createData.youtube,
                tidal: createData.tidal,
                boomPlay: createData.boomPlay,
                youtubeMusic: createData.youtubeMusic
            },
            coverArt: createFile,
            type:'create'
        }
        await ValidateSong(data, authDetails.accessToken)
        .then(res=>{
            setCreateDataErrors(res)
            if(res.none){
                getSongs()
                userCtx.getSong()
                setCreateData({
                    date:'',
                    title:'',
                    appleMusic: '',
                    spotify: '',
                    audiomack: '',
                    youtube: '',
                    tidal: '',
                    boomPlay: '',
                    youtubeMusic: ''
                })
                setCreateFile({})
                success.yes = true
            }
            else{
                success.yes = false
                setAlert('failure', 'Song not created!')
            }
        })
        return success
    }
    const handleUpdateSubmit = async () => {
        let success = {}
        const data = {
            title: updateData.title,
            releaseDate: updateData.date,
            streamingLinks: {
                appleMusic: updateData.appleMusic,
                spotify: updateData.spotify,
                audiomack: updateData.audiomack,
                youtube: updateData.youtube,
                tidal: updateData.tidal,
                boomPlay: updateData.boomPlay,
                youtubeMusic: updateData.youtubeMusic
            },
            type: 'update'
        }
        await ValidateSong(data, authDetails.accessToken, song._id)
        .then(res=>{
            setUpdateDataErrors(res)
            if(res.none){
                getSongs()
                userCtx.getSong()
                setUpdateData({
                    date:'',
                    title:'',
                    appleMusic: '',
                    spotify: '',
                    audiomack: '',
                    youtube: '',
                    tidal: '',
                    boomPlay: '',
                    youtubeMusic: ''
                })
                success.yes = true
            }
            else{
                success.yes = false
                setAlert('failure', 'Song not updated!')
            }
        })
        return success
    }

    // BLOGS
    const [blogData, setBlogData] = useState({
        title: '',
        author: '',
        text: '',
        link: ''
    })
    const [blogErrors, setBlogErrors] = useState({})
    const [blogs, setBlogs] = useState([])
    const handleBlogDataChange = (e) => {
        const {id, value} = e.target
        setBlogData(prev=>{
            return {...prev, [id]: value}
        })
    }
    const handleBlogSubmit = async () => {
        let success = {}
        await ValidateBlogs(blogData, authDetails.accessToken)
        .then(res=>{
            setBlogErrors(res)
            if(res.none){
                getBlogs()
                success.yes = true
                setBlogData({
                    title: '',
                    author: '',
                    text: '',
                    link: ''
                })
            }
            else{
                success.yes = false
                setAlert('failure', 'Blog not created!')
            }
        })
        return success
    }
    const getBlogs = () => {
        dispatchPending({type: 'PENDING'})
        setTimeout(()=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/blog/`)
            .then(res=>{
                if(res.status === 200){
                    setBlogs(res.data.AllBlogs)
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return err
            })
        },3000)
    }
    useEffect(()=>{
        getBlogs()
    },[])
    const deleteBlog = async (id) => {
        let success = {}
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/blog/delete/${id}`,{
            headers:{
                'Content-Type': 'applicstion/json',
                'Authorization': `Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                getBlogs()
                success.yes = true
                setAlert('success', 'Blog deleted!')
            }
        })
        .catch(err=>{
            setAlert('failure', 'Blog not deleted!')
            success.yes = false
            console.log(err)
            return err
        })
        return success
    }

    // BIO-IMAGES
    const [files, setFiles] = useState({})
    const [images, setImages] = useState([])
    const handleFilesChange = (e) => {
        setFiles(e.target.files)
    }
    const handleFilesSubmit = async () => {
        let success = {}
        await ValidateFiles(files, authDetails.accessToken)
        .then(res=>{
            if(res.none){
                getImages()
                userCtx.getImages()
                success.yes = true
                setFiles({})
            }
            else{
                success.yes = false
                setAlert('failure', 'Image(s) not uploaded!')
            }
        })
        return success
    }
    const getImages = () => {
        dispatchPending({type: 'PENDING'})
        setTimeout(()=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/admin/album`)
            .then(res=>{
                if(res.status === 200){
                    setImages(res.data.album)
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                return err
            })
        },3000)
    }
    useEffect(()=>{
        getImages()
    },[])
    const deleteImage = async (url) => {
        let success = {}
        const data = {
            url: url
        }
        await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/delete-slide`, {...data},{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.yes = true
                getImages()
                userCtx.getImages()
                setAlert('success', 'Image deleted!')
            }
        })
        .catch(err=>{
            setAlert('failure', 'Image not deleted!')
            success.yes = false
            return err
        })
        return success
    }

    // CONTEXT VALUES
    const value = {
        blogs:blogs,
        images: images,
        files:files,
        pending:pending,
        allSongs:allSongs,
        blogData:blogData,
        blogErrors: blogErrors,
        createData:createData,
        updateData:updateData,
        createDataErrors:createDataErrors,
        updateDataErrors:updateDataErrors,
        getSong:getSong,
        deleteSong:deleteSong,
        deleteImage:deleteImage,
        deleteBlog:deleteBlog,
        handleCreateDataChange:handleCreateDataChange,
        handleUpdateDataChange:handleUpdateDataChange,
        handleCreateFileChange:handleCreateFileChange,
        handleBlogDataChange: handleBlogDataChange,
        handleBlogSubmit: handleBlogSubmit,
        handleFilesChange:handleFilesChange,
        handleCreateSubmit:handleCreateSubmit,
        handleUpdateSubmit:handleUpdateSubmit,
        handleFilesSubmit:handleFilesSubmit
    }
    return ( 
        <ManageContext.Provider value = {value}>
            {props.children}
        </ManageContext.Provider>
    );
}
export default ManageContextProvider;