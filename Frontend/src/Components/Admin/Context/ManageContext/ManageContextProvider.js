import {useState, useEffect, useReducer} from 'react'
import ManageContext from './ManageContext'
import useAlert from '../../../../Hooks/useAlert'
import useAuth from '../../../../Hooks/useAuth'
import ValidateSong from '../../Pages/Manage/Song/ValidateSong'
import axios from 'axios'

const ManageContextProvider = (props) => {
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()
    const [song, setSong] = useState({})
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
                console.log(err)
            })
        },3000)
    }
    const getSong = async (id) => {
        dispatchPending({type: 'PENDING'})
        await axios.get(`htps://toby-peter-production.up.railway.app/api/song/${id}`)
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                setSong(res.data.song)
                dispatchPending({type: 'COMPLETED'})
            }
        })
        .catch(err=>{
            console.log(err)
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
            console.log(res)
            if(res.status === 200){
                success.yes = true
                setAlert('success', 'Song Deleted!')
                getSongs()
            }
        })
        .catch(err=>{
            success.yes = false
            setAlert('failure', 'Song not deleted!')
            console.log(err)
        })
        return success
    }
    useEffect(()=>{
        getSongs()
    },[])
    
    const [createDataErrors, setCreateDataErrors] = useState({})
    const [updateDataErrors, setUpdateDataErrors] = useState({})
    const [createFile, setCreateFile] = useState({})
    const [updateFile, setUpdateFile] = useState(song.coverArt)
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
        date:song?.releaseDate,
        title:song?.title,
        appleMusic: song?.streamingLinks?.appleMusic,
        spotify: song?.streamingLinks?.spotify,
        audiomack: song?.streamingLinks?.audiomack,
        youtube: song?.streamingLinks?.youtube,
        tidal: song?.streamingLinks?.tidal,
        boomPlay: song?.streamingLinks?.boomPlay,
        youtubeMusic: song?.streamingLinks?.youtubeMusic
    })
    const handleCreateFileChange = (e) => {
        setCreateFile(e.target.files[0])
    }
    const handleUpdateFileChange = (e) => {
        setUpdateFile(e.target.files[0])
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
        ValidateSong(data, authDetails.accessToken)
        .then(res=>{
            setCreateDataErrors(res)
            if(res.none){
                getSongs()
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
            releaseDate: updateData.releaseDate,
            streamingLinks: {
                appleMusic: updateData.appleMusic,
                spotify: updateData.spotify,
                audiomack: updateData.audiomack,
                youtube: updateData.youtube,
                tidal: updateData.tidal,
                boomPlay: updateData.boomPlay,
                youtubeMusic: updateData.youtubeMusic
            },
            coverArt: updateFile,
            type: 'update'
        }
        ValidateSong(data, authDetails.accessToken, song._id)
        .then(res=>{
            setUpdateDataErrors(res)
            if(res.none){
                getSongs()
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
        handleUpdateFileChange:handleUpdateFileChange,
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