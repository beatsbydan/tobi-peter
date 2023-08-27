import React from 'react'
import {useContext} from 'react'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import Loading from '../../../../../../UI/Loading/Loading'
import ManageContext from '../../../../../Context/ManageContext/ManageContext'
import {MdOutlineUpdate} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import './UpdateSong.css'
import {motion} from 'framer-motion'
import Context from '../../../../../../User/Context/Context'
const UpdateSong = () => {
    const ctx = useContext(ManageContext)
    const userCtx = useContext(Context)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleUpdateSubmit()
        .then(success=>{
            if(success.yes){
                userCtx.getSong()
                setAlert('success', 'Song Updated!')
                navigate('/admin/manage/songs/UpdateSongs')
            }
        })
    }

  return (
    <motion.div 
        className="updateSong"
        initial={{width:'100%', opacity: 0}}
        animate={{width:'100%', opacity: 1}}
        exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
        <h2>UPDATE SONG <span>{<MdOutlineUpdate size={35}/>}</span></h2>
        {
            ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/>
            :
            <form action ="" onSubmit={handleSubmit}>
                <div className="titleInput">
                    <h2>PROJECT</h2>
                    <InputComponent
                        id={"title"}
                        label={"Title:"}
                        error={ctx.updateDataErrors.title}
                        type={"text"}
                        placeholder={"Enter Title"}
                        value={ctx.updateData.title}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"date"}
                        label={"Release-Date:"}
                        error={ctx.updateDataErrors.date}
                        type={"date"}
                        placeholder={"Enter Date"}
                        value={ctx.updateData.date}
                        onChange={ctx.handleUpdateDataChange}
                    />
                </div>
                <div className="linksInput">
                    <h2>LINKS</h2>
                    <InputComponent
                        id={"appleMusic"}
                        label={"Apple Music:"}
                        error={ctx.updateDataErrors.appleMusic}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.appleMusic}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"spotify"}
                        label={"Spotify:"}
                        error={ctx.updateDataErrors.spotify}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.spotify}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"audiomack"}
                        label={"Audiomack:"}
                        error={ctx.updateDataErrors.audiomack}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.audiomack}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"youtube"}
                        label={"Youtube:"}
                        error={ctx.updateDataErrors.youtube}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.youtube}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"tidal"}
                        label={"Tidal:"}
                        error={ctx.updateDataErrors.tidal}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.tidal}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"boomPlay"}
                        label={"Boomplay:"}
                        error={ctx.updateDataErrors.boomPlay}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.boomPlay}
                        onChange={ctx.handleUpdateDataChange}
                    />
                    <InputComponent
                        id={"youtubeMusic"}
                        label={"Youtube Music:"}
                        error={ctx.updateDataErrors.youtubeMusic}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.updateData.youtubeMusic}
                        onChange={ctx.handleUpdateDataChange}
                    />
                </div>
                <div className="formActions">
                    <button type="submit">
                        UPDATE
                    </button>
                </div>
            </form>
        }
    </motion.div>
  )
}

export default UpdateSong