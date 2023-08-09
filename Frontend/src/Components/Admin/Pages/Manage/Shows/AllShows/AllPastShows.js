import {useContext} from 'react'
import ShowsContext from '../../../../ManageContext/ShowsContext/ShowsContext'
import Show from '../Update/Show/Show'
import './AllShows.css'
import { motion } from 'framer-motion';
import {BiSolidSlideshow} from 'react-icons/bi'
import Loading from '../../../../../UI/Loading/Loading';

const AllPastShows = () => {
    const ctx = useContext(ShowsContext)
    return (
        <motion.div 
            className="allMyShows"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}    
        >
            <h3>HERE ARE MY PAST SHOWS <span><BiSolidSlideshow size={35}/></span></h3>
            <ul className="showsList allShows">
                {ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/>:
                    ctx.shows.myShows.upcomingShows.map((show,index)=>{
                        return(
                            <Show
                                key={index}
                                title={show.title}
                                venue={show.venue}
                                date={show.date}
                            />
                        )
                    })
                }
            </ul>
        </motion.div>
    )
}

export default AllPastShows