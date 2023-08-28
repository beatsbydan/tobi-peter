import './Blogs.css'
import {useContext} from 'react'
import Context from '../../../Context/Context'
import Blog from './Blog/Blog'
import Loading from '../../../../UI/Loading/Loading'
import logo from '../../../../../Assets/logo.png'

const Blogs = () => {
    const ctx = useContext(Context)
    return (
        <ul className="pressSection">
            {ctx.pending.isPending ? <Loading isPending={ctx.pending.isPending}/> 
            : 
            ctx.blogs.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span>COMING SOON. </p> 
            : 
            ctx.blogs.map((blog, index)=>{
                return(
                    <Blog
                        key={index}
                        myId={index}
                        title={blog.title}
                        author={blog.author}
                        text={blog.text}
                        link={blog.link}
                    />
                )
            })}
        </ul>
    )
}
export default Blogs