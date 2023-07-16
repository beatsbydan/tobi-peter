import './Socials.css'
import {LiaFacebookF} from 'react-icons/lia'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FiInstagram} from 'react-icons/fi'
import {BiLogoSnapchat} from 'react-icons/bi'
import {BiLogoTiktok} from 'react-icons/bi'

const Socials = (props) => {
    return ( 
        <div className="socials">
            <a href={props.facebook}><LiaFacebookF size={25} cursor={'pointer'}/></a>
            <a href={props.twitter}><AiOutlineTwitter size={25} cursor={'pointer'}/></a>
            <a href={props.instagram}><FiInstagram size={25} cursor={'pointer'}/></a>
            <a href={props.snapchat}><BiLogoSnapchat size={25} cursor={'pointer'}/></a>
            <a href={props.tiktok}><BiLogoTiktok size={25} cursor={'pointer'}/></a>
        </div>
    );
}
export default Socials;