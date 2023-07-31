import './UpdateSongs.css'
import {GiLoveSong} from 'react-icons/gi'
import {TfiFaceSad} from 'react-icons/tfi'
import {useContext} from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Song from './Song/Song'
import Loading from '../../../../../UI/Loading/Loading'

const UpdateSongs = () => {
    const ctx = useContext(ManageContext)
    return(
        <div className="updateSongs">
            <h2>HERE ARE YOUR SONGS <span><GiLoveSong/></span></h2>
            <ul className="songsList">
                {   ctx.pending.isPending ? <Loading isPending = {ctx.pending.isPending}/> 
                    : 
                    ctx.allSongs?.length > 0 ? ctx.allSongs.map((song, index)=>{
                        return (
                            <Song
                                id={song._id}
                                key={index}
                                title={song.title}
                                releaseDate={song.releaseDate}
                                coverArt={song.coverArt}
                                fetch={()=>ctx.getSong(song._id)}
                                deletePrompt={()=>ctx.deleteSong(song._id)}
                            />
                        )
                    })
                    : <p className="defaultText">No available songs <span><TfiFaceSad size={25}/></span></p>
                }
            </ul>
        </div>
    )
}
export default UpdateSongs