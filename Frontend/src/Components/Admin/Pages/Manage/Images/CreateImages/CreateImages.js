import './CreateImages.css'
import {MdOutlineAdsClick} from 'react-icons/md'
import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import {BiImages} from 'react-icons/bi'
const CreateImages = () => {
  const ctx = useContext(ManageContext)
  const navigate = useNavigate()
  const {setAlert} = useAlert()

  const handleSubmit = (e) => {
    e.preventDefault()
    ctx.handleFilesSubmit()
    .then(success=>{
        if(success.yes){
            setAlert('success', 'Image(s) Uploaded!')
            setTimeout(()=>{
                navigate('/admin/manage')
            },1500)
        }
    })
  }

  return (
    <motion.div 
      className="createImages"
      initial={{width:'100%'}}
      animate={{width:'100%'}}
      exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
    >
      <h2>ADD IMAGES <span><BiImages/></span></h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="customary">
            <div className="customFile">
                <input type="file" className='customFileInput' multiple onChange={ctx.handleFilesChange} />
            </div>
            <small>Click image to add a file(s) <span><MdOutlineAdsClick size={25}/></span></small>
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