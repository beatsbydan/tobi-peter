import {useEffect} from 'react';
import './ImageCarousel.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay} from 'swiper/modules'
import 'swiper/css/autoplay';
import logo from '../../../../../Assets/logo.png'
import Loading from '../../../../UI/Loading/Loading'
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../../../../../Store/StateSlices/UserSlices/MusicSlice';
import LazyImage from '../../../../UI/LazyImage/LazyImage';

const ImageCarousel = () => {
    const {status, images} = useSelector(state => state.music)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(status.images === "idle"){
            dispatch(fetchImages())
        }
    }, [status, dispatch])
    return (
        <div className='imageCarousel'>
            {
                status.images === 'pending' ? <Loading/>
                :
                (status.images === 'success' && images?.length > 0 ) ?
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={window.innerWidth < 650 ? 1 : 2}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false
                }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        images.map((image, index)=>{
                            return(
                                <SwiperSlide key={index}>
                                    <LazyImage src={image?.url} alt="" type={"background"}/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                :
                (status.images === 'success' && images?.length === 0 ) ? <p className="defaultText"><span><img src={logo} alt=""/></span>ALBUM UNAVAILABLE. </p>
                :
                <p className="defaultText"><span><img src={logo} alt=""/></span>SOMETHING WENT WRONG.</p>
            }
        </div>
    )
}

export default ImageCarousel