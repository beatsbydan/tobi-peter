import './Show.css'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'
import {MdOutlineDelete} from 'react-icons/md'
import {FaRegThumbsUp} from 'react-icons/fa'
import {useState} from 'react'
import UpdateShow from '../UpdateShow/UpdateShow'

const Show = (props) => {
    const date = new Date(props.date)
    const myDate = date.getDate()
    const myMonth = date.getMonth()
    const getMonth = (myMonth) => {
        date.setMonth(myMonth)
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }
    const txtMonth = getMonth(myMonth)
    
    const [isOpen,setIsOpen] = useState({
        complete:false,
        delete:false
    })
    const handleCompleteIsOpen = () => {
        setIsOpen({
            complete: !isOpen.complete
        })
    }
    const handleDeleteIsOpen = () => {
        setIsOpen({
            delete: !isOpen.delete
        })
    }
    const [isVisible, setIsVisible] = useState({
        complete:false,
        delete:false
    })
    const handleCompleteVisibility = () => {
        setIsVisible({
            complete:!isVisible.complete
        })
    }
    const handleDeleteVisibility = () => {
        setIsVisible({
            delete:!isVisible.delete
        })
    }
    //Only pending shows should be completable
    return ( 
        <li className="editableShow">
            <div className="editableActions">
                <div className="complete">
                    <small className={isVisible.complete ? "visible altText" : "altText"}>Complete</small>
                    <FaRegThumbsUp onMouseEnter={handleCompleteVisibility} onMouseLeave={handleCompleteVisibility} size={25} cursor={'pointer'} color='#1D3557'/>
                </div>
                <div className="remove">
                    <small className={isVisible.delete ?"visible altText" : "altText"}>Delete</small>
                    <MdOutlineDelete onMouseEnter={handleDeleteVisibility} onMouseLeave={handleDeleteVisibility} size={27} cursor={'pointer'} color='#1D3557'/>
                </div>
            </div>
            <div className='show'>
                <div className='left'>
                    <div className='date'>
                        <small className='month'>{txtMonth}</small>
                        <h5 className='day'>{myDate}</h5>
                    </div>
                    <h5 className='desc'>DJ</h5>
                    <div className='location'>
                        <h5 className='title'>{props.title}</h5>
                        <small className='venue'>{props.venue}</small>
                    </div>    
                </div>
                {<a href={props.ticketLink}>
                    <BsTicketPerforated className={'ticket'} size={30}/>
                    <BiRightArrowAlt className={'myArrow'}/>
                    <span>GET TICKETS</span>
                </a>}
            </div>
            {isOpen.complete&&
                <UpdateShow
                    type={'complete'}
                    cancel={handleCompleteIsOpen}
                    completePrompt={props.completePrompt}
                    deletePrompt={props.deletePrompt}
                />
            }
            {isOpen.delete&&
                <UpdateShow
                    type={'delete'}
                    cancel={handleDeleteIsOpen}
                    completePrompt={props.completePrompt}
                    deletePrompt={props.deletePrompt}
                />
            }
        </li>
        
    );
}
export default Show;