import {useContext} from 'react'
import ManageContext from '../../../../../Context/ManageContext/ManageContext'
import './UpdateBlog.css'
import {motion} from 'framer-motion'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import useAlert from '../../../../../../../Hooks/useAlert'
import { useNavigate } from 'react-router-dom'
import {FaBlog} from 'react-icons/fa'
import Loading from '../../../../../../UI/Loading/Loading'

const UpdateBlog = () => {
    const ctx = useContext(ManageContext)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleUpdateBlogSubmit()
        .then(success=>{
        if(success.yes){
            setAlert('success', 'Blog updated!')
            setTimeout(()=>{
                navigate('/admin/manage')
            },1500)
        }
        })
    }
    return (
        <motion.div 
        className="updateBlog"
        initial={{width:'100%', opacity: 0}}
        animate={{width:'100%', opacity: 1}}
        exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
        {ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/> :
            <>
                <h2>UPDATE BLOG  <span><FaBlog/></span></h2>
                <form action="" onSubmit={handleSubmit}>
                    <InputComponent
                        id={"title"}
                        label={"Title:"}
                        error={ctx.updateBlogErrors.title}
                        type={"text"}
                        placeholder={"Enter title"}
                        value={ctx.updateBlogData.title}
                        onChange={ctx.handleUpdateBlogDataChange}
                    />
                    <InputComponent
                        id={"author"}
                        label={"Author:"}
                        error={ctx.updateBlogErrors.author}
                        type={"text"}
                        placeholder={"Enter author"}
                        value={ctx.updateBlogData.author}
                        onChange={ctx.handleUpdateBlogDataChange}
                    />
                    <InputComponent
                        id={"text"}
                        label={"Text:"}
                        error={ctx.updateBlogErrors.text}
                        type={"textarea"}
                        placeholder={"Enter text"}
                        value={ctx.updateBlogData.text}
                        onChange={ctx.handleUpdateBlogDataChange}
                    />
                    <InputComponent
                        id={"link"}
                        label={"Link:"}
                        error={ctx.updateBlogErrors.link}
                        type={"text"}
                        placeholder={"Enter link"}
                        value={ctx.updateBlogData.link}
                        onChange={ctx.handleUpdateBlogDataChange}
                    />
                    <div className="formActions">
                        <button type="submit">
                            UPDATE
                        </button>
                    </div>
                </form>
            </>
        }
        </motion.div>
    )
}

export default UpdateBlog