import './Show.css'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'

const Show = (props) => {
    const date = new Date(props.date)
    const myDate = date.getDate().toString()
    const myMonth = date.getMonth()
    const getMonth = (myMonth) => {
        date.setMonth(myMonth)
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }
    const txtMonth = getMonth(myMonth)
    return ( 
        <li className='show' style={{animation: props.animation}}>
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
        </li>
    );
}
export default Show;