import React from 'react'
import {useContext} from 'react'
import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import {FaHandSpock} from 'react-icons/fa'
import {MdOutlineAdsClick} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import './CreateSong.css'
import {motion} from 'framer-motion'
import Context from '../../../../../User/Context/Context'

const CreateSong = () => {
    const ctx = useContext(ManageContext)
    const userCtx = useContext(Context)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleCreateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Song Created!')
                userCtx.getSong()
                setTimeout(()=>{
                    navigate('/admin/manage')
                },1500)
            }
        })
    }
  return (
    <motion.div 
        className="createSong"
        initial={{width:'100%', opacity: 0}}
        animate={{width:'100%', opacity: 1}}
        exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
        <h2>NEW RELEASE? <span>{<FaHandSpock size={35}/>}</span></h2>
        <form action ="" onSubmit={handleSubmit}>
            <div className="titleInput">
                <h2>PROJECT</h2>
                <InputComponent
                    id={"title"}
                    label={"Title:"}
                    error={ctx.createDataErrors.title}
                    type={"text"}
                    placeholder={"Enter Title"}
                    value={ctx.createData.title}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"date"}
                    label={"Release-Date:"}
                    error={ctx.createDataErrors.date}
                    type={"date"}
                    placeholder={"Enter Date"}
                    value={ctx.createData.date}
                    onChange={ctx.handleCreateDataChange}
                />
            </div>
            <div className="linksInput">
                <h2>LINKS</h2>
                <InputComponent
                    id={"appleMusic"}
                    label={"Apple Music:"}
                    error={ctx.createDataErrors.appleMusic}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.appleMusic}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"spotify"}
                    label={"Spotify:"}
                    error={ctx.createDataErrors.spotify}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.spotify}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"audiomack"}
                    label={"Audiomack:"}
                    error={ctx.createDataErrors.audiomack}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.audiomack}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"youtube"}
                    label={"Youtube:"}
                    error={ctx.createDataErrors.youtube}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.youtube}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"tidal"}
                    label={"Tidal:"}
                    error={ctx.createDataErrors.tidal}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.tidal}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"boomPlay"}
                    label={"Boomplay:"}
                    error={ctx.createDataErrors.boomPlay}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.boomPlay}
                    onChange={ctx.handleCreateDataChange}
                />
                <InputComponent
                    id={"youtubeMusic"}
                    label={"Youtube Music:"}
                    error={ctx.createDataErrors.youtubeMusic}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={ctx.createData.youtubeMusic}
                    onChange={ctx.handleCreateDataChange}
                />
            </div>
            <div className="customary">
                <h2>COVER-ART</h2>
                <div className="customFile">
                    <input type="file" className='customFileInput' onChange={ctx.handleCreateFileChange} />
                </div>
                <small>Click image to add a file <span><MdOutlineAdsClick size={25}/></span></small>
            </div>
            <div className="formActions">
                <button type="submit">
                    CREATE
                </button>
            </div>
        </form>
    </motion.div>
  )
}

export default CreateSong