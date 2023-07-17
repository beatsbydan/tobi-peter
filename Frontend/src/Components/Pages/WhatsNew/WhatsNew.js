import {useContext} from 'react'
import './WhatsNew.css'
import comingSoon from '../../../Assets/upcoming.svg'
import Socials from '../../UI/Socials/Socials';
import Context from '../../../Context/Context'
import StreamingPlatforms from '../../UI/StreamingPlatforms/StreamingPlatforms';

const WhatsNew = () => {
    const ctx = useContext(Context)
    return ( 
        <div className="whatsNew">
            <img className='comingSoon' src={comingSoon} alt="" />
            <div className="streamingPlatformsBlock">
                <h5>CHOOSE YOUR PREFERRED STREAMING PLATFORM</h5>
                <StreamingPlatforms/>
            </div>
            <div className="vip">
                <p>DON’T BE A DED GUY, JOIN THE VIP LIST</p>
                <form action="" onSubmit={ctx.handleSubmit}>
                    <div className="formElement">
                        <small>{ctx.error}</small>
                        <input className={ctx.error ?'errorField': ''} type="text" placeholder='email address' value={ctx.email} onChange={ctx.handleChange} />
                    </div>
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