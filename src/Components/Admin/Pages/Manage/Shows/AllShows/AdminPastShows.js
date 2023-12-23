import {useContext, useEffect} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import Show from '../UpdateShows/Show/Show'
import './AllShows.css'
import {IoArrowBackOutline} from 'react-icons/io5'
import { motion } from 'framer-motion';
import Loading from '../../../../../UI/Loading/Loading';
import {useNavigate} from 'react-router-dom'
import logo from '../../../../../../Assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShows } from '../../../../../../Store/StateSlices/UserSlices/ShowsSlice'

const AdminPastShows = () => {
    const {completeShow, deleteShow} = useContext(ShowsContext)
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
            className="allMyShows"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}    
        >   
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h5 className="theShow">PAST SHOWS</h5>
            <ul className="showsList allShows">
                { 
                    status.all === 'pending' ? <Loading/>
                :
                    (status.all === 'success' && shows.allShows.pastShows.length > 0) ?
                    shows.allShows.pastShows.map((show,index)=>{
                        return(
                            <Show
                                completePrompt={()=>completeShow(show._id)}
                                deletePrompt={()=>deleteShow(show._id)}
                                key={index}
                                isComplete ={true}
                                id={show._id}
                                myId={index}
                                title={show.title}
                                venue={show.venue}
                                date={show.date}
                            />
                        )
                    })
                    :
                    status.all === 'success' && shows.allShows.pastShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON.</p>
                    :
                    <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>
                }
            </ul>
        </motion.div>
    )
}

export default AdminPastShows