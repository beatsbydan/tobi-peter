import { LiaFacebookF } from 'react-icons/lia'
import { AiOutlineTwitter } from 'react-icons/ai'
import { FiInstagram } from 'react-icons/fi'
import { BiLogoSnapchat } from 'react-icons/bi'
import { BiLogoTiktok } from 'react-icons/bi'

const Socials = () => {
  return (
    <div className="m-[inherit] flex w-[90%] max-w-[200px] flex-row items-center justify-between">
      <a
        href="https://m.facebook.com/profile.php/?id=100063644931574"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="hover:opacity-80"
      >
        <LiaFacebookF size={25} cursor={'pointer'} />
      </a>
      <a
        href="https://twitter.com/tobipeter8"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter"
        className="hover:opacity-80"
      >
        <AiOutlineTwitter size={25} cursor={'pointer'} />
      </a>
      <a
        href="https://www.instagram.com/tobipeter8/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="hover:opacity-80"
      >
        <FiInstagram size={25} cursor={'pointer'} />
      </a>
      <a
        href="https://www.snapchat.com/add/tobipeter8?share_id=ZTiwqqraScOSopxgV0oRbg&locale=en_NG"
        target="_blank"
        rel="noreferrer"
        aria-label="Snapchat"
        className="hover:opacity-80"
      >
        <BiLogoSnapchat size={25} cursor={'pointer'} />
      </a>
      <a
        href="https://www.tiktok.com/@tobipeter"
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok"
        className="hover:opacity-80"
      >
        <BiLogoTiktok size={25} cursor={'pointer'} />
      </a>
    </div>
  )
}
export default Socials
