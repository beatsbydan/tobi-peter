import {useState, useEffect, useReducer} from 'react'
import ManageContext from './ManageContext'
import useAlert from '../../../../Hooks/useAlert'
import useAuth from '../../../../Hooks/useAuth'
import ValidateSong from '../../Pages/Manage/Song/ValidateSong'
import axios from 'axios'
import { ValidateFiles } from '../../Pages/Manage/Images/CreateImages/ValidateFiles'
import { ValidateBlogs } from '../../Pages/Manage/Blogs/CreateBlogs/ValidateBlogs'
import useIsProcessing from '../../../../Hooks/useIsProcessing' 
import useUserContext from '../../../../Hooks/useUserContext'

const ManageContextProvider = (props) => {
    const {setAlert} = useAlert()
    const {setProcessing} = useIsProcessing()
    const {getBlogs: getUserBlogs, getSong: getRecentSong, getImages: getUserImages} = useUserContext()
    const {authDetails} = useAuth()
    const [song, setSong] = useState({})
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
                return err
            })
        },3000)
    }
    
    const getSong = async (id) => {
        setProcessing(true)
        dispatchPending({type: 'PENDING'})
        await axios.get(`${process.env.REACT_APP_BASE_URL}/song/${id}`)
        .then(res=>{
            if(res.status === 200){
                setSong(res.data.song)
                setProcessing(false)
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
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            setAlert('failure', 'Something went wrong!')
            return err
        })
    }
    
    const deleteSong = async (id) =>{
        setProcessing(true)
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
                setProcessing(false)
                getRecentSong()
            }
        })
        .catch(err=>{
            success.yes = false
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            setAlert('failure', 'Something went wrong!')
            return err
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
        setProcessing(true)
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
                setProcessing(false)
                getSongs()
                getRecentSong()
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
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Something went wrong!')
            }
        })
        return success
    }
    
    const handleUpdateSubmit = async () => {
        setProcessing(true)
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
                setProcessing(false)
                getSongs()
                getRecentSong()
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
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Something went wrong!')
            }
        })
        return success
    }

    // BLOGS
    
    const [createBlogData, setCreateBlogData] = useState({
        title: '',
        author: '',
        text: '',
        link: ''
    })
    
    const [updateBlogData, setUpdateBlogData] = useState({
        title: '',
        author: '',
        text: '',
        link: ''
    })
    
    const [createBlogErrors, setCreateBlogErrors] = useState({})
    
    const [updateBlogErrors, setUpdateBlogErrors] = useState({})
    
    const [blogs, setBlogs] = useState([])
    
    const handleCreateBlogDataChange = (e) => {
        const {id, value} = e.target
        setCreateBlogData(prev=>{
            return {...prev, [id]: value}
        })
    }
    
    const handleUpdateBlogDataChange = (e) => {
        const {id, value} = e.target
        setUpdateBlogData(prev=>{
            return {...prev, [id]: value}
        })
    }
    
    const handleCreateBlogSubmit = async () => {
        setProcessing(true)
        let success = {}
        const data = {
            title: createBlogData.title,
            author: createBlogData.author,
            text: createBlogData.text,
            link: createBlogData.link,
            type: 'create'
        }
        await ValidateBlogs(data, authDetails.accessToken)
        .then(res=>{
            setCreateBlogErrors(res)
            if(res.none){
                getBlogs()
                getUserBlogs()
                setProcessing(false)
                success.yes = true
                setCreateBlogData({
                    title: '',
                    author: '',
                    text: '',
                    link: ''
                })
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Something went wrong!')
            }
        })
        return success
    }
    
    const handleUpdateBlogSubmit = async () => {
        setProcessing(true)
        let success = {}
        const data = {
            title: updateBlogData.title,
            author: updateBlogData.author,
            text: updateBlogData.text,
            link: updateBlogData.link,
            type: 'update'
        }
        await ValidateBlogs(data, authDetails.accessToken, blog._id)
        .then(res=>{
            setUpdateBlogErrors(res)
            if(res.none){
                getBlogs()
                setProcessing(false)
                getUserBlogs()
                success.yes = true
                setUpdateBlogData({
                    title: '',
                    author: '',
                    text: '',
                    link: ''
                })
            }
            else{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                success.yes = false
                setAlert('failure', 'Something went wrong!')
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
        setProcessing(true)
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
                getUserBlogs()
                setProcessing(false)
                success.yes = true
                setAlert('success', 'Blog deleted!')
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            setAlert('failure', 'Something went wrong!')
            success.yes = false
            return err
        })
        return success
    }
    
    const [blog, setBlog] = useState({})
    
    const getBlog = (id) => {
        setProcessing(true)
        dispatchPending({type: 'PENDING'})
        setTimeout(()=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/blog/${id}`)
            .then(res=>{
                if(res.status === 200){
                    setBlog(res.data.blog)
                    setProcessing(false)
                    setUpdateBlogData({
                        title: res.data.blog.title,
                        author: res.data.blog.author,
                        text: res.data.blog.text,
                        link: res.data.blog.link
                    })
                    dispatchPending({type: 'COMPLETED'})
                }
            })
            .catch(err=>{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Something went wrong!')
                return err
            })
        },3000)
    }

    // BIO-IMAGES
    
    const [files, setFiles] = useState({})
    
    const [images, setImages] = useState([])
    
    const handleFilesChange = (e) => {
        setFiles(e.target.files)
    }
    
    const handleFilesSubmit = async () => {
        setProcessing(true)
        let success = {}
        await ValidateFiles(files, authDetails.accessToken)
        .then(res=>{
            if(res.none){
                getImages()
                getUserImages()
                setProcessing(false)
                success.yes = true
                setFiles({})
            }
            else{
                success.yes = false
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Something went wrong!')
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
        setProcessing(true)
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
                setProcessing(false)
                getUserImages()
                setAlert('success', 'Image deleted!')
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            setAlert('failure', 'Something went wrong!')
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
        createBlogData:createBlogData,
        updateBlogData:updateBlogData,
        createBlogErrors: createBlogErrors,
        updateBlogErrors: updateBlogErrors,
        createData:createData,
        updateData:updateData,
        createDataErrors:createDataErrors,
        updateDataErrors:updateDataErrors,
        getSong:getSong,
        getBlog: getBlog,
        deleteSong:deleteSong,
        deleteImage:deleteImage,
        deleteBlog:deleteBlog,
        handleCreateDataChange:handleCreateDataChange,
        handleUpdateDataChange:handleUpdateDataChange,
        handleCreateFileChange:handleCreateFileChange,
        handleCreateBlogDataChange: handleCreateBlogDataChange,
        handleUpdateBlogDataChange: handleUpdateBlogDataChange,
        handleCreateBlogSubmit: handleCreateBlogSubmit,
        handleUpdateBlogSubmit: handleUpdateBlogSubmit,
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