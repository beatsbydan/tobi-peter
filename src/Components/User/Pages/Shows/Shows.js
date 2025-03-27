import './Shows.css'
import Show from './Show/Show'
import {BiRightArrowAlt} from 'react-icons/bi'
import Loading from '../../../UI/Loading/Loading'
import logo from '../../../../Assets/logo.png'
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { fetchShows } from '../../../../Store/StateSlices/UserSlices/ShowsSlice'

const Shows = () => {
    const {status, shows} = useSelector(state => state.shows)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(status.all === "idle"){
            dispatch(fetchShows())
        }
    },[status.all, dispatch])

    useEffect(()=>{
        if(status.all === 'success'){
            
        }

    },[status.all])

    return ( 
        <motion.div 
            className="shows"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="actionsBlock">
                <Link to={'/shows/book'}>
                    BOOK TOBI PETER 
                    <BiRightArrowAlt className='arrow' size={15}/>
                </Link>
                {/* <a target='_blank' rel="noreferrer" href="https://www.">
                    DOWNLOAD EPK
                    <BiRightArrowAlt/>
                </a> */}
                {/* <Link to={'/unavailable'}>
                    DOWNLOAD EPK 
                    <BiRightArrowAlt className='arrow' size={15}/>
                </Link> */}
            </div>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    {
                        status.all === "pending" ? <Loading/>
                        : 
                        status.all === 'success' && shows.upcomingShows.length > 0 ?                            
                        shows.upcomingShows.map((show,index)=>{
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
                        status.all === 'success' && shows.upcomingShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON.</p>
                        :
                        <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>
                    }
                </ul>
                <div className="myShowsActions">
                    <Link to={'/shows/allUpcomingShows'}>SEE MORE</Link>
                </div>
            </div>
            <div className="pastShows">
                <h5>PAST SHOWS</h5>
                <ul className='showsList'>
                    {
                        status.all === "pending" ? <Loading/>
                        : 
                        status.all === 'success' && shows.pastShows.length > 0 ?                            
                        shows.pastShows.map((show,index)=>{
                            return(
                                <Show
                                    key={index}
                                    myId={index}
                                    title={show.title}
                                    venue={show.venue}
                                    date={show.date}
                                />
                            )
                        })
                        :
                        status.all === 'success' && shows.pastShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON.</p>
                        :
                        <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>
                    }
                </ul>
                <div className="myShowsActions">
                    <Link to={'/shows/allPastShows'}>SEE MORE</Link>
                </div>
            </div>
        </motion.div>
    );
}
export default Shows;