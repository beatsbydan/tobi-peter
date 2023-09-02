import ShowsContext from './ShowsContext'
import {useState, useReducer, useEffect, useCallback} from 'react'
import ValidateShows from '../../../Pages/Manage/Shows/ValidateShows'
import useAlert from '../../../../../Hooks/useAlert'
import useAuth from '../../../../../Hooks/useAuth'
import axios from 'axios'
import useIsProcessing from '../../../../../Hooks/useIsProcessing'
import useUserContext from '../../../../../Hooks/useUserContext'

const ShowsContextProvider = (props) => {
    const {setProcessing} = useIsProcessing()
    const {getShows: getUserShows} = useUserContext()
    const {setAlert} = useAlert()
    const {authDetails} = useAuth()
    const date = new Date()
    const currYear = date.getFullYear()

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

    const createChartData = useCallback((year, upcoming, past) => {
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
    }, [])

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

    const [createData, setCreateData] = useState({
        title: '',
        venue: '',
        date: '',
        ticketLink: ''
    })

    const [updateData, setUpdateData] = useState({
        title: '',
        venue: '',
        date: '',
        ticketLink: ''
    })

    const [createErrors, setCreateErrors] = useState({})
    
    const [updateErrors, setUpdateErrors] = useState({})
    
    const handleCreateChange = (e) => {
        const {id, value} = e.target;
        setCreateData(prev=>{
            return {...prev, [id]:value}
        })
    }
    
    const handleUpdateChange = (e) => {
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
            venue: createData.venue,
            date: createData.date,
            ticketLink: createData.ticketLink,
            type: 'create'
        }
        await ValidateShows(data, authDetails.accessToken)
        .then(res=>{
            setCreateErrors(res)
            if(res.none){
                success.yes = true
                setProcessing(false)
                getUserShows()
                getShows()
                setCreateData({
                    title: '',
                    venue: '',
                    date: '',
                    ticketLink: ''
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
    
    const handleUpdateSubmit = async () => {
        setProcessing(true)
        let success = {}
        const data = {
            title: updateData.title,
            venue: updateData.venue,
            date: updateData.date,
            ticketLink: updateData.ticketLink,
            type: 'update'
        }
        await ValidateShows(data, authDetails.accessToken, show._id)
        .then(res=>{
            setUpdateErrors(res)
            if(res.none){
                success.yes = true
                setProcessing(false)
                getShows()
                getUserShows()
                setUpdateData({
                    title: '',
                    venue: '',
                    date: '',
                    ticketLink: ''
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
    
    const [shows, dispatchShows] = useReducer(showsReducer, initialShows)
    
    const getShows = useCallback( async () => {
        dispatchPending({type: 'PENDING'})
        await axios.get(`${process.env.REACT_APP_BASE_URL}/show/`, {
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
            return err
        })
        setTimeout(()=>{
            dispatchPending({type: 'COMPLETED'})
        },3000)
    },[createChartData, currYear])

    useEffect(()=>{
        getShows()
    },[getShows])

    const [show, setShow] = useState({})
    
    const getShow = (id) => {
        setProcessing(true)
        dispatchPending({type: 'PENDING'})
        setTimeout(async()=>{
            await axios.get(`${process.env.REACT_APP_BASE_URL}/show/${id}`)
            .then(res=>{
                if(res.status === 200){
                    setProcessing(false)
                    setShow(res.data.show)
                    setUpdateData({
                        title: res.data.show.title,
                        venue: res.data.show.venue,
                        date: getFormattedDate(res.data.show.date),
                        ticketLink: res.data.show.ticketLink
                    })
                }
            })
            .catch(err=>{
                setTimeout(()=>{
                    setProcessing(false)
                },1000)
                setAlert('failure', 'Something went wrong!')
                return err
            })
            dispatchPending({type: 'COMPLETED'})
        },3000)
    }
    
    const filterShows = (shows) => {
        if(shows.length > 0){
            return shows.slice(0, 3)
        }
        else{
            return []
        }
    }
    
    const deleteShow = async (id) => {
        setProcessing(true)
        let success = {}
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/show/delete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                setProcessing(false)
                success.yes = true
                setAlert('success', 'Show Deleted!')
                getShows()
                getUserShows()
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            success.yes = false
            setAlert('failure', 'Something went wrong!')
        })
        return success
    }
    
    const completeShow = async (id) => {
        setProcessing(true)
        let success = {}
        await axios.get(`${process.env.REACT_APP_BASE_URL}/show/complete/${id}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${authDetails.accessToken}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                success.yes = true
                setProcessing(false)
                setAlert('success', 'Show Completed!')
                getShows()
                getUserShows()
            }
        })
        .catch(err=>{
            setTimeout(()=>{
                setProcessing(false)
            },1000)
            success.yes = false
            setAlert('failure', 'Something went wrong!')
            return err
        })
        return success
    }

    // CONTEXT VALUE
    const value = {
        createData: createData,
        updateData: updateData,
        createErrors:createErrors,
        updateErrors:updateErrors,
        shows:shows,
        show:show,
        pending:pending,
        yearsData:yearsData,
        chartData:chartData,
        currYear:currYear,
        getShow: getShow,
        getShows:getShows,
        filterChartData: filterChartData,
        deleteShow:deleteShow,
        completeShow:completeShow,
        handleCreateChange:handleCreateChange,
        handleUpdateChange:handleUpdateChange,
        handleCreateSubmit: handleCreateSubmit,
        handleUpdateSubmit: handleUpdateSubmit
    }
    
    return ( 
        <ShowsContext.Provider value = {value}>
            {props.children}
        </ShowsContext.Provider>
    );
}
export default ShowsContextProvider;