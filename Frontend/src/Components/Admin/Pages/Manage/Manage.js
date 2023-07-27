import './Manage.css'
import {Link} from 'react-router-dom'
import {BiRightArrowAlt} from 'react-icons/bi'

const Manage = () => {
    return(
        <div className='manage'>
            <div className="showsBlock">
                <h2>SHOWS</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/createShows'}>
                        CREATE SHOW
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/updateShows'}>
                        UPDATE SHOW
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
            <div className="musicBlock">
                <h2>MUSIC</h2>
                <div className="createBlock">
                    <Link to={'/admin/manage/updateLinks'}>
                        UPDATE LINKS
                        <BiRightArrowAlt size={20}/>
                    </Link>
                    <Link to={'/admin/manage/updateCoverArt'}>
                        UPDATE COVER-ART
                        <BiRightArrowAlt size={20}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Manage