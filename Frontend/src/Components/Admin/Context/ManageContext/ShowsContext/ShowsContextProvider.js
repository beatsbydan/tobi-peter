import ShowsContext from './ShowsContext'
import {useState, useReducer, useEffect, useContext, useCallback} from 'react'
import ValidateShows from '../../../Pages/Manage/Shows/ValidateShows'
import useAlert from '../../../../../Hooks/useAlert'
import useAuth from '../../../../../Hooks/useAuth'
import Context from '../../../../User/Context/Context'
import axios from 'axios'

const ShowsContextProvider = (props) => {
    const userCtx = useContext(Context)
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()
    const date = new Date()
    const currYear = date.getFullYear()

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
    
    // SHOWS
    const initialShows = {
        myShows:{
            upcomingShows: [],
            pastShows: [],
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
        dispatchPending({type: 'PENDING'})
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
                const myUpcomingShows = filterShows(res.data.pendingShows)
                const myPastShows = filterShows(res.data.completedShows)
                dispatchShows({type:"SET_ALL_SHOWS", value:{...allShows}})
                dispatchShows({type:"SET_UPCOMING_SHOWS", value: myUpcomingShows})
                dispatchShows({type:"SET_PAST_SHOWS", value: myPastShows})
                createChartData(currYear, res.data.pendingShows, res.data.completedShows)
            }
        })
        .catch(err=>{
            console.log(err)
        })
        setTimeout(()=>{
            dispatchPending({type: 'COMPLETED'})
        },3000)
    }

    useEffect(()=>{
        getShows()
    },[])
    
    const filterShows = (shows) => {
        if(shows.length > 0){
            return shows.slice(0, 3)
        }
        else{
            return []
        }
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
            }
        })
        .catch(err=>{
            success.yes = false
            setAlert('failure', 'Show not deleted!')
        })
        return success
    }
    const completeShow = async (id) => {
        let success = {}
        await axios.get(`https://toby-peter-production.up.railway.app/api/show/complete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.yes = true
                setAlert('success', 'Show Completed!')
                getShows()
            }
        })
        .catch(err=>{
            console.log(err)
            success.yes = false
            setAlert('failure', 'Show not completed!')
        })
        return success
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

    // CHART

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: "SHOWS / MONTH",
            data: [],
            backgroundColor:[
                "transparent"
            ],
            borderRadius: 10
        }]
    })
    const [yearsData, setYearsData] = useState([])
    const getMonth = (date, myMonth) => {
        date.setMonth(myMonth)
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }
    const createChartData = (year, upcoming, past) => {
        const totalShows = [...upcoming, ...past] 
        let chartShows = []
        for (let show of totalShows){
            const date = new Date(show.date)
            const myMonth = date.getMonth()
            const year = date.getFullYear()
            const month = getMonth(date, myMonth)
            const newShow = {...show, month:month, year:year}
            chartShows.push(newShow)
        }
        const showsForTheYear = chartShows.filter(show=>show.year === year)
        const chartData = [
            {
                month: 'JAN',
                totalShows: showsForTheYear.filter(show=>show.month === 'JAN').length,
            },
            {
                month: 'FEB',
                totalShows: showsForTheYear.filter(show=>show.month === 'FEB').length,
            },
            {
                month: 'MAR',
                totalShows: showsForTheYear.filter(show=>show.month === 'MAR').length,
            },
            {
                month: 'APR',
                totalShows: showsForTheYear.filter(show=>show.month === 'APR').length,
            },
            {
                month: 'MAY',
                totalShows: showsForTheYear.filter(show=>show.month === 'MAY').length,
            },
            {
                month: 'JUN',
                totalShows: showsForTheYear.filter(show=>show.month === 'JUN').length,
            },
            {
                month: 'JUL',
                totalShows: showsForTheYear.filter(show=>show.month === 'JUL').length,
            },
            {
                month: 'AUG',
                totalShows: showsForTheYear.filter(show=>show.month === 'AUG').length,
            },
            {
                month: 'SEP',
                totalShows: showsForTheYear.filter(show=>show.month === 'SEP').length,
            },
            {
                month: 'OCT',
                totalShows: showsForTheYear.filter(show=>show.month === 'OCT').length,
            },
            {
                month: 'NOV',
                totalShows: showsForTheYear.filter(show=>show.month === 'NOV').length,
            },
            {
                month: 'DEC',
                totalShows: showsForTheYear.filter(show=>show.month === 'DEC').length,
            }
        ]
        setChartData({
            labels: chartData.map(data => data.month),
            datasets: [{
                label: "SHOWS / MONTH",
                data: chartData.map(data => data.totalShows),
                backgroundColor:[
                    "#1D3557"
                ],
                borderRadius: 10
            }]
        })
        let yearsData = []
        for(let i = 0; i < chartShows.length; i++){
            if(!yearsData.includes(chartShows[i].year)){
                yearsData.push(chartShows[i].year)
            }
        }
        setYearsData(yearsData)
        return [chartData,yearsData];
    }
    const filterChartData = (year) => {
        const [chartData,yearsData] = createChartData(year, shows.myShows.upcomingShows, shows.myShows.pastShows)
        dispatchPending({type:'PENDING'})
        setTimeout(()=>{
            setChartData({
                labels: chartData.map(data => data.month),
                datasets: [{
                    label: "SHOWS / MONTH",
                    data: chartData.map(data => data.totalShows),
                    backgroundColor:[
                        "#1D3557"
                    ],
                    borderRadius: 10
                }]
            })
            setYearsData(yearsData)
            dispatchPending({type: 'COMPLETED'})
        },3000)
    }
    const value = {
        createData: createData,
        createErrors:createErrors,
        shows:shows,
        pending:pending,
        yearsData:yearsData,
        chartData:chartData,
        currYear:currYear,
        getShows:getShows,
        filterChartData: filterChartData,
        deleteShow:deleteShow,
        completeShow:completeShow,
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