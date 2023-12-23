import './Home.css'
import {useEffect, useContext} from 'react' 
import AuthContext from '../../Context/AuthContext/AuthContext'
import InputComponent from '../../../UI/InputComponent/InputComponent'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms'
import useAlert from '../../../../Hooks/useAlert'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'
import Chart from './Chart/Chart'
import React from 'react'
import {motion} from 'framer-motion'
import logo from '../../../../Assets/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubscribers } from '../../../../Store/StateSlices/AdminSlices/HomeSlice'
import { fetchMusic } from '../../../../Store/StateSlices/UserSlices/HomeSlice'
import { fetchShows } from '../../../../Store/StateSlices/UserSlices/ShowsSlice'
import Loading from '../../../UI/Loading/Loading'

const Home = () => {
    const {status, subscribers} = useSelector(state => state.adminHome)
    const {status: userMusicStatus, music} = useSelector(state => state.home)
    const {status: adminShowsStatus, shows} = useSelector(state => state.shows)
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)
    const {setAlert} = useAlert()

    useEffect(()=>{
        if(status.subscribers === "idle"){
            dispatch(fetchSubscribers())
        }
        if(userMusicStatus === "idle"){
            dispatch(fetchMusic())
        }
        if(adminShowsStatus.all === "idle"){
            dispatch(fetchShows())
        }
    },[dispatch, status.subscribers, userMusicStatus, adminShowsStatus])

    const date = new Date(shows?.upcomingShows[0]?.date)
    const myDate = date.getDate()
    const myMonth = date.getMonth()

    const getMonth = (myMonth) => {
        date.setMonth(myMonth)
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }

    const txtMonth = getMonth(myMonth)

    const handleSubmit = (e) => {
        e.preventDefault()
        authCtx.handleChangePasswordSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Password changed!')
            }
        })
    }
    
    const defaultSong = {
        streamingLink: {
            appleMusic: '',
            spotify: '',
            audiomack: '',
            youtube: '',
            tidal: '',
            boomPlay: '',
            youtubeMusic: ''
        }
    }

    return ( 
        <motion.div 
            className="adminHome"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="homeIntro">
                <h1>Welcome back!</h1>
            </div>
            <div className="statsBlock columnFlex">
                <h3>STATISTICS</h3>
                <p>Let's map out your progress of your shows and events!</p>
                <div className="showsChart">
                    <Chart/>
                </div>
                <div className="subscribers">
                    <h5>SUBSCRIBERS</h5>
                    <p>Yoo! You've got <span>{subscribers.length}</span> subscriber(s)!</p>
                </div>
            </div>
            <div className="events columnFlex">
                <h3>EVENTS</h3>
                <h5>NEW SONG</h5>
                <div className="newSong">
                    <p>The world ain't ready for this new project!</p>
                    <div className="myNewSong">
                        <div className="myNewSongBlock">
                            {
                                userMusicStatus === 'pending' ? <Loading/> 
                                : 
                                (userMusicStatus === 'success' && music?.coverArt) ? <img className='newSongImg' src={music?.coverArt} alt="" /> 
                                :
                                (userMusicStatus === 'success' && !music?.coverArt) ? <p className="defaultText"><span><img src={logo} alt=""/></span>SONG UNAVAILABLE.</p>
                                :
                                <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p> 
                            }
                        </div>
                        {!music?.title ? '' : <p className="songTitle">Title: {music?.title?.toUpperCase()}</p>}
                        {
                            music ? <StreamingPlatforms song={music} isEmpty={false}/>
                            :
                            <StreamingPlatforms song={defaultSong} isEmpty={true}/>
                        }
                    </div>
                </div>
                <h5>NEXT SHOW</h5>
                <div className="nextShowBlock">
                    {
                        shows.upcomingShows[0] ?
                        <div className="nextShow">
                            <p>Here's your next show...</p>
                            <div className="show">
                                <div className='left'>
                                    <div className='date'>
                                        <small className='month'>{txtMonth}</small>
                                        <h5 className='day'>{myDate}</h5>
                                    </div>
                                    <h5 className='desc'>DJ</h5>
                                    <div className='location'>
                                        <h5 className='title'>{shows.upcomingShows[0].title}</h5>
                                        <small className='venue'>{shows.upcomingShows[0].venue}</small>
                                    </div>    
                                </div>
                                {<a target='_blank' rel="noreferrer" href={shows.upcomingShows[0].ticketLink}>
                                    <BsTicketPerforated className={'ticket'} size={30}/>
                                    <BiRightArrowAlt className={'myArrow'}/>
                                    <span>GET TICKETS</span>
                                </a>}
                            </div>
                        </div>
                        :
                        <p className="defaultText"><span><img src={logo} alt=""/></span>NO SHOW AVAILABLE. </p>
                    }
                </div>
            </div>
            <div className="changeBlock">
                <h3>CHANGE PASSWORD</h3>
                <form action="" className='auth' onSubmit={handleSubmit}>
                    <InputComponent
                        label={"New password"}
                        error={authCtx.authErrors.changeErrors.newPassword}
                        type={"password"}
                        placeholder={"Enter your password"}
                        value={authCtx.authDetails.newPassword}
                        onChange={authCtx.handleNewPasswordChange}
                    />
                    <InputComponent
                        label={"Confirm password"}
                        error={authCtx.authErrors.changeErrors.confirmPassword}
                        type={"password"}
                        placeholder={"Enter your password"}
                        value={authCtx.authDetails.confirmPassword}
                        onChange={authCtx.handleConfirmPasswordChange}
                    />
                    <div className="formActions">
                        <button type="submit">CHANGE</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
export default Home;