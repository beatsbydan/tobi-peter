import './Update.css'
import {VscSortPrecedence} from 'react-icons/vsc'
import {TfiFaceSad} from 'react-icons/tfi'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'
import {MdOutlineDelete} from 'react-icons/md'
import {FaRegThumbsUp} from 'react-icons/fa'
import {useContext} from 'react'
import Loading from '../../../../../UI/Loading/Loading'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import Show from './Show/Show'
import UpdateShow from './UpdateShow/UpdateShow'
import {useState} from 'react'
const Update = () => {
    const ctx = useContext(ShowsContext)
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
    return(
        <div className="update shows">
            <h2>LET'S SORT SOME SHOWS OUT <span><VscSortPrecedence size={40}/></span></h2>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    {ctx.details.upcomingIsPending ? 
                            <Loading isPending = {ctx.details.upcomingIsPending}/>
                        : 
                            ( ctx.shows.upcomingShows.length === 0 ? <h2 className="defaultText">No available shows <span><TfiFaceSad size={35}/></span></h2>                            
                            : 
                                ctx.shows.upcomingShows.map((show, index)=>{
                            return(
                                <Show
                                    completePrompt={()=>ctx.completeShow(show.id)}
                                    deletePrompt={()=>ctx.deleteShow(show.id)}
                                    key={index}
                                    title={show.title}
                                    venue={show.venue}
                                    date={show.date}
                                    ticketLink={show.ticketLink}
                                />
                            )
                        }))
                    }
                </ul>
                <div className="myShowsActions">
                    {ctx.details.upcomingType === 'less' ? <button onClick={ctx.handleUpcomingMoreType}>SEE MORE</button> : <button onClick={ctx.handleUpcomingLessType}>SEE LESS</button> }
                </div>
            </div>
            <div className="pastShows">
                <h5>PAST SHOWS</h5>
                <ul className='showsList'>
                    {ctx.details.pastIsPending ? 
                        <Loading isPending = {ctx.details.pastIsPending}/>
                    : 
                        ( ctx.shows.pastShows.length === 0? <h2 className="defaultText">No available shows <span><TfiFaceSad size={35}/></span></h2>
                        :
                            ctx.shows.pastShows.map((show,index)=>{
                                return(
                                    <Show
                                        completePrompt={()=>ctx.completeShow(show.id)}
                                        deletePrompt={()=>ctx.deleteShow(show.id)}
                                        key={index}
                                        title={show.title}
                                        venue={show.venue}
                                        date={show.date}
                                    />
                                )
                        }))
                    }
                    <li className="editableShow">
                        <div className="editableActions">
                            <div className="complete">
                                <small className={isVisible.complete ? "visible altText" : "altText"}>Complete</small>
                                <FaRegThumbsUp onClick={handleCompleteIsOpen}  onMouseEnter={handleCompleteVisibility} onMouseLeave={handleCompleteVisibility} size={25} cursor={'pointer'} color='#1D3557'/>
                            </div>
                            <div className="remove">
                                <small className={isVisible.delete ?"visible altText" : "altText"}>Delete</small>
                                <MdOutlineDelete onClick={handleDeleteIsOpen} onMouseEnter={handleDeleteVisibility} onMouseLeave={handleDeleteVisibility} size={27} cursor={'pointer'} color='#1D3557'/>
                            </div>
                        </div>
                        <div className='show'>
                            <div className='left'>
                                <div className='date'>
                                    <small className='month'>AUG</small>
                                    <h5 className='day'>23</h5>
                                </div>
                                <h5 className='desc'>DJ</h5>
                                <div className='location'>
                                    <h5 className='title'>COACHELLA</h5>
                                    <small className='venue'>The Oasis Valley, Los Angeles, USA</small>
                                </div>    
                            </div>
                            <a href='https://www.'>
                                <BsTicketPerforated className={'ticket'} size={30}/>
                                <BiRightArrowAlt className={'myArrow'}/>
                                <span>GET TICKETS</span>
                            </a>
                        </div>
                    </li>
                </ul>
                <div className="myShowsActions">
                    {ctx.details.pastType === 'less' ? <button onClick={ctx.handlePastMoreType}>SEE MORE</button> : <button onClick={ctx.handlePastLessType}>SEE LESS</button> }
                </div>
            </div>
            {isOpen.delete&&
                <UpdateShow
                    type={'delete'}
                    cancel={handleDeleteIsOpen}
                    completePrompt={()=>ctx.completeShow()}
                    deletePrompt={()=>ctx.deleteShow()}
                />
            }
        </div>
    )
}
export default Update