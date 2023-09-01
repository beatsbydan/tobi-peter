import {useContext} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import Show from '../UpdateShows/Show/Show'
import './AllShows.css'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { motion } from 'framer-motion';
import Loading from '../../../../../UI/Loading/Loading';
import {useNavigate} from 'react-router-dom'
import logo from '../../../../../../Assets/logo.png'

const AdminPastShows = () => {
    const ctx = useContext(ShowsContext)
    const navigate = useNavigate()

    return (
        <motion.div 
            className="allMyShows"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}    
        >   
            <AiOutlineArrowLeft cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h5 className="theShow">PAST SHOWS</h5>
            <ul className="showsList allShows">
                { 
                    ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/>
                :
                    ctx.shows.myShows.pastShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>NO AVAILABLE SHOWS. </p>                            
                :
                    ctx.shows.myShows.pastShows.map((show,index)=>{
                        return(
                            <Show
                                completePrompt={()=>ctx.completeShow(show._id)}
                                deletePrompt={()=>ctx.deleteShow(show._id)}
                                key={index}
                                isComplete ={true}
                                id={show._id}
                                getShow={()=>ctx.getShow(show._id)}
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

export default AdminPastShows