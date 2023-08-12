import './Song.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {MdOutlineDelete} from 'react-icons/md'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'

const Song = (props) => {
    const date = new Date(props.releaseDate)
    const myDate = date.getDate()
    const myMonth = date.getMonth()
    const getMonth = (myMonth) => {
        date.setMonth(myMonth)
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }
    const txtMonth = getMonth(myMonth)
    
    const [isVisible, setIsVisible] = useState(false)
    const handleVisibility = () => {
        setIsVisible(!isVisible)
    }
    const [isOpen,setIsOpen] = useState(false)
    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }
    const deletePrompt = () => {
        props.deletePrompt()
        .then(success=>{
            if(success.yes){
                setIsOpen(false)
            }
        })
    }
    return(
        <li className="editableSong">
            <div className="remove">
                <small className={isVisible ?"visible altText" : "altText"}>Delete</small>
                <MdOutlineDelete onClick={handleIsOpen} onMouseEnter={handleVisibility} onMouseLeave={handleVisibility} size={27} cursor={'pointer'} color='#1D3557'/>
            </div>
            <Link onClick={props.fetch} className= "mySong" to ={`/admin/manage/songs/updateSongs/updateSong/${props.id}`}>
                <div className="songLeft">
                    <div className='date'>
                        <small className='month'>{txtMonth}</small>
                        <h5 className='day'>{myDate}</h5>
                    </div>
                    <h3 className='title'>{props.title.toUpperCase()}</h3>
                </div>
                <img src={props.coverArt} alt=''/>
            </Link>
            {isOpen&&
                <UpdateEvent
                    type={'DELETE'}
                    event={'SONG'}
                    cancel={handleIsOpen}
                    deletePrompt={deletePrompt}
                />
            }
        </li>
    )
}
export default Song