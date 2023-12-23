import './Blogs.css'
import {useEffect} from 'react'
import Blog from './Blog/Blog'
import Loading from '../../../../UI/Loading/Loading'
import logo from '../../../../../Assets/logo.png'
import {useSelector, useDispatch} from 'react-redux'
import { fetchBlogs } from '../../../../../Store/StateSlices/UserSlices/MusicSlice'

const Blogs = () => {
    const {status, blogs} = useSelector(state => state.music)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(status.blogs === 'idle'){
            dispatch(fetchBlogs())
        }
    }, [status.blogs, dispatch])
    return (
        <ul className="pressSection">
            {status.blogs === 'pending' ? <Loading/> 
            : 
            status.blogs === 'success' && blogs.length > 0 ?  
            blogs.map((blog, index)=>{
                return(
                    <Blog
                        key={index}
                        myId={index}
                        title={blog.title}
                        author={blog.author}
                        text={blog.text}
                        link={blog.link}
                        createdAt={blog.createdAt}
                    />
                )
            })
            :
            status.blogs === 'success' && blogs.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON. </p>
            :
            <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG. </p>
            }
        </ul>
    )
}
export default Blogs