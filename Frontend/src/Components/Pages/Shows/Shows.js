import './Shows.css'
import {useContext} from 'react'
import Context from '../../../Context/Context'
import Show from './Show/Show'
import {BiRightArrowAlt} from 'react-icons/bi'
import {TfiFaceSad} from 'react-icons/tfi'
import Loading from '../../UI/Loading/Loading'

const Shows = () => {
    const ctx = useContext(Context)
    return ( 
        <div className="shows">
            <div className="actionsBlock">
                <a href="https://www.">
                    BOOK TOBI PETER
                    <BiRightArrowAlt/>
                </a>
                <a href="https://www.">
                    DOWNLOAD EPK
                    <BiRightArrowAlt/>
                </a>
            </div>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    {ctx.details.upcomingIsPending ? 
                            <Loading isPending = {ctx.details.upcomingIsPending}/>
                        : 
                            (!ctx.shows.upcomingShows || ctx.shows.upcomingShows.length === 0 ? <h2 className="defaultText">No available shows <span><TfiFaceSad size={35}/></span></h2>                            
                            : 
                                ctx.shows.upcomingShows.map((show,index)=>{
                            return(
                                <Show
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
                        (!ctx.shows.pastShows || ctx.shows.pastShows.length === 0? <h2 className="defaultText">No available shows <span><TfiFaceSad size={35}/></span></h2>
                        :
                            ctx.shows.pastShows.map((show,index)=>{
                                return(
                                    <Show
                                        key={index}
                                        title={show.title}
                                        venue={show.venue}
                                        date={show.date}
                                    />
                                )
                        }))
                }
                </ul>
                <div className="myShowsActions">
                    {ctx.details.pastType === 'less' ? <button onClick={ctx.handlePastMoreType}>SEE MORE</button> : <button onClick={ctx.handlePastLessType}>SEE LESS</button> }
                </div>
            </div>
        </div>
    );
}
export default Shows;