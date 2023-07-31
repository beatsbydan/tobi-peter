import './Home.css'
import {useContext} from 'react' 
import AuthContext from '../../Context/AuthContext/AuthContext'
import HomeContext from '../../Context/HomeContext/HomeContext'
import ShowsContext from '../../Context/ManageContext/ShowsContext/ShowsContext'
import Context from '../../../User/Context/Context'
import InputComponent from '../../../UI/InputComponent/InputComponent'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms'
import useAlert from '../../../../Hooks/useAlert'
import {BsTicketPerforated} from 'react-icons/bs'
import {BiRightArrowAlt} from 'react-icons/bi'
import React from 'react'

const Home = () => {
    const authCtx = useContext(AuthContext)
    const homeCtx = useContext(HomeContext)
    const {shows} = useContext(ShowsContext)
    const {song} = useContext(Context)
    
    const {setAlert} = useAlert()
    
    const date = /*new Date(shows.upcomingShows[0]?.date) ||*/ new Date()
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
    return ( 
        <div className="adminHome">
            <div className="homeIntro">
                <h1>Welcome back!</h1>
            </div>
            <div className="statsBlock columnFlex">
                <h3>STATISTICS</h3>
                <p>Let's map out your progress with your shows and events!</p>
                <div className="showsChart">

                </div>
                <div className="subscribers">
                    <h5>SUBSCRIBERS</h5>
                    <p>Yoo! You've got <span>{homeCtx.subscribers?.length || 0}</span> subscribers!</p>
                </div>
            </div>
            <div className="events columnFlex">
                <h3>EVENTS</h3>
                <h5>NEW SONG</h5>
                <div className="newSong">
                    <p>The world ain't ready for this new project!</p>
                    <div className="myNewSong">
                        <img src={song?.coverArt} alt =''/>
                        <p>Title: <span>{song.title?.toUpperCase()}</span></p>
                        <StreamingPlatforms/>
                    </div>
                </div>
                <h5>NEXT SHOW</h5>
                <div className="nextShow">
                    <p>You getting set for {shows.upcomingShows[0]?.title}?</p>
                    <div className="show">
                        <div className='left'>
                            <div className='date'>
                                <small className='month'>{txtMonth}</small>
                                <h5 className='day'>{myDate}</h5>
                            </div>
                            <h5 className='desc'>DJ</h5>
                            <div className='location'>
                                <h5 className='title'>{shows.upcomingShows[0]?.title || 'Waazabi'}</h5>
                                <small className='venue'>{shows.upcomingShows[0]?.venue || 'Ikorodu'}</small>
                            </div>    
                        </div>
                        {<a href={shows.upcomingShows[0]?.ticketLink}>
                            <BsTicketPerforated className={'ticket'} size={30}/>
                            <BiRightArrowAlt className={'myArrow'}/>
                            <span>GET TICKETS</span>
                        </a>}
                    </div>
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
        </div>
    );
}
export default Home;