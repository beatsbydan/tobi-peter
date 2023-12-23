import './UpdateImages.css'
import { useContext, useEffect } from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Image from './Image/Image'
import Loading from '../../../../../UI/Loading/Loading'
import logo from '../../../../../../Assets/logo.png'
import {BiImages} from 'react-icons/bi'
import {motion} from 'framer-motion'
import {useSelector, useDispatch} from 'react-redux'
import { fetchImages } from '../../../../../../Store/StateSlices/UserSlices/MusicSlice'
import {IoArrowBackOutline} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'


const UpdateImages = () => {
  const navigate = useNavigate()
  const {status, images} = useSelector(state => state.music)
  const dispatch = useDispatch()
  const {deleteImage} = useContext(ManageContext)
  useEffect(()=>{
    if(status.images === "idle"){
      dispatch(fetchImages())
    }
  },[dispatch, status.images])

  return (
    <motion.div 
      className="updateImages"
      initial={{width:'100%', opacity: 0}}
      animate={{width:'100%', opacity: 1}}
      exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
      <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
      <h2>UPDATE IMAGES <span><BiImages/></span></h2>
      <ul className="imagesList">
        {status.images === "pending" ? <Loading/> 
        : 
        status.images === 'success' && images.length > 0 ?  
        images.map((image, index)=>{
          return(
            <Image
              myId={index}
              key={index}
              delete={()=>deleteImage(image.url)}
              image={image.url}
            />
          )
        })
        :
        (status.images === "success" && images.length === 0) ? <p className="defaultText"><span><img src={logo} alt=""/></span>NO IMAGES AVAILABLE.</p>
        : 
        <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>
        }
      </ul>
    </motion.div>
  )
}

export default UpdateImages