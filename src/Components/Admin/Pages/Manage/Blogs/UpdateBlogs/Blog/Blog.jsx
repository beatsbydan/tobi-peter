import { MdOutlineDelete } from 'react-icons/md'
import { TiEdit } from 'react-icons/ti'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'
import useAlert from '../../../../../../../Hooks/useAlert'
import { useDeleteBlogMutation } from '../../../../../../../queries/useBlogs'
import { staggerItem } from '../../../../../../../lib/motion'

const iconButtonClasses =
  'cursor-pointer border-0 bg-transparent p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'

const Blog = ({ id, title, author, text, link }) => {
  const [confirming, setConfirming] = useState(false)
  const { setAlert } = useAlert()
  const deleteMutation = useDeleteBlogMutation()

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id)
      setAlert('success', 'Blog deleted!')
    } catch {
      setAlert('failure', 'Something went wrong!')
    } finally {
      setConfirming(false)
    }
  }

  return (
    <motion.li
      className="flex flex-col gap-4 rounded-[0.6rem] bg-[rgba(217,217,217,0.21)] p-5"
      {...staggerItem}
    >
      <div className="flex flex-row items-center justify-between">
        <Link
          to={`/admin/manage/blogs/update-blogs/update-blog/${id}`}
          aria-label="Edit blog"
          className={iconButtonClasses}
        >
          <TiEdit size={24} color="#1D3557" />
        </Link>
        <button
          type="button"
          aria-label="Delete blog"
          onClick={() => setConfirming(true)}
          className={iconButtonClasses}
        >
          <MdOutlineDelete size={22} color="rgba(255, 0, 0, 0.936)" />
        </button>
      </div>
      <div>
        <h5 className="text-sm font-semibold text-[var(--color-ink)]">{title}</h5>
        <small className="text-[var(--color-muted)]">{author}</small>
      </div>
      <p className="text-sm text-[var(--color-muted)]">{text}</p>
      {link && (
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
          className="flex flex-row items-center gap-1 self-end text-[var(--color-ink)]"
        >
          <span className="text-xs font-semibold">READ FULL ARTICLE</span>
          <BiRightArrowAlt />
        </a>
      )}
      {confirming && (
        <UpdateEvent
          type="DELETE"
          event="BLOG"
          cancel={() => setConfirming(false)}
          deletePrompt={handleDelete}
        />
      )}
    </motion.li>
  )
}
export default Blog
