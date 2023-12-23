import {useState, useEffect, useRef} from 'react'
import './Dropdown.css'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'

const Dropdown = (props) => {
  const dropdownRef = useRef(null)
  const [value, setValue] = useState('Select an option')
  const [open, setOpen] = useState(false)
  const handleClick = (value) => {
    setValue(value)
    props.onClick(value)
    setOpen(false)
  }
    useEffect(() => {
        const closeDropdownOnOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
    
        document.addEventListener('click', closeDropdownOnOutsideClick);
    
        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);
  
  return (
    <div className='dropdown' ref={dropdownRef}>
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
              }
            )
          }
        </ul>
      }
    </div>
  )
}

export default Dropdown