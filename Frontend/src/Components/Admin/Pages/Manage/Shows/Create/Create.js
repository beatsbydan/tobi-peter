import './Create.css'
import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import {BsEmojiWink} from 'react-icons/bs'
import {useContext} from 'react'
import ShowsContext from '../../../../Context/ManageContext/ShowsContext/ShowsContext'
const Create = () => {
    const ctx = useContext(ShowsContext)
    return(
        <div className="create">
            <h2>ADD NEW SHOWS WITH EASE <span><BsEmojiWink size={35}/></span></h2>
            <form action="" onSubmit={ctx.handleCreateSubmit}>
                <InputComponent
                    name={"title"}
                    label={"Title:"}
                    error={ctx.createErrors.title}
                    type={"text"}
                    placeholder={"Enter Title"}
                    value={ctx.createData.title}
                    onChange={ctx.handleChange}
                />
                <InputComponent
                    name={"venue"}
                    label={"Venue:"}
                    error={ctx.createErrors.venue}
                    type={"text"}
                    placeholder={"Enter Venue"}
                    value={ctx.createData.venue}
                    onChange={ctx.handleChange}
                />
                <InputComponent
                    name={"date"}
                    label={"Date:"}
                    error={ctx.createErrors.date}
                    type={"date"}
                    placeholder={"Enter Date"}
                    value={ctx.createData.date}
                    onChange={ctx.handleChange}
                />
                <InputComponent
                    name={"ticketLink"}
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
        </div>
    )
}
export default Create