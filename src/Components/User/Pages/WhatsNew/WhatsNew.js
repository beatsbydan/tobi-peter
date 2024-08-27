import {useState, useEffect} from 'react'
import './WhatsNew.css'
import Socials from '../../../UI/Socials/Socials';
import Loading from '../../../UI/Loading/Loading';
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms';
import { motion } from 'framer-motion';
import logo from '../../../../Assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { clearSubscriptionErrors, fetchMusic, sendSubscription } from '../../../../Store/StateSlices/UserSlices/HomeSlice';
import useAlert from '../../../../Hooks/useAlert';
import useIsProcessing from '../../../../Hooks/useIsProcessing';
import ValidateWhatsNew from './ValidateWhatsNew';
import LazyImage from '../../../UI/LazyImage/LazyImage';

const WhatsNew = () => {
    const {setAlert} = useAlert()
    const {setProcessing} = useIsProcessing()
    const dispatch = useDispatch()
    
    const {status, music, subscription} = useSelector(state => state.home)
    useEffect(()=>{
        if(status === 'idle'){
            dispatch(fetchMusic())
        }
    },[status, dispatch])

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

    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
    
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handleSubmit = (e) => {
        dispatch(clearSubscriptionErrors())
        e.preventDefault()
        const errors = ValidateWhatsNew(email)
        setError(errors)
        if(errors.none){
            const data = {
                email: email
            }
            dispatch(sendSubscription(data))
        }
    }

    useEffect(()=>{
        if(subscription.status === "idle"){
            return
        }
        else if(subscription.status === "pending"){
            setProcessing(true)
        }
        else if(subscription.status === "success"){
            setEmail('')
            setProcessing(false)
            setAlert('success', 'Subscription Successful!')
            dispatch(clearSubscriptionErrors())
        }
        else{
            setTimeout(()=>{
                setEmail('')
                setProcessing(false)
            }, 1000)
            setAlert('failure', 'Something went wrong!')
        }

    },[subscription.status, setAlert, setProcessing, dispatch])

    return ( 
        <motion.div 
            className="whatsNew"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="coverArtSection">
            {   
                status === 'pending' ? <Loading/> 
                : 
                (status === 'success' && music?.coverArt) ? <LazyImage src={music?.coverArt} type="image" alt="" /> 
                :
                (status === 'success' && !music?.coverArt) ? <p className="defaultText"><span><img src={logo} alt=""/></span>SONG UNAVAILABLE.</p>
                :
                <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>     
            }
            </div>
            <div className="streamingPlatformsBlock">
                <h5>CHOOSE YOUR PREFERRED STREAMING PLATFORM</h5>
                {
                    music ? <StreamingPlatforms song={music} isEmpty={false}/>
                    :
                    <StreamingPlatforms song={defaultSong} isEmpty={true}/>
                }
            </div>
            <div className="vip">
                <p>DON’T BE A DED GUY, JOIN THE VIP LIST</p>
                <form action="" onSubmit={handleSubmit}>
                    <div className="formElement">
                        <small>{error.email || subscription.error}</small>
                        <input className={error.email || subscription.error ?'errorField': ''} type="text" placeholder='Email address' value={email} onChange={handleChange} />
                    </div>
                    <button type='submit'>JOIN</button>
                </form>
            </div>
            <div className="socialsBlock">
                <Socials/>
            </div>
        </motion.div>
    );
}
export default WhatsNew;