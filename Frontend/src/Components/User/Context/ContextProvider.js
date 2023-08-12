import Context from './Context'
import {useState, useEffect, useReducer, useCallback} from 'react'
import ValidateWhatsNew from '../Pages/WhatsNew/ValidateWhatsNew'
import axios from 'axios'
import useAlert from '../../../Hooks/useAlert'

const ContextProvider = (props) => {
    const {setAlert} = useAlert()
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
    
    // SHOWS
    const initialShows = {
        myShows:{
            upcomingShows: [],
            pastShows: []
        },
        upcomingShows: [],
        pastShows: []
    }
    const showsReducer = (state,action) => {
        if(action.type === "SET_ALL_SHOWS"){
            return{
                myShows: action.value,
                upcomingShows: state.upcomingShows,
                pastShows: state.pastShows
            }
        }
        if(action.type === "SET_UPCOMING_SHOWS"){
            return{
                myShows: state.myShows,
                upcomingShows: [...action.value],
                pastShows: state.pastShows
            }
        }
        if(action.type === "SET_PAST_SHOWS"){
            return{
                myShows: state.myShows,
                upcomingShows: state.upcomingShows,
                pastShows: [...action.value]
            }
        }
    }
    const [shows, dispatchShows] = useReducer(showsReducer, initialShows)
    const showsApi = 'https://toby-peter-production.up.railway.app/api/show/'
    const getShows = useCallback(() =>{
        dispatchPending({type: 'PENDING'})
            setTimeout(()=>{
                axios.get(showsApi)
                .then(res=>{
                    if(res.status === 200){
                        const allShows = {
                            upcomingShows: res.data.pendingShows,
                            pastShows: res.data.completedShows
                        }
                        const myUpcomingShows = filterShows(res.data.pendingShows)
                        const myPastShows = filterShows(res.data.completedShows)
                        dispatchShows({type:"SET_ALL_SHOWS", value:{...allShows}})
                        dispatchShows({type:"SET_UPCOMING_SHOWS", value: myUpcomingShows})
                        dispatchShows({type:"SET_PAST_SHOWS", value: myPastShows})
                        dispatchPending({type: 'COMPLETED'})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },3000)
    },[])

    useEffect(()=>{
        getShows()
    },[getShows])
    
    const filterShows = (shows) => {
        if(shows.length > 0){
            return shows.slice(0, 3)
        }
        else{
            return []
        }
    }
    const animateShows = (items) => {
        const allShows = new Array(items.length).fill(false)
        let animatedShows = []
        for (let i = 0; i < allShows.length; i++){
            setTimeout(()=>{
                animatedShows.push(true)
                return animatedShows
            },1200)
        }
    }
    
    // SUBSCRIBERS
    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        ValidateWhatsNew(email)
        .then((res)=>{
            setError(res)
            if(res.none){
                setEmail('');
                setAlert('success', 'Subscription Successful!')
            }
            else{
                setAlert('failure', 'Subscription Unsuccessful')
            }
        })
    }

    // SONG
    const [song, setSong] = useState([])
    const getSong = async () =>{
        await axios.get('https://toby-peter-production.up.railway.app/api/song/recent',{
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                setSong(res.data.recentSong)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getSong()
    },[])


    // CONTEXT VALUES
    const value = {
        email:email,
        error:error,
        shows:shows,
        song:song,
        pending:pending,
        getShows:getShows,
        getSong:getSong,
        handleChange:handleChange,
        handleSubmit:handleSubmit,
        animateShows:animateShows
    }

    return ( 
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}
export default ContextProvider;