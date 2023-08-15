import { useContext } from 'react';
import './ImageCarousel.css'
import Context from '../../../Context/Context';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay} from 'swiper/modules'
import 'swiper/css/autoplay';
import {TfiFaceSad} from 'react-icons/tfi'
import Loading from '../../../../UI/Loading/Loading'

const ImageCarousel = () => {
    const ctx = useContext(Context)

    return (
        <div className='imageCarousel'>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                {ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/>
                    :
                    ctx.images.length === 0 ? <p className="defaultText">No images available  <span><TfiFaceSad size={25}/></span></p>
                    :
                    ctx.images.map((image, index)=>{
                    return(
                        <SwiperSlide key={index}>
                            <div className='slide' style={{backgroundImage : `url(${image.url})`}} alt=''/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default ImageCarousel