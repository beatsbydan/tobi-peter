import './UpdateLinks.css'
import {useContext} from 'react'
import InputComponent from '../../../../UI/InputComponent/InputComponent'
import ManageContext from '../../../Context/ManageContext/ManageContext'
import {FaHandSpock} from 'react-icons/fa'
const UpdateLinks = () => {
    const ctx = useContext(ManageContext)
    return ( 
        <div className="updateLinks">
            <h2>NEW RELEASE? <span>{<FaHandSpock size={35}/>}</span></h2>
            <form action ="" onSubmit={ctx.handleSubmit}>
                <div className="titleInput">
                    <h2>PROJECT</h2>
                    <InputComponent
                        name={"title"}
                        label={"Title:"}
                        error={ctx.dataErrors.title}
                        type={"text"}
                        placeholder={"Enter Title"}
                        value={ctx.title}
                        onChange={ctx.handleProjectChange}
                    />
                    <InputComponent
                        name={"date"}
                        label={"Release-Date:"}
                        error={ctx.dataErrors.date}
                        type={"date"}
                        placeholder={"Enter Date"}
                        value={ctx.date}
                        onChange={ctx.handleProjectChange}
                    />
                </div>
                <div className="linksInput">
                    <h2>LINKS</h2>
                    <InputComponent
                        name={"appleMusic"}
                        label={"Apple Music:"}
                        error={ctx.dataErrors.appleMusic}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.appleMusic}
                        onChange={ctx.handleLinksChange}
                    />
                    <InputComponent
                        name={"spotify"}
                        label={"Spotify:"}
                        error={ctx.dataErrors.spotify}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.spotify}
                        onChange={ctx.handleLinksChange}
                    />
                    <InputComponent
                        name={"audiomack"}
                        label={"Audiomack:"}
                        error={ctx.dataErrors.audiomack}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.audiomack}
                        onChange={ctx.handleLinksChange}
                    />
                    <InputComponent
                        name={"youtube"}
                        label={"Youtube:"}
                        error={ctx.dataErrors.youtube}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.youtube}
                        onChange={ctx.handleLinksChange}
                    />
                    <InputComponent
                        name={"tidal"}
                        label={"Tidal:"}
                        error={ctx.dataErrors.tidal}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.tidal}
                        onChange={ctx.handleLinksChange}
                    />
                    <InputComponent
                        name={"boomPlay"}
                        label={"Boomplay:"}
                        error={ctx.dataErrors.boomPlay}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.boomPlay}
                        onChange={ctx.handleLinksChange}
                    />
                    <InputComponent
                        name={"youtubeMusic"}
                        label={"Youtube Music:"}
                        error={ctx.dataErrors.youtubeMusic}
                        type={"link"}
                        placeholder={"Enter new Link"}
                        value={ctx.links.youtubeMusic}
                        onChange={ctx.handleLinksChange}
                    />
                </div>
                
                <div className="formActions">
                    <button type="submit">
                        UPDATE
                    </button>
                </div>
            </form>
        </div>
    );
}
export default UpdateLinks;