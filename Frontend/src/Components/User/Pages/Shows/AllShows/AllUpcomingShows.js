import {useContext} from 'react'
import Context from '../../../Context/Context'
import Show from '../Show/Show'
import './AllShows.css'
import {motion} from 'framer-motion'
import Loading from '../../../../UI/Loading/Loading'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import logo from '../../../../../Assets/logo.png'

const AllUpcomingShows = () => {
    const ctx = useContext(Context)
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
            <ul className="showsList">
                {
                    ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/>
                :
                    ctx.shows.myShows.upcomingShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>No shows available.</p>                            
                :
                    ctx.shows.myShows.upcomingShows.map((show,index)=>{
                        return(
                            <Show
                                key={index}
                                myId={index}
                                title={show.title}
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

export default AllUpcomingShows