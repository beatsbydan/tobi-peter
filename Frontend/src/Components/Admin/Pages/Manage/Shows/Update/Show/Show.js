import './Show.css'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'
import {MdOutlineDelete} from 'react-icons/md'
import {FaRegThumbsUp} from 'react-icons/fa'
import {useState} from 'react'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'

const Show = (props) => {
    const delay = 100;
    const date = new Date(props.date)
    const myDate = date.getDate().toString()
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
    const deletePrompt = () => {
        props.deletePrompt()
        .then(success=>{
            if(success.yes){
                setIsOpen({
                    delete: false,
                })
            }
        })
    }
    const completePrompt = () => {
        props.completePrompt()
        .then(success=>{
            if(success.yes){
                setIsOpen({
                    complete: false,
                })
            }
        })
    }
    return ( 
        <li className="editableShow" style={{ animationDelay: `${props.myId * delay}ms` }}>
            <div className="editableActions">
                {!props.isComplete &&
                    <div className="complete">
                        <small className={isVisible.complete ? "visible altText" : "altText"}>Complete</small>
                        <FaRegThumbsUp onClick={handleCompleteIsOpen} onMouseEnter={handleCompleteVisibility} onMouseLeave={handleCompleteVisibility} size={25} cursor={'pointer'} color='#1D3557'/>
                    </div>
                }
                <div className="remove">
                    <small className={isVisible.delete ?"visible altText" : "altText"}>Delete</small>
                    <MdOutlineDelete onClick={handleDeleteIsOpen} onMouseEnter={handleDeleteVisibility} onMouseLeave={handleDeleteVisibility} size={27} cursor={'pointer'} color='#1D3557'/>
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
                {props.ticketLink && <a target='_blank' rel="noreferrer" href={props.ticketLink}>
                    <BsTicketPerforated className={'ticket'} size={30}/>
                    <BiRightArrowAlt className={'myArrow'}/>
                    <span>GET TICKETS</span>
                </a>}
            </div>
            {isOpen.complete&&
                <UpdateEvent
                    type={'COMPLETE'}
                    event={'SHOW'}
                    cancel={handleCompleteIsOpen}
                    completePrompt={completePrompt}
                    deletePrompt={deletePrompt}
                />
            }
            {isOpen.delete&&
                <UpdateEvent
                    type={'DELETE'}
                    event={'SHOW'}
                    cancel={handleDeleteIsOpen}
                    completePrompt={completePrompt}
                    deletePrompt={deletePrompt}
                />
            }
        </li>
        
    );
}
export default Show;