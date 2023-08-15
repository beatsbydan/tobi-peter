import './Blog.css'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { useState } from 'react'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'

const Blog = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const delay = 100;
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    const deletePrompt = () => {
        props.delete()
        .then(success=>{
            if(success.yes){
                setIsOpen(false)
            }
        })
    }
    return (
        <li className = "blogItem" style={{ animationDelay: `${props.myId * delay}ms` }}>
            <RiDeleteBin5Line size={27} onClick={handleOpen} color='#1D3557'  cursor={'pointer'}/>
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