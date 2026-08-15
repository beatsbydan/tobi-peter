import { FaBlog } from 'react-icons/fa'
import { BiPlus } from 'react-icons/bi'
import Loading from '../../../../../UI/Loading/Loading'
import Blog from './Blog/Blog'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBlogsQuery } from '../../../../../../queries/useBlogs'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition, staggerContainerOnMount } from '../../../../../../lib/motion'
import { LOGO_URL } from '../../../../../../lib/cloudinary'
import LinkButton from '../../../../UI/LinkButton'

const EmptyState = ({ children }) => (
  <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
    <img className="h-10 w-10" src={LOGO_URL} alt="" />
    {children}
  </p>
)

const UpdateBlogs = () => {
  const { data: blogs, isPending, isSuccess } = useBlogsQuery()
  const navigate = useNavigate()

  return (
    <motion.div className="mx-auto flex w-full max-w-[700px] flex-col gap-10" {...pageTransition}>
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
          UPDATE BLOGS
          <FaBlog size={26} />
        </h2>
        <LinkButton to="/admin/manage/blogs/create-blog" variant="secondary">
          <BiPlus size={18} />
          CREATE BLOG
        </LinkButton>
      </div>

      <motion.ul className="flex flex-col gap-4" {...staggerContainerOnMount}>
        {isPending ? (
          <Loading />
        ) : isSuccess && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              id={blog._id}
              title={blog.title}
              author={blog.author}
              text={blog.text}
              link={blog.link}
            />
          ))
        ) : isSuccess ? (
          <EmptyState>NO BLOGS AVAILABLE.</EmptyState>
        ) : (
          <EmptyState>SOMETHING WENT WRONG.</EmptyState>
        )}
      </motion.ul>
    </motion.div>
  )
}

export default UpdateBlogs
