import './Manage.css'
import {Link} from 'react-router-dom'
import {BiRightArrowAlt} from 'react-icons/bi'
import {motion} from 'framer-motion'

const Manage = () => {
    return(
        <motion.div 
            className='manage'
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className="showsBlock">
                <h2>SHOWS</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/shows/createShow'}>
                        CREATE SHOW
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/shows/updateShows'}>
                        UPDATE SHOWS
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
            <div className="musicBlock">
                <h2>MUSIC</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/songs/createSong'}>
                        CREATE SONG
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/songs/updateSongs'}>
                        UPDATE SONGS
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
            <div className="blogsBlock">
                <h2>BLOGS</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/blogs/createBlog'}>
                        CREATE BLOG
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/blogs/updateBlogs'}>
                        UPDATE BLOGS
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
            <div className="imagesBlock">
                <h2>BIO-IMAGES</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/images/addImage'}>
                        ADD IMAGE
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/images/updateImages'}>
                        UPDATE IMAGES
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
export default Manage