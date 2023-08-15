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
    ctx.handleBlogSubmit()
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
      initial={{width:'100%'}}
      animate={{width:'100%'}}
      exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
    >
      <h2>CREATE A BLOG  <span><FaBlog/></span></h2>
      <form action="" onSubmit={handleSubmit}>
        <InputComponent
            id={"title"}
            label={"Title:"}
            error={ctx.blogErrors.title}
            type={"text"}
            placeholder={"Enter title"}
            value={ctx.blogData.title}
            onChange={ctx.handleBlogDataChange}
        />
        <InputComponent
            id={"author"}
            label={"Author:"}
            error={ctx.blogErrors.author}
            type={"text"}
            placeholder={"Enter author"}
            value={ctx.blogData.author}
            onChange={ctx.handleBlogDataChange}
        />
        <InputComponent
            id={"text"}
            label={"Text:"}
            error={ctx.blogErrors.text}
            type={"text"}
            placeholder={"Enter text"}
            value={ctx.blogData.text}
            onChange={ctx.handleBlogDataChange}
        />
        <InputComponent
            id={"link"}
            label={"Link:"}
            error={ctx.blogErrors.link}
            type={"text"}
            placeholder={"Enter link"}
            value={ctx.blogData.link}
            onChange={ctx.handleBlogDataChange}
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