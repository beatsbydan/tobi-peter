import React from 'react'
import {useContext, useEffect} from 'react'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import Loading from '../../../../../../UI/Loading/Loading'
import ManageContext from '../../../../../Context/ManageContext/ManageContext'
import {MdOutlineUpdate} from 'react-icons/md'
import {useNavigate, useParams} from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import useIsProcessing from '../../../../../../../Hooks/useIsProcessing'
import './UpdateSong.css'
import {motion} from 'framer-motion'
import {IoArrowBackOutline} from 'react-icons/io5'

const UpdateSong = () => {
    const {id} = useParams()
    const {isFetching} = useIsProcessing()
    const {getSong, handleUpdateSubmit, updateData, updateDataErrors, handleUpdateDataChange} = useContext(ManageContext)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Song Updated!')
                navigate('/admin/manage')
            }
        })
    }

    useEffect(()=>{
        getSong(id)
    },[getSong, id])

  return (
    <motion.div 
        className="updateSong"
        initial={{width:'100%', opacity: 0}}
        animate={{width:'100%', opacity: 1}}
        exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
    >
        <IoArrowBackOutline cursor='pointer' onClick={()=> navigate(-1)} color='#1D3557' size={30}/>   
        {isFetching ? <Loading/> :
            <>
                <h2>UPDATE SONG <span>{<MdOutlineUpdate size={35}/>}</span></h2>
                <form action ="" onSubmit={handleSubmit}>
                    <div className="titleInput">
                        <h2>PROJECT</h2>
                        <InputComponent
                            id={"title"}
                            label={"Title:"}
                            error={updateDataErrors.title}
                            type={"text"}
                            placeholder={"Enter Title"}
                            value={updateData.title}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"date"}
                            label={"Release-Date:"}
                            error={updateDataErrors.date}
                            type={"date"}
                            placeholder={"Enter Date"}
                            value={updateData.date}
                            onChange={handleUpdateDataChange}
                        />
                    </div>
                    <div className="linksInput">
                        <h2>LINKS</h2>
                        <InputComponent
                            id={"appleMusic"}
                            label={"Apple Music:"}
                            error={updateDataErrors.appleMusic}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.appleMusic}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"spotify"}
                            label={"Spotify:"}
                            error={updateDataErrors.spotify}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.spotify}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"audiomack"}
                            label={"Audiomack:"}
                            error={updateDataErrors.audiomack}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.audiomack}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"youtube"}
                            label={"Youtube:"}
                            error={updateDataErrors.youtube}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.youtube}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"tidal"}
                            label={"Tidal:"}
                            error={updateDataErrors.tidal}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.tidal}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"boomPlay"}
                            label={"Boomplay:"}
                            error={updateDataErrors.boomPlay}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.boomPlay}
                            onChange={handleUpdateDataChange}
                        />
                        <InputComponent
                            id={"youtubeMusic"}
                            label={"Youtube Music:"}
                            error={updateDataErrors.youtubeMusic}
                            type={"link"}
                            placeholder={"Enter new Link"}
                            value={updateData.youtubeMusic}
                            onChange={handleUpdateDataChange}
                        />
                    </div>
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

export default UpdateSong