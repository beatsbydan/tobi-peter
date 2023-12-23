import './Blog.css'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { useState } from 'react'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'
import {Link} from 'react-router-dom'
import {TiEdit} from 'react-icons/ti'
import {useDispatch} from 'react-redux'
import { fetchBlogs } from '../../../../../../../Store/StateSlices/UserSlices/MusicSlice'

const Blog = (props) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    
    const [isVisible, setIsVisible] = useState({
        delete:false,
        edit: false,
    })

    
    const delay = 100;
    
    const handleDeleteVisibility = () => {
        setIsVisible({
            delete:!isVisible.delete
        })
    }

    const handleEditVisibility = () => {
        setIsVisible({
            edit:!isVisible.edit
        })
    }
    
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const deletePrompt = () => {
        props.delete()
        .then(success=>{
            if(success.yes){
                dispatch(fetchBlogs())
                setIsOpen(false)
            }
        })
    }

    return (
        <li className = "blogItem" style={{ animationDelay: `${props.myId * delay}ms` }}>
            <div className="editableBlog">
                <div className="edit">
                    <small className={isVisible.edit ? "visible altText" : "altText"}>Edit</small>
                    <Link to={`/admin/manage/blogs/updateBlogs/updateBlog/${props.id}`} onClick={props.getBlog}>
                        <TiEdit size={27} onMouseEnter={handleEditVisibility} onMouseLeave={handleEditVisibility}/>
                    </Link>
                </div>
                <div className="remove">
                    <small className={isVisible.delete ? "visible altText" : "altText"}>Delete</small>
                    <RiDeleteBin5Line size={27} onClick={handleOpen} onMouseEnter={handleDeleteVisibility} onMouseLeave={handleDeleteVisibility} color='#1D3557'  cursor={'pointer'}/>
                </div>
            </div>
            <div className="myBlogItem">
                <div className="head">
                    <h4>{props.title}</h4>
                    <h5>{props.author}</h5>
                </div>
                <p>{props.text}</p>
                <a target='_blank' rel="noreferrer" href={props.link}>READ FULL ARTICLE</a>
            </div>
            {isOpen && <UpdateEvent
                type={'DELETE'}
                event={'BLOG'}
                cancel={handleOpen}
                deletePrompt={deletePrompt}
            />}
        </li>
    )
}

export default Blog