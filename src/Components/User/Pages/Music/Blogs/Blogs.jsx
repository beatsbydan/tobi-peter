import Blog from './Blog/Blog'
import Loading from '../../../../UI/Loading/Loading'
import { useBlogsQuery } from '../../../../../queries/useBlogs'
import { LOGO_URL } from '../../../../../lib/cloudinary'

const Blogs = () => {
  const { data: blogs, isPending, isSuccess } = useBlogsQuery()

  return (
    <ul className="relative mt-[2em] flex min-h-[100px] flex-col gap-[3rem]">
      {isPending ? (
        <Loading />
      ) : isSuccess && blogs.length > 0 ? (
        blogs.map((blog, index) => {
          return (
            <Blog
              key={index}
              myId={index}
              title={blog.title}
              author={blog.author}
              text={blog.text}
              link={blog.link}
              createdAt={blog.createdAt}
            />
          )
        })
      ) : isSuccess && blogs.length === 0 ? (
        <p className="defaultText">
          <span>
            <img src={LOGO_URL} alt="" />
          </span>
          COMING SOON.{' '}
        </p>
      ) : (
        <p className="defaultText">
          <span>
            <img src={LOGO_URL} alt="" />
          </span>
          SOMETHING WENT WRONG.{' '}
        </p>
      )}
    </ul>
  )
}
export default Blogs
