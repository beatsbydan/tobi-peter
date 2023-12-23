import './Chart.css'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import ChartFilter from './ChartFilter/ChartFilter'
import Loading from '../../../../UI/Loading/Loading'
import {useState, useCallback, useEffect, useReducer} from 'react'
import {useSelector, useDispatch} from 'react-redux'

const Chart = () => {
    const year = new Date().getFullYear()

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

    const {status, shows} = useSelector(state => state.shows)
    
    const dispatch = useDispatch()
    
    const filterChartData = (year) => {
        const [chartData,yearsData] = createChartData(year, shows.allShows.upcomingShows, shows.allShows.pastShows)
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
        },1700)
    }
    
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
        
        const chartShows = []
        
        for (let show of totalShows){
            const date = new Date(show.date)
            const myMonth = date.getMonth()
            const year = date.getFullYear()
            const month = getMonth(date, myMonth)
            const newShow = {...show, month:month, year:year}
            chartShows.push(newShow)
        }
        
        const showsForTheYear = chartShows.filter(show=>show.year === year)
        
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        const chartData = []
        for(let month of months){
            const monthData = {
                month: month,
                totalShows: showsForTheYear.filter(show=>show.month === month).length
            }
            chartData.push(monthData)
        }
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

    useEffect(()=>{
        if(status.all === "success"){
            createChartData(year, shows.allShows.upcomingShows, shows.allShows.pastShows)
        }
    },[createChartData, dispatch, status, shows.allShows.upcomingShows, shows.allShows.pastShows, year])


    return (
        <div className='chart'>
            <ChartFilter 
                filterChartData={filterChartData} 
                currYear={year} 
                yearsData={yearsData}    
            />
            {
                (status.all === 'pending' || pending.isPending) ? <Loading/> 
                : 
                (status.all === 'success' && chartData.datasets[0].data.length > 0) ? <Bar data={chartData}/> 
                : 
                (status.all === 'success' && chartData.datasets[0].data.length === 0) ? <h3 className='emptyChart'>No data for this year.</h3>
                : 
                <h3 className='emptyChart'>SOMETHING WENT WRONG.</h3>
            }
        </div>
    )
}

export default Chart