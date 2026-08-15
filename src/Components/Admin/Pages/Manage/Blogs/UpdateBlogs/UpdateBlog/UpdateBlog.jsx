import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import { FaBlog } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import Button from '../../../../../UI/Button'
import Loading from '../../../../../../UI/Loading/Loading'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition } from '../../../../../../../lib/motion'
import { useBlogQuery, useUpdateBlogMutation } from '../../../../../../../queries/useBlogs'
import { blogSchema } from '../../../../../../../validators/schemas/blogSchema'
import { LOGO_URL } from '../../../../../../../lib/cloudinary'

const UpdateBlog = () => {
  const { id } = useParams()
  const { data: blog, isPending, isSuccess } = useBlogQuery(id)
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const updateBlogMutation = useUpdateBlogMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogSchema),
    values: blog
      ? {
          title: blog.title ?? '',
          author: blog.author ?? '',
          text: blog.text ?? '',
          link: blog.link ?? '',
        }
      : undefined,
  })

  const onSubmit = async (updatedBlog) => {
    try {
      await updateBlogMutation.mutateAsync({ id, blog: updatedBlog })
      setAlert('success', 'Blog Updated!')
      navigate('/admin/manage')
    } catch {
      setAlert('failure', 'Something went wrong!')
    }
  }

  return (
    <motion.div className="mx-auto flex w-full max-w-[500px] flex-col gap-6" {...pageTransition}>
      <button
        type="button"
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer border-0 bg-transparent p-1 text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <IoArrowBackOutline size={20} />
      </button>
      {isPending ? (
        <Loading />
      ) : !isSuccess || !blog ? (
        <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
          <img className="h-10 w-10" src={LOGO_URL} alt="" />
          SOMETHING WENT WRONG.
        </p>
      ) : (
        <>
          <h2 className="flex items-center gap-2 text-xl font-medium text-[var(--color-ink)]">
            UPDATE BLOG
            <FaBlog size={26} />
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <InputComponent
              id="title"
              label="Title:"
              type="text"
              placeholder="Enter Title"
              error={errors.title?.message}
              {...register('title')}
            />
            <InputComponent
              id="author"
              label="Author:"
              type="text"
              placeholder="Enter Author"
              error={errors.author?.message}
              {...register('author')}
            />
            <InputComponent
              id="text"
              label="Text:"
              type="textarea"
              placeholder="Enter Text"
              error={errors.text?.message}
              {...register('text')}
            />
            <InputComponent
              id="link"
              label="Link:"
              type="text"
              placeholder="Enter Link"
              error={errors.link?.message}
              {...register('link')}
            />
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? 'UPDATING…' : 'UPDATE'}
            </Button>
          </form>
        </>
      )}
    </motion.div>
  )
}
export default UpdateBlog
