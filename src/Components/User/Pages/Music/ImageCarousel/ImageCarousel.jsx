import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import 'swiper/css/autoplay'
import Loading from '../../../../UI/Loading/Loading'
import { useImagesQuery } from '../../../../../queries/useImages'
import LazyImage from '../../../../UI/LazyImage/LazyImage'
import { LOGO_URL } from '../../../../../lib/cloudinary'

const ImageCarousel = () => {
  const { data: images, isPending, isSuccess } = useImagesQuery()

  return (
    <div className="relative mx-auto h-[500px] w-full max-[700px]:aspect-square max-[700px]:h-auto">
      {isPending ? (
        <Loading />
      ) : isSuccess && images?.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={window.innerWidth < 650 ? 1 : 2}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
        >
          {images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <LazyImage
                  src={image?.url}
                  alt="Photo from Tobi Peter's gallery"
                  type={'background'}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      ) : isSuccess && images?.length === 0 ? (
        <p className="defaultText">
          <span>
            <img src={LOGO_URL} alt="" />
          </span>
          ALBUM UNAVAILABLE.{' '}
        </p>
      ) : (
        <p className="defaultText">
          <span>
            <img src={LOGO_URL} alt="" />
          </span>
          SOMETHING WENT WRONG.
        </p>
      )}
    </div>
  )
}

export default ImageCarousel
