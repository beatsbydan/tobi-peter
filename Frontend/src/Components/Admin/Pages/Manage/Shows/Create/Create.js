import './Create.css'
import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import {BsEmojiWink} from 'react-icons/bs'
import {useContext} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import {motion} from 'framer-motion'

const Create = () => {
    const ctx = useContext(ShowsContext)
    const {setAlert} = useAlert()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleCreateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Show Created!')
                setTimeout(()=>{
                    navigate('/admin/manage')
                },1500)
            }
        })
    }
    return(
        <motion.div 
            className="create"
            initial={{width:'100%'}}
            animate={{width:'100%'}}
            exit={{x:-window.innerWidth, transition: {duration: 0.5}}}
        >
            <h2>ADD A NEW SHOW WITH EASE <span><BsEmojiWink size={35}/></span></h2>
            <form action="" onSubmit={handleSubmit}>
                <InputComponent
                    id={"title"}
                    label={"Title:"}
                    error={ctx.createErrors.title}
                    type={"text"}
                    placeholder={"Enter Title"}
                    value={ctx.createData.title}
                    onChange={ctx.handleChange}
                />
                <InputComponent
                    id={"venue"}
                    label={"Venue:"}
                    error={ctx.createErrors.venue}
                    type={"text"}
                    placeholder={"Enter Venue"}
                    value={ctx.createData.venue}
                    onChange={ctx.handleChange}
                />
                <InputComponent
                    id={"date"}
                    label={"Date:"}
                    error={ctx.createErrors.date}
                    type={"date"}
                    placeholder={"Enter Date"}
                    value={ctx.createData.date}
                    onChange={ctx.handleChange}
                />
                <InputComponent
                    id={"ticketLink"}
                    label={"Ticket-Link:"}
                    error={ctx.createErrors.ticketLink}
                    type={"link"}
                    placeholder={"Enter Link"}
                    value={ctx.createData.ticketLink}
                    onChange={ctx.handleChange}
                />
                <div className = "formActions">
                    <button type='submit'>CREATE</button>
                </div>
            </form>
        </motion.div>
    )
}
export default Create