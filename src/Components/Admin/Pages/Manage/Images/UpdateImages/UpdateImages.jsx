import { BiImages, BiPlus } from 'react-icons/bi'
import Loading from '../../../../../UI/Loading/Loading'
import Image from './Image/Image'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useImagesQuery } from '../../../../../../queries/useImages'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition, staggerContainerOnMount } from '../../../../../../lib/motion'
import { LOGO_URL } from '../../../../../../lib/cloudinary'
import LinkButton from '../../../../UI/LinkButton'

const EmptyState = ({ children }) => (
  <p className="col-span-full flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
    <img className="h-10 w-10" src={LOGO_URL} alt="" />
    {children}
  </p>
)

const UpdateImages = () => {
  const navigate = useNavigate()
  const { data: images, isPending, isSuccess } = useImagesQuery()

  return (
    <motion.div className="mx-auto flex w-full max-w-[900px] flex-col gap-10" {...pageTransition}>
      <button
        type="button"
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer border-0 bg-transparent p-1 text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <IoArrowBackOutline size={20} />
      </button>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-medium text-[var(--color-ink)]">
          UPDATE IMAGES
          <BiImages size={28} />
        </h2>
        <LinkButton to="/admin/manage/images/add-image" variant="secondary">
          <BiPlus size={18} />
          ADD IMAGE
        </LinkButton>
      </div>

      <motion.ul
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        {...staggerContainerOnMount}
      >
        {isPending ? (
          <div className="col-span-full">
            <Loading />
          </div>
        ) : isSuccess && images.length > 0 ? (
          images.map((image) => <Image key={image.url} url={image.url} />)
        ) : isSuccess ? (
          <EmptyState>NO IMAGES AVAILABLE.</EmptyState>
        ) : (
          <EmptyState>SOMETHING WENT WRONG.</EmptyState>
        )}
      </motion.ul>
    </motion.div>
  )
}

export default UpdateImages
