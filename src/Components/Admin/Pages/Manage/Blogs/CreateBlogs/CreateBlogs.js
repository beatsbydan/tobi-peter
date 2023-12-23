import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import './CreateBlogs.css'
import {motion} from 'framer-motion'
import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import useAlert from '../../../../../../Hooks/useAlert'
import { useNavigate } from 'react-router-dom'
import {FaBlog} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import { fetchBlogs } from '../../../../../../Store/StateSlices/UserSlices/MusicSlice'
import {IoArrowBackOutline} from 'react-icons/io5'

const CreateBlogs = () => {
  const {handleCreateBlogSubmit, handleCreateBlogDataChange, createBlogData, createBlogErrors} = useContext(ManageContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {setAlert} = useAlert()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateBlogSubmit()
    .then(success=>{
      if(success.yes){
        setAlert('success', 'Blog created!')
        dispatch(fetchBlogs())
        setTimeout(()=>{
            navigate('/admin/manage')
        },1500)
      }
    })
  }
  return (
    <motion.div 
      className="createBlogs"
      initial={{width:'100%', opacity: 0}}
      animate={{width:'100%', opacity: 1}}
      exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
      <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
      <h2>CREATE A BLOG  <span><FaBlog/></span></h2>
      <form action="" onSubmit={handleSubmit}>
        <InputComponent
            id={"title"}
            label={"Title:"}
            error={createBlogErrors.title}
            type={"text"}
            placeholder={"Enter title"}
            value={createBlogData.title}
            onChange={handleCreateBlogDataChange}
        />
        <InputComponent
            id={"author"}
            label={"Author:"}
            error={createBlogErrors.author}
            type={"text"}
            placeholder={"Enter author"}
            value={createBlogData.author}
            onChange={handleCreateBlogDataChange}
        />
        <InputComponent
            id={"text"}
            label={"Text:"}
            error={createBlogErrors.text}
            type={"textarea"}
            placeholder={"Enter text"}
            value={createBlogData.text}
            onChange={handleCreateBlogDataChange}
        />
        <InputComponent
            id={"link"}
            label={"Link:"}
            error={createBlogErrors.link}
            type={"text"}
            placeholder={"Enter link"}
            value={createBlogData.link}
            onChange={handleCreateBlogDataChange}
        />
        <div className="formActions">
            <button type="submit">
                CREATE
            </button>
        </div>
      </form>
    </motion.div>
  )
}

export default CreateBlogs