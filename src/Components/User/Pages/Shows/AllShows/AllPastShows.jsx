import Show from '../Show/Show'
import { IoArrowBackOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../../UI/Loading/Loading'
import { useShowsQuery } from '../../../../../queries/useShows'
import { pageTransition, staggerContainerOnMount } from '../../../../../lib/motion'
import { LOGO_URL } from '../../../../../lib/cloudinary'

const AllPastShows = () => {
  const navigate = useNavigate()
  const { data, isPending, isSuccess } = useShowsQuery()
  const pastShows = data?.pastShows ?? []

  return (
    <motion.div className="mx-auto w-full max-w-[800px]" {...pageTransition}>
      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigate(-1)}
        className="border-0 bg-transparent p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <IoArrowBackOutline color="#1D3557" size={22} />
      </button>
      <h1 className="mt-8 text-center text-[0.9rem] font-medium text-[var(--color-ink)]">
        PAST SHOWS
      </h1>
      <motion.ul
        {...staggerContainerOnMount}
        className="relative my-[2.4em] flex min-h-[150px] w-full flex-col gap-6 transition-all duration-300 ease-in-out"
      >
        {isPending ? (
          <Loading />
        ) : isSuccess && pastShows.length > 0 ? (
          pastShows.map((show, index) => {
            return (
              <Show
                key={index}
                myId={index}
                title={show.title}
                venue={show.venue}
                date={show.date}
              />
            )
          })
        ) : isSuccess && pastShows.length === 0 ? (
          <p className="absolute top-1/2 left-1/2 mb-6 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
            <span className="block">
              <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
            </span>
            COMING SOON.
          </p>
        ) : (
          <p className="absolute top-1/2 left-1/2 mb-6 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
            <span className="block">
              <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
            </span>
            SOMETHING WENT WRONG.
          </p>
        )}
      </motion.ul>
    </motion.div>
  )
}

export default AllPastShows
