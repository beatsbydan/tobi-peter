import {useState} from 'react'
import './Dropdown.css'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'

const Dropdown = (props) => {
  const [value, setValue] = useState('Select an option')
  const [open, setOpen] = useState(false)
  const handleClick = (value) => {
    setValue(value)
    props.onClick(value)
    setOpen(false)
  }
  return (
    <div className='dropdown'>
      <div onClick={()=>setOpen(!open)} className={props.error ? "errorField optionBlock" : "optionBlock"}>
        <span className="option">{value}</span>
        {open ? <BiChevronUp color={'#495464'} size={30}/>: <BiChevronDown color='#495464' size={30}/> }
      </div>
      {open && 
        <ul className="menu">
          {
            props.list.map((value, index)=>{
              return (
                  <li key={index} onClick={()=>handleClick(value)} className="item">{value}</li>
                )
              })
          }
        </ul>
      }
    </div>
  )
}

export default Dropdown