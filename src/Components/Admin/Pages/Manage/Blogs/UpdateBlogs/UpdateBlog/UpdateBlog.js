import {useContext, useEffect} from 'react'
import ManageContext from '../../../../../Context/ManageContext/ManageContext'
import './UpdateBlog.css'
import {motion} from 'framer-motion'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import useAlert from '../../../../../../../Hooks/useAlert'
import { useNavigate, useParams } from 'react-router-dom'
import {FaBlog} from 'react-icons/fa'
import Loading from '../../../../../../UI/Loading/Loading'
import useIsProcessing from '../../../../../../../Hooks/useIsProcessing'
import { fetchBlogs } from '../../../../../../../Store/StateSlices/UserSlices/MusicSlice'
import {useDispatch} from 'react-redux'
import logo from '../../../../../../../Assets/logo.png'
import {IoArrowBackOutline} from 'react-icons/io5'

const UpdateBlog = () => {
    const {isProcessing} = useIsProcessing()
    const {id} = useParams()
    const {getBlog, updateBlogData, updateBlogErrors, handleUpdateBlogDataChange, handleUpdateBlogSubmit} = useContext(ManageContext)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateBlogSubmit()
        .then(success=>{
        if(success.yes){
            setAlert('success', 'Blog updated!')
            dispatch(fetchBlogs())
            setTimeout(()=>{
                navigate('/admin/manage')
            },1500)
        }
        })
    }
    
    useEffect(()=>{
        getBlog(id)
    }, [getBlog, id])

    return (
        <motion.div 
        className="updateBlog"
        initial={{width:'100%', opacity: 0}}
        animate={{width:'100%', opacity: 1}}
        exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
            {isProcessing ? <Loading/> :
            Object.values(updateBlogData).every(element => element === "") ? <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p> 
            :
            <>
                <h2>UPDATE BLOG  <span><FaBlog/></span></h2>
                <form action="" onSubmit={handleSubmit}>
                    <InputComponent
                        id={"title"}
                        label={"Title:"}
                        error={updateBlogErrors.title}
                        type={"text"}
                        placeholder={"Enter title"}
                        value={updateBlogData.title}
                        onChange={handleUpdateBlogDataChange}
                    />
                    <InputComponent
                        id={"author"}
                        label={"Author:"}
                        error={updateBlogErrors.author}
                        type={"text"}
                        placeholder={"Enter author"}
                        value={updateBlogData.author}
                        onChange={handleUpdateBlogDataChange}
                    />
                    <InputComponent
                        id={"text"}
                        label={"Text:"}
                        error={updateBlogErrors.text}
                        type={"textarea"}
                        placeholder={"Enter text"}
                        value={updateBlogData.text}
                        onChange={handleUpdateBlogDataChange}
                    />
                    <InputComponent
                        id={"link"}
                        label={"Link:"}
                        error={updateBlogErrors.link}
                        type={"text"}
                        placeholder={"Enter link"}
                        value={updateBlogData.link}
                        onChange={handleUpdateBlogDataChange}
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