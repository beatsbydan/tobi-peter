import React from 'react'
import {useContext} from 'react'
import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import Loading from '../../../../../../UI/Loading/Loading'
import ManageContext from '../../../../../Context/ManageContext/ManageContext'
import {MdOutlineAdsClick, MdOutlineUpdate} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import './UpdateSong.css'

const UpdateSong = () => {
    const ctx = useContext(ManageContext)
    const navigate = useNavigate()
    const {setAlert} = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.handleUpdateSubmit()
        .then(success=>{
            if(success.yes){
                setAlert('success', 'Song Updated!')
                setTimeout(()=>{
                    navigate('/admin/manage')
                },1500)
            }
        })
    }

  return (
    <div className="updateSong">
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
                <div className="customary">
                    <h2>COVER-ART</h2>
                    <div className="customFile">
                        <input type="file" className='customFileInput' onChange={ctx.handleUpdateFileChange} />
                    </div>
                    <small>Click image to add a file <span><MdOutlineAdsClick size={25}/></span></small>
                </div>
                <div className="formActions">
                    <button type="submit">
                        CREATE
                    </button>
                </div>
            </form>
        }
    </div>
  )
}

export default UpdateSong