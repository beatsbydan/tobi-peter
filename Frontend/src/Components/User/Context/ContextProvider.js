import Context from './Context'
import {useState, useEffect, useReducer} from 'react'
import ValidateWhatsNew from '../Pages/WhatsNew/ValidateWhatsNew'
import axios from 'axios'
import useAlert from '../../../Hooks/useAlert'

const ContextProvider = (props) => {
    const {setAlert} = useAlert()

    const initials = {
        upcomingType: 'less',
        pastType:'less',
        upcomingIsPending: true,
        pastIsPending: true,
    }
    const typeReducer = (state, action) => {
        if(action.type === "MORE_UPCOMING"){
            return{
                upcomingType: 'more',
                pastType: state.pastType,
                upcomingIsPending: true,
                pastIsPending: state.pastIsPending
            }
        }
        if(action.type === "UPCOMING_DONE"){
            return{
                upcomingType: state.upcomingType,
                pastType: state.pastType,
                upcomingIsPending: false,
                pastIsPending: state.pastIsPending
            }
        }
        if(action.type === "LESS_UPCOMING"){
            return{
                upcomingType: 'less',
                pastType: state.pastType,
                upcomingIsPending: true,
                pastIsPending: state.pastIsPending
            }
        }
        if(action.type === "MORE_PAST"){
            return{
                upcomingType: state.upcomingType,
                pastType: "more",
                upcomingIsPending: state.upcomingIsPending,
                pastIsPending: true
            }
        }
        if(action.type === "PAST_DONE"){
            return{
                upcomingType: state.upcomingType,
                pastType: state.pastType,
                upcomingIsPending: state.upcomingIsPending,
                pastIsPending: false
            }
        }
        if(action.type === "LESS_PAST"){
            return{
                upcomingType: state.upcomingType,
                pastType: "less",
                upcomingIsPending: state.upcomingIsPending,
                pastIsPending: true
            }
        }
        if(action.type === "IS_PENDING"){
            return{
                upcomingType: state.upcomingType,
                pastType: state.pastType,
                upcomingIsPending: true,
                pastIsPending: true
            }
        }
        if(action.type === "IS_NOT_PENDING"){
            return{
                upcomingType: state.upcomingType,
                pastType: state.pastType,
                upcomingIsPending: false,
                pastIsPending: false
            }
        }
    }
    const [details, dispatchDetails] = useReducer(typeReducer, initials)
    
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
    const getShows = () =>{
        dispatchDetails({type: 'IS_PENDING'})
            setTimeout(()=>{
                axios.get(showsApi)
                .then(res=>{
                    if(res.status === 200){
                        const allShows = {
                            upcomingShows: res.data.pendingShows,
                            pastShows: res.data.completedShows
                        }
                        const myUpcomingShows = filterShows(res.data.pendingShows, 'less')
                        const myPastShows = filterShows(res.data.completedShows, 'less')
                        dispatchShows({type:"SET_ALL_SHOWS", value:{...allShows}})
                        dispatchShows({type:"SET_UPCOMING_SHOWS", value: myUpcomingShows})
                        dispatchShows({type:"SET_PAST_SHOWS", value: myPastShows})
                        dispatchDetails({type: 'IS_NOT_PENDING'})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },3000)
    }
    useEffect(()=>{
        getShows()
    },[])
    const filterShows = (shows, type) => {
        if(type === "more"){
            if(shows.length > 0){
                return shows.slice(0, shows.length)
            }
            else{
                return []
            }
        }   
        else{
            if(shows.length > 0){
                return shows.slice(0, 3)
            }
            else{
                return []
            }
        }
    }
    const getUpcomingShows = (type) => {
        setTimeout(()=>{
            const newShows = filterShows(shows.myShows.upcomingShows, type)
            dispatchShows({type:"SET_UPCOMING_SHOWS", value:newShows})
            dispatchDetails({type: 'UPCOMING_DONE'})
            
        },3000)
    }
    const getPastShows = (type) => {
        setTimeout(()=>{
                const newShows = filterShows(shows.myShows.pastShows, type)
                dispatchShows({type:"SET_PAST_SHOWS", value:newShows})
                dispatchDetails({type: 'PAST_DONE'})
        },3000)
    }
    const handlePastMoreType = () => {
        dispatchDetails({type:'MORE_PAST'})
        getPastShows('more')
    }
    const handlePastLessType = () => {
        dispatchDetails({type:'LESS_PAST'})
        getPastShows('less')
    }
    const handleUpcomingMoreType = () => {
        dispatchDetails({type:'MORE_UPCOMING'})
        getUpcomingShows('more')
    }
    const handleUpcomingLessType = () => {
        dispatchDetails({type:'LESS_UPCOMING'})
        getUpcomingShows('less')
    }

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
    const [song, setSong] = useState([])
    const getSong = async () =>{
        await axios.get('https://toby-peter-production.up.railway.app/api/song/recent',{
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(res=>{
            if(res.status === 200){
                setSong(res.data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getSong()
    },[])
    const value = {
        email:email,
        error:error,
        shows:shows,
        song:song,
        details:details,
        getShows:getShows,
        getSong:getSong,
        handleUpcomingMoreType:handleUpcomingMoreType,
        handlePastMoreType:handlePastMoreType,
        handleUpcomingLessType:handleUpcomingLessType,
        handlePastLessType:handlePastLessType,
        handleChange:handleChange,
        handleSubmit:handleSubmit
    }
    return ( 
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
}
export default ContextProvider;