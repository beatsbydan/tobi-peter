import './UpdateImages.css'
import { useContext } from 'react'
import ManageContext from '../../../../Context/ManageContext/ManageContext'
import Image from './Image/Image'
import Loading from '../../../../../UI/Loading/Loading'
import {TfiFaceSad} from 'react-icons/tfi'
import {BiImages} from 'react-icons/bi'

const UpdateImages = () => {
  const ctx = useContext(ManageContext)
  

  return (
    <div className="updateImages">
      <h2>UPDATE IMAGES <span><BiImages/></span></h2>
      <ul className="imagesList">
        {ctx.pending.isPending ? <Loading isPending={ctx.pending.isPending}/> 
        : 
        ctx.images.length === 0 ?  <p className="defaultText">No available shows <span><TfiFaceSad size={25}/></span></p>
        : 
        ctx.images.map((image, index)=>{
          return(
            <Image
              myId={index}
              key={index}
              delete={()=>ctx.deleteImage(image.url)}
              image={image.url}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default UpdateImages