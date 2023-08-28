import { useContext } from 'react';
import './ImageCarousel.css'
import Context from '../../../Context/Context';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay} from 'swiper/modules'
import 'swiper/css/autoplay';
import logo from '../../../../../Assets/logo.png'
import Loading from '../../../../UI/Loading/Loading'

const ImageCarousel = () => {
    const ctx = useContext(Context)

    return (
        <div className='imageCarousel'>
            {
                ctx.pending.isPending? <Loading isPending={ctx.pending.isPending}/>
                :
                ctx.images.length === 0 ? <p className="defaultText"><span><img src={logo} alt=""/></span> Album unavailable. </p>
                :
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={2}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false
                }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        ctx.images.map((image, index)=>{
                            return(
                                <SwiperSlide key={index}>
                                    <div className='slide' style={{backgroundImage : `url(${image.url})`}} alt=''/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            }
        </div>
    )
}

export default ImageCarousel