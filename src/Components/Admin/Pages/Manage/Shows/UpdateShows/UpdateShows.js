import './UpdateShows.css'
import {VscSortPrecedence} from 'react-icons/vsc'
import logo from '../../../../../../Assets/logo.png'
import {useContext, useEffect} from 'react'
import Loading from '../../../../../UI/Loading/Loading'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import Show from './Show/Show'
import {motion} from 'framer-motion'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { fetchShows } from '../../../../../../Store/StateSlices/UserSlices/ShowsSlice'
import {IoArrowBackOutline} from 'react-icons/io5'

const Update = () => {
    const {completeShow, deleteShow, getShow} = useContext(ShowsContext)
    const {status, shows} = useSelector(state => state.shows)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(status.all)
        if(status.all === "idle"){
            dispatch(fetchShows())
        }
    },[status, dispatch])
    return(
        <motion.div 
            className="update shows"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            <h2>LET'S SORT SOME SHOWS OUT <span><VscSortPrecedence size={40}/></span></h2>
            <div className="upcomingShows">
                <h5>UPCOMING SHOWS</h5>
                <ul className='showsList'>
                    {
                        status.all === "pending" ? <Loading/>
                        : 
                        status.all === 'success' && shows.upcomingShows.length > 0 ? 
                        shows.upcomingShows.map((show, index)=>{
                            return(
                                <Show
                                    completePrompt={()=>completeShow(show._id)}
                                    deletePrompt={()=>deleteShow(show._id)}
                                    key={index}
                                    myId={index}
                                    id={show._id}
                                    getShow={()=>getShow(show._id)}
                                    isComplete ={false}
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
                    <Link to={'/admin/manage/shows/updateShows/allUpcomingShows'}>SEE MORE</Link>
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
                                    completePrompt={()=>completeShow(show._id)}
                                    deletePrompt={()=>deleteShow(show._id)}
                                    key={index}
                                    myId={index}
                                    id={show._id}
                                    getShow={()=>getShow(show._id)}
                                    isComplete ={true}
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
                    <Link to={'/admin/manage/shows/updateShows/allPastShows'}>SEE MORE</Link>
                </div>
            </div>
        </motion.div>
    )
}
export default Update