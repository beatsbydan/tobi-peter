import './CoverArt.css'
import {useContext} from 'react'
import ManageContext from '../../../Context/ManageContext/ManageContext'
import {MdOutlineAdsClick} from 'react-icons/md'
const CoverArt = () => {
    const ctx = useContext(ManageContext)
    return ( 
        <div className='coverArt'>
            <form action = "" onSubmit={ctx.handleFileSubmit}>
                <div className="customary">
                    <div className="customFile">
                        <input type="file" className='customFileInput' onChange={ctx.handleFileChange} />
                    </div>
                    <small>Click image to add a file <span><MdOutlineAdsClick size={25}/></span></small>
                </div>
                <div className = 'formActions'>
                    <button type='submit'>UPDATE</button>
                </div>
            </form>
        </div>
    );
}
export default CoverArt;