import {RiDeleteBin5Line} from 'react-icons/ri'
import './Image.css'
import {useState} from 'react'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'
import { fetchImages } from '../../../../../../../Store/StateSlices/UserSlices/MusicSlice'
import {useDispatch} from 'react-redux'

const Image = (props) => {
    const delay = 300
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    const deletePrompt = () => {
        props.delete()
            .then(success=>{
                if(success.yes){
                    dispatch(fetchImages())
                    setIsOpen(false)
                }
            })
    }
    return (
        <li className="imageItem" style={{animationDelay: `${props.myId * delay}ms`}}>
            <RiDeleteBin5Line size={30} onClick={handleOpen} color='#1D3557' cursor={'pointer'}/>
            <div className="myPicture" style={{backgroundImage: `url(${props.image})`}} alt="" />
            {isOpen && <UpdateEvent
                type={'DELETE'}
                event={'IMAGE'}
                cancel={handleOpen}
                deletePrompt={deletePrompt}
            />}
        </li>
    )
}

export default Image