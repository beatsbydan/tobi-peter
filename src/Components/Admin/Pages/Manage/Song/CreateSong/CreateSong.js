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
import {useDispatch} from 'react-redux'
import { fetchSongs } from '../../../../../../Store/StateSlices/AdminSlices/ManageSlice'
import {IoArrowBackOutline} from 'react-icons/io5'

const CreateSong = () => {
    const {handleCreateSubmit, createData, createDataErrors, handleCreateFileChange, handleCreateDataChange} = useContext(ManageContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Song Created!')
                dispatch(fetchSongs())
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
        <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
        <h2>NEW RELEASE? <span>{<FaHandSpock size={35}/>}</span></h2>
        <form action ="" onSubmit={handleSubmit}>
            <div className="titleInput">
                <h2>PROJECT</h2>
                <InputComponent
                    id={"title"}
                    label={"Title:"}
                    error={createDataErrors.title}
                    type={"text"}
                    placeholder={"Enter Title"}
                    value={createData.title}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"date"}
                    label={"Release-Date:"}
                    error={createDataErrors.date}
                    type={"date"}
                    placeholder={"Enter Date"}
                    value={createData.date}
                    onChange={handleCreateDataChange}
                />
            </div>
            <div className="linksInput">
                <h2>LINKS</h2>
                <InputComponent
                    id={"appleMusic"}
                    label={"Apple Music:"}
                    error={createDataErrors.appleMusic}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.appleMusic}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"spotify"}
                    label={"Spotify:"}
                    error={createDataErrors.spotify}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.spotify}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"audiomack"}
                    label={"Audiomack:"}
                    error={createDataErrors.audiomack}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.audiomack}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"youtube"}
                    label={"Youtube:"}
                    error={createDataErrors.youtube}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.youtube}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"tidal"}
                    label={"Tidal:"}
                    error={createDataErrors.tidal}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.tidal}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"boomPlay"}
                    label={"Boomplay:"}
                    error={createDataErrors.boomPlay}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.boomPlay}
                    onChange={handleCreateDataChange}
                />
                <InputComponent
                    id={"youtubeMusic"}
                    label={"Youtube Music:"}
                    error={createDataErrors.youtubeMusic}
                    type={"link"}
                    placeholder={"Enter new Link"}
                    value={createData.youtubeMusic}
                    onChange={handleCreateDataChange}
                />
            </div>
            <div className="customary">
                <h2>COVER-ART</h2>
                <div className="customFile">
                    <input type="file" className='customFileInput' onChange={handleCreateFileChange} />
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