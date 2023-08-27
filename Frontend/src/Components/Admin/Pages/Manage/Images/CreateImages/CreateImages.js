import './CreateImages.css'
import {MdOutlineAdsClick} from 'react-icons/md'
import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import {BiImages} from 'react-icons/bi'
import Context from '../../../../../User/Context/Context'

const CreateImages = () => {
  const ctx = useContext(ManageContext)
  const userCtx = useContext(Context)
  const navigate = useNavigate()
  const {setAlert} = useAlert()

  const handleSubmit = (e) => {
    e.preventDefault()
    ctx.handleFilesSubmit()
    .then(success=>{
        if(success.yes){
            setAlert('success', 'Image(s) Uploaded!')
            userCtx.getImages()
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
      <h2>ADD IMAGES <span><BiImages/></span></h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="customary">
            <div className="customFile">
                <input type="file" className='customFileInput' multiple onChange={ctx.handleFilesChange} />
            </div>
            <small>Click image to add file(s) <span><MdOutlineAdsClick size={25}/></span></small>
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