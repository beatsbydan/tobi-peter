import './ChartFilter.css'
import {BsArrowUpShort, BsArrowDownShort} from 'react-icons/bs'
import {useState, useEffect, useRef} from 'react'

const ChartFilter = (props) => {
    const dropdownRef = useRef()
    const [isOpen, setIsOpen] = useState(false)
    const [year, setYear] = useState(props.currYear)
    
    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleOption = (value) => {
        setIsOpen(false)
        setYear(value)
        props.filterChartData(value)
    }
    useEffect(() => {
        const closeDropdownOnOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener('click', closeDropdownOnOutsideClick);
    
        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);

    return (
        <div className = "chartFilter" ref={dropdownRef}>
            <div 
                onClick={handleIsOpen} 
                className='dropDownMenu'>
                    {year}
                    <span>
                        {!isOpen ? 
                            <BsArrowDownShort size={20}/> : 
                            <BsArrowUpShort size={20}/>
                        }
                    </span>
            </div>
            {isOpen && <ul className="dropDown">
                {props.yearsData.map((value, index)=>{
                    return(
                        <li 
                            className='myYear' 
                            key={index} 
                            onClick={()=>handleOption(value)}>
                            {value}
                        </li>
                    )
                })}
            </ul>}
        </div>
    )
}

export default ChartFilter