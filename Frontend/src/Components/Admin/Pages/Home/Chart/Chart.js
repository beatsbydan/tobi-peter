import './Chart.css'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import {useContext} from 'react'
import ShowsContext from '../../../Context/ManageContext/ShowsContext/ShowsContext'
import ChartFilter from './ChartFilter/ChartFilter'
import Loading from '../../../../UI/Loading/Loading'

const Chart = () => {
    const ctx = useContext(ShowsContext)
    return (
        <div className='chart'>
            <ChartFilter yearsData={ctx.yearsData}/>
            {ctx.pending.isPending ? <Loading isPending={ctx.pending.isPending}/> : ctx.chartData.datasets[0].data.length > 0 ? <Bar data={ctx.chartData}/> : <h3 className='emptyChart'>No data for this year.</h3>}
        </div>
    )
}

export default Chart