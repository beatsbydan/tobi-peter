import ShowsContext from './ShowsContext'
import {useState, useReducer, useEffect} from 'react'
import ValidateShows from '../../../Pages/Manage/Shows/ValidateShows'
import useAlert from '../../../../../Hooks/useAlert'
import axios from 'axios'

const ShowsContextProvider = (props) => {
    const {setAlert} = useAlert()
    const token = ''
    const initials = {
        upcomingType: 'less',
        pastType:'less',
        upcomingIsPending: true,
        pastIsPending: true,
    }
    const detailsReducer = (state, action) => {
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
    const [details, dispatchDetails] = useReducer(detailsReducer, initials)
    
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
    const getShows = () => {
        dispatchDetails({type: 'IS_PENDING'})
            setTimeout(()=>{
                axios.get(showsApi)
                .then(res=>{
                    if(res.status === 200){
                        const myUpcomingShows = filterShows(res.data.pendingShows, 'less')
                        const myPastShows = filterShows(res.data.completedShows, 'less')
                        dispatchShows({type:"SET_ALL_SHOWS", value:{
                            upcomingShows: myUpcomingShows,
                            pastShows: myPastShows
                        }})
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
                for(let i = 0; i < shows.length; i++){
                    return [...shows[i]]
                }
            }
            else{
                return []
            }
        }   
        else{
            if(shows.length > 0){
                for(let i = 0; i < 3; i++){
                    return [...shows[i]]
                }
            }
            else{
                return []
            }
        }
    }
    const getUpcomingShows = () => {
        setTimeout(()=>{
            const newShows = filterShows(shows.myShows.upcomingShows, details.upcomingType)
            dispatchShows({type:"SET_UPCOMING_SHOWS", value:newShows})
            dispatchDetails({type: 'UPCOMING_DONE'})
            
        },3000)
    }
    const getPastShows = () => {
        setTimeout(()=>{
                const newShows = filterShows(shows.myShows.pastShows, details.pastType)
                dispatchShows({type:"SET_PAST_SHOWS", value:newShows})
                dispatchDetails({type: 'PAST_DONE'})
        },3000)
    }
    const deleteShow = async (id) => {
        console.log('deleted')
        await axios.post(`https://toby-peter-production.up.railway.app/api/show/delete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                setAlert('success')
                getShows()
            }
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status !== 200){
                setAlert('failure')
            }
        })
    }
    const completeShow = async (id) => {
        console.log('completed')
        await axios.post(`https://toby-peter-production.up.railway.app/api/show/complete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                setAlert('success')
                getShows()
            }
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status !== 200){
                setAlert('failure')
            }
        })
        //create a function to get the new shows everytime there's an update i.e delete or complete  
    }
    const handlePastMoreType = () => {
        dispatchDetails({type:'MORE_PAST'})
        getPastShows()
    }
    const handlePastLessType = () => {
        dispatchDetails({type:'LESS_PAST'})
        getPastShows()
    }
    const handleUpcomingMoreType = () => {
        dispatchDetails({type:'MORE_UPCOMING'})
        getUpcomingShows()
    }
    const handleUpcomingLessType = () => {
        dispatchDetails({type:'LESS_UPCOMING'})
        getUpcomingShows()
    }

    const [createData, setCreateData] = useState({
        title: '',
        venue: '',
        date: '',
        ticketLink: ''
    })
    const [createErrors, setCreateErrors] = useState({})
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCreateData(prev=>{
            return {...prev, [name]:value}
        })
    }
    const handleCreateSubmit = (e) => {
        e.preventDefault()
        ValidateShows(createData)
        .then(res=>{
            setCreateErrors(res)
            if(res.none){
                setAlert('success')
            }
            else{
                setAlert('failure')
            }
        })
    }
    const value = {
        createData: createData,
        createErrors:createErrors,
        details:details,
        shows:shows,
        deleteShow:deleteShow,
        completeShow:completeShow,
        handleUpcomingMoreType:handleUpcomingMoreType,
        handlePastMoreType:handlePastMoreType,
        handleUpcomingLessType:handleUpcomingLessType,
        handlePastLessType:handlePastLessType,
        handleChange:handleChange,
        handleCreateSubmit: handleCreateSubmit,
    }
    return ( 
        <ShowsContext.Provider value = {value}>
            {props.children}
        </ShowsContext.Provider>
    );
}
export default ShowsContextProvider;