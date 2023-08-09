import {useState, useEffect, useReducer, useContext} from 'react'
import ManageContext from './ManageContext'
import useAlert from '../../../../Hooks/useAlert'
import useAuth from '../../../../Hooks/useAuth'
import ValidateSong from '../../Pages/Manage/Song/ValidateSong'
import axios from 'axios'
import Context from '../../../User/Context/Context'

const ManageContextProvider = (props) => {
    const getFormattedDate = (date) => {
        const myDate = new Date(date)
        const year = myDate.toLocaleString("default", { year: "numeric" });
        const month = myDate.toLocaleString("default", { month: "2-digit" });
        const day = myDate.toLocaleString("default", { day: "2-digit" });
        const formattedDate = year + "-" + month + "-" + day;
        return formattedDate
    }
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()
    const [song, setSong] = useState({})
    const userCtx = useContext(Context)
    const [allSongs, setAllSongs] = useState([])
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
    const getSongs = () => {
        dispatchPending({type: 'PENDING'})
        setTimeout(()=>{
            axios.get('https://toby-peter-production.up.railway.app/api/song/')
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
        await axios.get(`https://toby-peter-production.up.railway.app/api/song/${id}`)
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
        await axios.delete(`https://toby-peter-production.up.railway.app/api/song/delete/${id}`,{
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
    const value = {
        pending:pending,
        allSongs:allSongs,
        createData:createData,
        updateData:updateData,
        createDataErrors:createDataErrors,
        updateDataErrors:updateDataErrors,
        getSong:getSong,
        deleteSong:deleteSong,
        handleCreateDataChange:handleCreateDataChange,
        handleUpdateDataChange:handleUpdateDataChange,
        handleCreateFileChange:handleCreateFileChange,
        handleCreateSubmit:handleCreateSubmit,
        handleUpdateSubmit:handleUpdateSubmit,
    }
    return ( 
        <ManageContext.Provider value = {value}>
            {props.children}
        </ManageContext.Provider>
    );
}
export default ManageContextProvider;