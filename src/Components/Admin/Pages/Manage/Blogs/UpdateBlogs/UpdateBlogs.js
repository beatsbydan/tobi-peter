import {useContext} from 'react'
import './UpdateBlogs.css'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Blog from './Blog/Blog'
import Loading from '../../../../../UI/Loading/Loading'
import {FaBlog} from 'react-icons/fa'
import {motion} from 'framer-motion'
import logo from '../../../../../../Assets/logo.png'

const UpdateBlogs = () => {
  const ctx = useContext(ManageContext)
  return (
    <motion.div 
      className="updateBlogs"
      initial={{width:'100%', opacity: 0}}
      animate={{width:'100%', opacity: 1}}
      exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
      <h2>UPDATE BLOGS <span><FaBlog/></span></h2>
      <ul className="blogsList">
        {
          ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/> 
          : 
          ctx.blogs.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>NO BLOGS AVAILABLE. </p> 
          :
          ctx.blogs.map((blog,index)=>{
            return(
              <Blog
                key={index}
                myId={index}
                title={blog.title}
                author={blog.author}
                id={blog._id}
                createdAt={blog.createdAt}
                delete={()=>ctx.deleteBlog(blog._id)}
                getBlog={()=>ctx.getBlog(blog._id)}
                text={blog.text}
                link={blog.link}
              />
            )
          })
        }
      </ul>
    </motion.div>
  )
}

export default UpdateBlogs