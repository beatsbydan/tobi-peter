import './CreateShows.css'
import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import {BsEmojiWink} from 'react-icons/bs'
import {useContext} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import {motion} from 'framer-motion'
import {useDispatch} from 'react-redux'
import { fetchShows } from '../../../../../../Store/StateSlices/UserSlices/ShowsSlice'
import {IoArrowBackOutline} from 'react-icons/io5'

const CreateShows = () => {
    const dispatch = useDispatch()
    const ctx = useContext(ShowsContext)
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleCreateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Show Created!')
                dispatch(fetchShows())
                setTimeout(()=>{
                    navigate('/admin/manage')
                },1500)
            }
        })
    }
    return(
        <motion.div 
            className="create"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
            <h2>ADD A NEW SHOW WITH EASE <span><BsEmojiWink size={35}/></span></h2>
            <form action="" onSubmit={handleSubmit}>
                <InputComponent
                    id={"title"}
                    label={"Title:"}
                    error={ctx.createErrors.title}
                    type={"text"}
                    placeholder={"Enter Title"}
                    value={ctx.createData.title}
                    onChange={ctx.handleCreateChange}
                />
                <InputComponent
                    id={"venue"}
                    label={"Venue:"}
                    error={ctx.createErrors.venue}
                    type={"text"}
                    placeholder={"Enter Venue"}
                    value={ctx.createData.venue}
                    onChange={ctx.handleCreateChange}
                />
                <InputComponent
                    id={"date"}
                    label={"Date:"}
                    error={ctx.createErrors.date}
                    type={"date"}
                    placeholder={"Enter Date"}
                    value={ctx.createData.date}
                    onChange={ctx.handleCreateChange}
                />
                <InputComponent
                    id={"ticketLink"}
                    label={"Ticket-Link:"}
                    error={ctx.createErrors.ticketLink}
                    type={"link"}
                    placeholder={"Enter Link"}
                    value={ctx.createData.ticketLink}
                    onChange={ctx.handleCreateChange}
                />
                <div className = "formActions">
                    <button type='submit'>CREATE</button>
                </div>
            </form>
        </motion.div>
    )
}
export default CreateShows