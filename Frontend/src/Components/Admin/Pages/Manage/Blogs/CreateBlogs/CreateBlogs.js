import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import './CreateBlogs.css'
import {motion} from 'framer-motion'
import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import useAlert from '../../../../../../Hooks/useAlert'
import { useNavigate } from 'react-router-dom'
import {FaBlog} from 'react-icons/fa'

const CreateBlogs = () => {
  const ctx = useContext(ManageContext)
  const navigate = useNavigate()
  const {setAlert} = useAlert()
  const handleSubmit = (e) => {
    e.preventDefault()
    ctx.handleCreateBlogSubmit()
    .then(success=>{
      if(success.yes){
        setAlert('success', 'Blog created!')
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
      <h2>CREATE A BLOG  <span><FaBlog/></span></h2>
      <form action="" onSubmit={handleSubmit}>
        <InputComponent
            id={"title"}
            label={"Title:"}
            error={ctx.createBlogErrors.title}
            type={"text"}
            placeholder={"Enter title"}
            value={ctx.createBlogData.title}
            onChange={ctx.handleCreateBlogDataChange}
        />
        <InputComponent
            id={"author"}
            label={"Author:"}
            error={ctx.createBlogErrors.author}
            type={"text"}
            placeholder={"Enter author"}
            value={ctx.createBlogData.author}
            onChange={ctx.handleCreateBlogDataChange}
        />
        <InputComponent
            id={"text"}
            label={"Text:"}
            error={ctx.createBlogErrors.text}
            type={"textarea"}
            placeholder={"Enter text"}
            value={ctx.createBlogData.text}
            onChange={ctx.handleCreateBlogDataChange}
        />
        <InputComponent
            id={"link"}
            label={"Link:"}
            error={ctx.createBlogErrors.link}
            type={"text"}
            placeholder={"Enter link"}
            value={ctx.createBlogData.link}
            onChange={ctx.handleCreateBlogDataChange}
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