import Show from '../Show/Show'
import './AllShows.css'
import {motion} from 'framer-motion'
import { IoArrowBackOutline } from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'
import logo from '../../../../../Assets/logo.png'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { fetchShows } from '../../../../../Store/StateSlices/UserSlices/ShowsSlice'
import Loading from '../../../../UI/Loading/Loading'

const AllUpcomingShows = () => {
    const navigate = useNavigate()
    const {status, shows} = useSelector(state => state.shows)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(status.all === "idle"){
            dispatch(fetchShows())
        }
    },[status.all, dispatch])
    return (
        <motion.div 
            className = "allMyShows"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h5 className="theShow">UPCOMING SHOWS</h5>
            <ul className="showsList">
                {
                    status.all === "pending" ? <Loading/>
                :
                    (status.all === "success" && shows.allShows.upcomingShows.length > 0) ?                           
                    shows.allShows.upcomingShows.map((show,index)=>{
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
                    :
                    status.all === 'success' && shows.allShows.upcomingShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON.</p>
                    :
                    <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>  
                }
            </ul>
        </motion.div>
    )
}

export default AllUpcomingShows