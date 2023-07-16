import {useState} from 'react'
import './WhatsNew.css'
import comingSoon from '../../../Assets/upcoming.svg'
import Socials from '../../UI/Socials/Socials';
import StreamingPlatforms from '../../UI/StreamingPlatforms/StreamingPlatforms';

const WhatsNew = () => {
    const [email, setEmail] = useState('')
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return ( 
        <div className="whatsNew">
            <img className='comingSoon' src={comingSoon} alt="" />
            <div className="streamingPlatformsBlock">
                <h5>CHOOSE YOUR PREFERRED STREAMING PLATFORM</h5>
                <StreamingPlatforms/>
            </div>
            <div className="vip">
                <p>DON’T BE A DED GUY, JOIN THE VIP LIST</p>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" placeholder='email address' value={email} onChange={handleChange} />
                    <button type='submit'>JOIN</button>
                </form>
            </div>
            <div className="socialsBlock">
                <Socials
                    facebook={"https://www."}
                    snapchat={"https://www."}
                    twitter={"https://www."}
                    tiktok={"https://www."}
                    instagram={"https://www."}
                />
            </div>
        </div>
    );
}
export default WhatsNew;