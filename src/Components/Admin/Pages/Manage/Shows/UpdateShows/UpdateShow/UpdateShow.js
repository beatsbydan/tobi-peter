import './UpdateShow.css'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import {BsEmojiWink} from 'react-icons/bs'
import {useContext, useEffect} from 'react'
import ShowsContext from '../../../../../Context/ManageContext/ShowsContext/ShowsContext'
import {useNavigate, useParams} from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import {motion} from 'framer-motion'
import Loading from '../../../../../../UI/Loading/Loading'
import logo from '../../../../../../../Assets/logo.png'
import useIsProcessing from '../../../../../../../Hooks/useIsProcessing'
import {IoArrowBackOutline} from 'react-icons/io5'
import {useDispatch} from 'react-redux'
import { fetchShows } from '../../../../../../../Store/StateSlices/UserSlices/ShowsSlice'

const UpdateShow = () => {
    const {id} = useParams()
    const {isProcessing} = useIsProcessing()
    const dispatch = useDispatch()
    const {updateData, updateErrors, handleUpdateSubmit, handleUpdateChange, getShow} = useContext(ShowsContext)
    
    useEffect(()=>{
        getShow(id)
    }, [getShow, id])
    
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Show Updated!')
                dispatch(fetchShows())
                setTimeout(()=>{
                    navigate('/admin/manage')
                },1500)
            }
        })
    }
    return(
        <motion.div 
            className="update"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>
            {isProcessing ? <Loading/> 
            :
            Object.values(updateData).every(element => element === "") ? <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p> 
            :
                <>
                    <h2>UPDATE SHOW <span><BsEmojiWink size={35}/></span></h2>
                    <form action="" onSubmit={handleSubmit}>
                        <InputComponent
                            id={"title"}
                            label={"Title:"}
                            error={updateErrors.title}
                            type={"text"}
                            placeholder={"Enter Title"}
                            value={updateData.title}
                            onChange={handleUpdateChange}
                        />
                        <InputComponent
                            id={"venue"}
                            label={"Venue:"}
                            error={updateErrors.venue}
                            type={"text"}
                            placeholder={"Enter Venue"}
                            value={updateData.venue}
                            onChange={handleUpdateChange}
                        />
                        <InputComponent
                            id={"date"}
                            label={"Date:"}
                            error={updateErrors.date}
                            type={"date"}
                            placeholder={"Enter Date"}
                            value={updateData.date}
                            onChange={handleUpdateChange}
                        />
                        <InputComponent
                            id={"ticketLink"}
                            label={"Ticket-Link:"}
                            error={updateErrors.ticketLink}
                            type={"link"}
                            placeholder={"Enter Link"}
                            value={updateData.ticketLink}
                            onChange={handleUpdateChange}
                        />
                        <div className = "formActions">
                            <button type='submit'>UPDATE</button>
                        </div>
                    </form>
                </>
            }
        </motion.div>
    )
}
export default UpdateShow