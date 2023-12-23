import Show from '../Show/Show'
import './AllShows.css'
import { IoArrowBackOutline } from 'react-icons/io5'
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom'
import logo from '../../../../../Assets/logo.png'
import {useSelector, useDispatch} from 'react-redux'
import Loading from '../../../../UI/Loading/Loading';
import { fetchShows } from '../../../../../Store/StateSlices/UserSlices/ShowsSlice';
import {useEffect} from 'react'

const AllPastShows = () => {
    const {status, shows} = useSelector(state => state.shows)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(status.all === "idle"){
            dispatch(fetchShows())
        }
    },[status.all, dispatch])

    return (
        <motion.div 
            className="allMyShows"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}    
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h5 className="theShow">PAST SHOWS</h5>
            <ul className="showsList">
                {
                    status.all === "pending" ? <Loading/>
                :
                    (status.all === "success" && shows.allShows.pastShows.length > 0) ?                           
                    shows.allShows.pastShows.map((show,index)=>{
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
                    status.all === 'success' && shows.allShows.pastShows.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON.</p>
                    :
                    <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>
                }
            </ul>
        </motion.div>
    )
}

export default AllPastShows