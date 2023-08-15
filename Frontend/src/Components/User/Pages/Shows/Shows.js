import './Shows.css'
import {useContext} from 'react'
import Context from '../../Context/Context'
import Show from './Show/Show'
import {BiRightArrowAlt} from 'react-icons/bi'
import {TfiFaceSad} from 'react-icons/tfi'
import Loading from '../../../UI/Loading/Loading'
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'

const Shows = () => {
    const ctx = useContext(Context)
    return ( 
        <motion.div 
            className="shows"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.7}}}
        >
            <div className="actionsBlock">
                <a target='_blank' rel="noreferrer" href="https://www.">
                    BOOK TOBI PETER
                    <BiRightArrowAlt/>
                </a>
                <a target='_blank' rel="noreferrer" href="https://www.">
                    DOWNLOAD EPK
                    <BiRightArrowAlt/>
                </a>
            </div>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    {
                        ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/>
                        : 
                        ctx.shows.upcomingShows.length === 0 ? <p className="defaultText">No shows available <span><TfiFaceSad size={25}/></span></p>                            
                        : 
                        ctx.shows.upcomingShows.map((show,index)=>{
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
                <div className="myShowsActions">
                    <Link onClick={ctx.getShows} to={'/shows/allUpcomingShows'}>SEE MORE</Link>
                </div>
            </div>
            <div className="pastShows">
                <h5>PAST SHOWS</h5>
                <ul className='showsList'>
                    {
                        ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/>
                        : 
                        ctx.shows?.pastShows?.length === 0? <p className="defaultText">No available shows <span><TfiFaceSad size={25}/></span></p>
                        :
                        ctx.shows.pastShows.map((show,index)=>{
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
                    }
                </ul>
                <div className="myShowsActions">
                    <Link onClick={ctx.getShows} to={'/shows/allPastShows'}>SEE MORE</Link>
                </div>
            </div>
        </motion.div>
    );
}
export default Shows;