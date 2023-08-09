import './Manage.css'
import {Link} from 'react-router-dom'
import {BiRightArrowAlt} from 'react-icons/bi'
import {motion} from 'framer-motion'

const Manage = () => {
    return(
        <motion.div 
            className='manage'
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <div className="showsBlock">
                <h2>SHOWS</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/createShow'}>
                        CREATE SHOW
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/updateShows'}>
                        UPDATE SHOWS
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
            <div className="musicBlock">
                <h2>MUSIC</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/createSong'}>
                        CREATE SONG
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/updateSongs'}>
                        UPDATE SONGS
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
export default Manage