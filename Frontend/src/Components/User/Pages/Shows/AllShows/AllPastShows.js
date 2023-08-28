import {useContext} from 'react'
import Context from '../../../Context/Context'
import Show from '../Show/Show'
import './AllShows.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { motion } from 'framer-motion';
import Loading from '../../../../UI/Loading/Loading';
import {useNavigate} from 'react-router-dom'
import logo from '../../../../../Assets/logo.png'

const AllPastShows = () => {
    const ctx = useContext(Context)
    const navigate = useNavigate()

    return (
        <motion.div 
            className="allMyShows"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}    
        >
            <AiOutlineArrowLeft cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h5 className="theShow">PAST SHOWS</h5>
            <ul className="showsList">
                {
                    ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/> 
                :
                    ctx.shows.myShows.pastShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>No shows available.</p>                            
                :
                    ctx.shows.myShows.pastShows.map((show,index)=>{
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
        </motion.div>
    )
}

export default AllPastShows