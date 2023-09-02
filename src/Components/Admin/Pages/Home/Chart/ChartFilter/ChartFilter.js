import './ChartFilter.css'
import {BsArrowUpShort, BsArrowDownShort} from 'react-icons/bs'
import {useContext, useState} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'

const ChartFilter = (props) => {
    const ctx = useContext(ShowsContext)
    const [isOpen, setIsOpen] = useState(false)
    const [year, setYear] = useState(ctx.currYear)
    
    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleOption = (value) => {
        setIsOpen(false)
        setYear(value)
        ctx.filterChartData(value)
    }
    return (
        <div className = "chartFilter">
            <div onClick={handleIsOpen} className='dropDownMenu'>{year}<span>{!isOpen ? <BsArrowDownShort size={20}/> : <BsArrowUpShort size={20}/>}</span></div>
            {isOpen && <ul className="dropDown">
                {props.yearsData.map((value, index)=>{
                    return(
                        <li className='myYear' key={index} onClick={()=>handleOption(value)}>{value}</li>
                    )
                })}
            </ul>}
        </div>
    )
}

export default ChartFilter