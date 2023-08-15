import {useContext} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import Show from '../Update/Show/Show'
import './AllShows.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {motion} from 'framer-motion'
import Loading from '../../../../../UI/Loading/Loading'
import {useNavigate} from 'react-router-dom'

const AdminUpcomingShows = () => {
    const ctx = useContext(ShowsContext)
        const navigate = useNavigate()

    return (
        <motion.div 
            className = "allMyShows"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <AiOutlineArrowLeft cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h5 className="theShow">UPCOMING SHOWS</h5>
            <ul className="showsList allShows">
                {ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/> : 
                        ctx.shows.myShows.upcomingShows.map((show,index)=>{
                        return(
                            <Show
                                completePrompt={()=>ctx.completeShow(show._id)}
                                deletePrompt={()=>ctx.deleteShow(show._id)}
                                key={index}
                                myId={index}
                                title={show.title}
                                isComplete ={false}
                                venue={show.venue}
                                date={show.date}
                                ticketLink={show.ticketLink}
                            />
                        )
                    })
                }
            </ul>
        </motion.div>
    )
}

export default AdminUpcomingShows