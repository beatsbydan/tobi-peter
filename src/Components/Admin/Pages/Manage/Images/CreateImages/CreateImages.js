import './CreateImages.css'
import {MdOutlineAdsClick} from 'react-icons/md'
import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import {BiImages} from 'react-icons/bi'
import { fetchImages } from '../../../../../../Store/StateSlices/UserSlices/MusicSlice'
import { useDispatch } from 'react-redux'
import {IoArrowBackOutline} from 'react-icons/io5'

const CreateImages = () => {
  const {handleFilesChange, handleFilesSubmit} = useContext(ManageContext)
  const navigate = useNavigate()
  const {setAlert} = useAlert()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleFilesSubmit()
    .then(success=>{
        if(success.yes){
            setAlert('success', 'Image(s) Uploaded!')
            dispatch(fetchImages())
            setTimeout(()=>{
                navigate('/admin/manage')
            },1500)
        }
    })
  }

  return (
    <motion.div 
      className="createImages"
      initial={{width:'100%', opacity: 0}}
      animate={{width:'100%', opacity: 1}}
      exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
      <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
      <h2>ADD IMAGES <span><BiImages/></span></h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="customary">
            <div className="customFile">
                <input type="file" className='customFileInput' multiple onChange={handleFilesChange} />
            </div>
            <small>Click to add image(s) <span><MdOutlineAdsClick size={25}/></span></small>
        </div>
        <div className="formActions">
            <button type="submit">
                ADD
            </button>
        </div>
      </form>
    </motion.div>
  )
}

export default CreateImages