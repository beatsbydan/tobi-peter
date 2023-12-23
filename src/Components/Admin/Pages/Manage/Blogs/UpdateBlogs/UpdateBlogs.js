import {useContext, useEffect} from 'react'
import './UpdateBlogs.css'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Blog from './Blog/Blog'
import Loading from '../../../../../UI/Loading/Loading'
import {FaBlog} from 'react-icons/fa'
import {motion} from 'framer-motion'
import logo from '../../../../../../Assets/logo.png'
import {useSelector, useDispatch} from 'react-redux'
import { fetchBlogs } from '../../../../../../Store/StateSlices/UserSlices/MusicSlice'
import {IoArrowBackOutline} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'

const UpdateBlogs = () => {
  const {status, blogs} = useSelector(state => state.music)
  const dispatch = useDispatch()
  const {deleteBlog} = useContext(ManageContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(status.blogs === "idle"){
      dispatch(fetchBlogs())
    }
  },[dispatch, status.blogs])
  return (
    <motion.div 
      className="updateBlogs"
      initial={{width:'100%', opacity: 0}}
      animate={{width:'100%', opacity: 1}}
      exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
      <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
      <h2>UPDATE BLOGS <span><FaBlog/></span></h2>
      <ul className="blogsList">
        {
          status.blogs === "pending"? <Loading/> 
          : 
          (status.blogs === "success" && blogs.length > 0) ? 
          blogs.map((blog,index)=>{
            return(
              <Blog
                key={index}
                myId={index}
                title={blog.title}
                author={blog.author}
                id={blog._id}
                createdAt={blog.createdAt}
                delete={()=>deleteBlog(blog._id)}
                text={blog.text}
                link={blog.link}
              />
            )
          })
          : 
          (status.blogs === "success" && blogs.length === 0) ? <p className="defaultText"><span><img src={logo} alt=""/></span>NO BLOGS AVAILABLE. </p>
          :
          <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG. </p>
        }
      </ul>
    </motion.div>
  )
}

export default UpdateBlogs