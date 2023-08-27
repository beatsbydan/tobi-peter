import './Update.css'
import {VscSortPrecedence} from 'react-icons/vsc'
import {TfiFaceSad} from 'react-icons/tfi'
import {useContext} from 'react'
import Loading from '../../../../../UI/Loading/Loading'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import Show from './Show/Show'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

const Update = () => {
    const ctx = useContext(ShowsContext)
    return(
        <motion.div 
            className="update shows"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <h2>LET'S SORT SOME SHOWS OUT <span><VscSortPrecedence size={40}/></span></h2>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    {
                        ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/>
                        : 
                        ctx.shows.upcomingShows.length === 0 ? <p className="defaultText">No available shows <span><TfiFaceSad size={25}/></span></p>                            
                        : 
                        ctx.shows.upcomingShows.map((show, index)=>{
                            return(
                                <Show
                                    completePrompt={()=>ctx.completeShow(show._id)}
                                    deletePrompt={()=>ctx.deleteShow(show._id)}
                                    key={index}
                                    myId={index}
                                    isComplete ={false}
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
                    <Link onClick={ctx.getShows} to={'/admin/manage/shows/updateShows/allUpcomingShows'}>SEE MORE</Link>
                </div>
            </div>
            <div className="pastShows">
                <h5>PAST SHOWS</h5>
                <ul className='showsList'>
                    {
                        ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/>
                        : 
                        ctx.shows.pastShows.length === 0? <p className="defaultText">No available shows <span><TfiFaceSad size={25}/></span></p>
                        :
                        ctx.shows.pastShows.map((show,index)=>{
                            return(
                                <Show
                                    completePrompt={()=>ctx.completeShow(show._id)}
                                    deletePrompt={()=>ctx.deleteShow(show._id)}
                                    key={index}
                                    isComplete ={true}
                                    title={show.title}
                                    venue={show.venue}
                                    date={show.date}
                                />
                            )
                        })
                    }
                </ul>
                <div className="myShowsActions">
                    <Link onClick={ctx.getShows}  to={'/admin/manage/shows/updateShows/allPastShows'}>SEE MORE</Link>
                </div>
            </div>
        </motion.div>
    )
}
export default Update