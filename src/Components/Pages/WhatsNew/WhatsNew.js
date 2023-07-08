import './WhatsNew.css'
import comingSoon from '../../../Assets/upcoming.svg'
import {LiaFacebookF} from 'react-icons/lia'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FiInstagram} from 'react-icons/fi'
import {BiLogoSnapchat} from 'react-icons/bi'
import {BiLogoTiktok} from 'react-icons/bi'

const WhatsNew = () => {
    return ( 
        <div className="whatsNew">
            <img className='comingSoon' src={comingSoon} alt="" />
            <div className="streamingPlatforms">
                <h5>CHOOSE YOUR PREFERRED STREAMING PLATFORM</h5>
                <ul>
                    <a href="https://www."><li>APPLE MUSIC</li></a>
                    <a href="https://www."><li>SPOTIFY</li></a>
                    <a href="https://www."><li>AUDIOMACK</li></a>
                    <a href="https://www."><li>YOUTUBE</li></a>
                    <a href="https://www."><li>TIDAL</li></a>
                    <a href="https://www."><li>BOOMPLAY</li></a>
                    <a href="https://www."><li>YOUTUBE MUSIC</li></a>
                </ul>
            </div>
            <div className="vip">
                <p>DON’T BE A DED GUY, JOIN THE VIP LIST</p>
                <form action="">
                    <input type="email" placeholder='email address' />
                    <button type='submit'>JOIN</button>
                </form>
            </div>
            <div className="socials">
                <a href="https://www."><LiaFacebookF size={27}/></a>
                <a href="https://www."><AiOutlineTwitter size={27}/></a>
                <a href="https://www."><FiInstagram size={27}/></a>
                <a href="https://www."><BiLogoSnapchat size={27}/></a>
                <a href="https://www."><BiLogoTiktok size={27}/></a>
            </div>
        </div>
    );
}
export default WhatsNew;