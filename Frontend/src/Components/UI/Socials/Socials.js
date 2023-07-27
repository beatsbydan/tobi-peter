import './Socials.css'
import {LiaFacebookF} from 'react-icons/lia'
import {AiOutlineTwitter} from 'react-icons/ai'
import {FiInstagram} from 'react-icons/fi'
import {BiLogoSnapchat} from 'react-icons/bi'
import {BiLogoTiktok} from 'react-icons/bi'

const Socials = (props) => {
    return ( 
        <div className="socials">
            <a href="https://www." target="_blank" rel="noreferrer"><LiaFacebookF size={25} cursor={'pointer'}/></a>
            <a href="https://twitter.com/tobipeter8" target="_blank" rel="noreferrer"><AiOutlineTwitter size={25} cursor={'pointer'}/></a>
            <a href="https://www.instagram.com/tobipeter8/" target="_blank" rel="noreferrer"><FiInstagram size={25} cursor={'pointer'}/></a>
            <a href="https://www.snapchat.com/add/tobipeter8?share_id=ZTiwqqraScOSopxgV0oRbg&locale=en_NG" target="_blank" rel="noreferrer"><BiLogoSnapchat size={25} cursor={'pointer'}/></a>
            <a href="https://www.tiktok.com/@tobipeter" target="_blank" rel="noreferrer"><BiLogoTiktok size={25} cursor={'pointer'}/></a>
        </div>
    );
}
export default Socials;