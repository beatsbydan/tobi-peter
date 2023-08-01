import ShowsContext from './ShowsContext'
import {useState, useReducer, useEffect, useContext} from 'react'
import ValidateShows from '../../../Pages/Manage/Shows/ValidateShows'
import useAlert from '../../../../../Hooks/useAlert'
import useAuth from '../../../../../Hooks/useAuth'
import Context from '../../../../User/Context/Context'
import axios from 'axios'

const ShowsContextProvider = (props) => {
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()
    const userCtx = useContext(Context)
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
                axios.get(showsApi, {
                    header:{
                        'Content-Type': 'application/json'
                    }
                })
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
    const deleteShow = async (id) => {
        let success = {}
        await axios.delete(`https://toby-peter-production.up.railway.app/api/show/delete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.yes = true
                setAlert('success', 'Show Deleted!')
                getShows()
                userCtx.getShows()
            }
        })
        .catch(err=>{
            console.log(err)
            if(err.response.status !== 200){
                success.yes = false
                setAlert('failure', 'Show not deleted!')
            }
        })
        return success
    }
    const completeShow = async (id) => {
        let success = {}
        await axios.put(`https://toby-peter-production.up.railway.app/api/show/complete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                success.yes = true
                setAlert('success', 'Show Completed!')
                getShows()
                userCtx.getShows()
            }
        })
        .catch(err=>{
            console.log(err)
            success.yes = false
            setAlert('failure', 'Show not completed!')
        })
        return success
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

    const [createData, setCreateData] = useState({
        title: '',
        venue: '',
        date: '',
        ticketLink: ''
    })
    const [createErrors, setCreateErrors] = useState({})
    const handleChange = (e) => {
        const {id, value} = e.target;
        setCreateData(prev=>{
            return {...prev, [id]:value}
        })
    }
    const handleCreateSubmit = async () => {
        let success = {}
        await ValidateShows(createData, authDetails.accessToken)
        .then(res=>{
            setCreateErrors(res)
            if(res.none){
                success.yes = true
                getShows()
                userCtx.getShows()
                setCreateData({
                    title: '',
                    venue: '',
                    date: '',
                    ticketLink: ''
                })
            }
            else{
                success.yes = false
                setAlert('failure', 'Show not created!')
            }
        })
        return success
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