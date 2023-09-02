import './UpdateShow.css'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import {BsEmojiWink} from 'react-icons/bs'
import {useContext} from 'react'
import ShowsContext from '../../../../../Context/ManageContext/ShowsContext/ShowsContext'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import {motion} from 'framer-motion'
import Loading from '../../../../../../UI/Loading/Loading'

const UpdateShow = () => {
    const ctx = useContext(ShowsContext)
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleUpdateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Show Updated!')
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
            {ctx.pending.isPending ? <Loading isPending={ctx.pending.isPending}/>:
                <>
                    <h2>UPDATE SHOW <span><BsEmojiWink size={35}/></span></h2>
                    <form action="" onSubmit={handleSubmit}>
                        <InputComponent
                            id={"title"}
                            label={"Title:"}
                            error={ctx.updateErrors.title}
                            type={"text"}
                            placeholder={"Enter Title"}
                            value={ctx.updateData.title}
                            onChange={ctx.handleUpdateChange}
                        />
                        <InputComponent
                            id={"venue"}
                            label={"Venue:"}
                            error={ctx.updateErrors.venue}
                            type={"text"}
                            placeholder={"Enter Venue"}
                            value={ctx.updateData.venue}
                            onChange={ctx.handleUpdateChange}
                        />
                        <InputComponent
                            id={"date"}
                            label={"Date:"}
                            error={ctx.updateErrors.date}
                            type={"date"}
                            placeholder={"Enter Date"}
                            value={ctx.updateData.date}
                            onChange={ctx.handleUpdateChange}
                        />
                        <InputComponent
                            id={"ticketLink"}
                            label={"Ticket-Link:"}
                            error={ctx.updateErrors.ticketLink}
                            type={"link"}
                            placeholder={"Enter Link"}
                            value={ctx.updateData.ticketLink}
                            onChange={ctx.handleUpdateChange}
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