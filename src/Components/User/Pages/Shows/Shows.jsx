import Show from './Show/Show'
import { BiRightArrowAlt } from 'react-icons/bi'
import Loading from '../../../UI/Loading/Loading'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useShowsQuery } from '../../../../queries/useShows'
import { pageTransition, staggerContainerOnMount, tapScale } from '../../../../lib/motion'
import { LOGO_URL } from '../../../../lib/cloudinary'

const MotionLink = motion.create(Link)

const Shows = () => {
  const { data, isPending, isSuccess } = useShowsQuery()
  const upcomingShows = data?.upcomingShows.slice(0, 3) ?? []
  const pastShows = data?.pastShows.slice(0, 3) ?? []

  return (
    <motion.div className="mx-auto w-full max-w-[800px] font-sans" {...pageTransition}>
      <h1 className="sr-only">Shows</h1>
      <div className="mx-auto flex w-full max-w-[300px] items-center gap-[10%]">
        <MotionLink
          {...tapScale}
          to={'/shows/book'}
          className="mx-auto flex w-full flex-row items-center justify-center gap-2 rounded-[0.5rem] bg-[#d9d9d936] p-[1.2rem] text-center font-semibold transition-[gap] duration-300 ease-in-out hover:gap-[1.2rem]"
        >
          BOOK TOBI PETER
          <BiRightArrowAlt size={15} />
        </MotionLink>
        {/* <a target='_blank' rel="noreferrer" href="https://www.">
                    DOWNLOAD EPK
                    <BiRightArrowAlt/>
                </a> */}
        {/* <Link to={'/unavailable'}>
                    DOWNLOAD EPK
                    <BiRightArrowAlt className='arrow' size={15}/>
                </Link> */}
      </div>
      <div className="mt-[3em] w-full">
        <h5 className="text-center text-[0.9rem] font-medium text-[var(--color-ink)]">
          UPCOMING SHOWS
        </h5>
        <motion.ul
          {...staggerContainerOnMount}
          className="relative my-[2.4em] flex min-h-[150px] w-full flex-col gap-6 transition-all duration-300 ease-in-out"
        >
          {isPending ? (
            <Loading />
          ) : isSuccess && upcomingShows.length > 0 ? (
            upcomingShows.map((show, index) => {
              return (
                <Show
                  compact
                  key={index}
                  myId={index}
                  title={show.title}
                  venue={show.venue}
                  date={show.date}
                  ticketLink={show.ticketLink}
                />
              )
            })
          ) : isSuccess && upcomingShows.length === 0 ? (
            <p className="absolute top-1/2 left-1/2 mb-6 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
              <span className="mt-[0.6rem] block">
                <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
              </span>
              COMING SOON.
            </p>
          ) : (
            <p className="absolute top-1/2 left-1/2 mb-6 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
              <span className="mt-[0.6rem] block">
                <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
              </span>
              SOMETHING WENT WRONG.
            </p>
          )}
        </motion.ul>
        <div className="group mx-auto w-full max-w-[150px] cursor-pointer rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] p-[0.8rem] text-center text-[0.85rem] font-medium text-[var(--color-ink)] transition-colors duration-300 ease-in-out hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]">
          <MotionLink
            {...tapScale}
            to={'/shows/all-upcoming-shows'}
            className="group-hover:text-[var(--color-cream)]"
          >
            SEE MORE
          </MotionLink>
        </div>
      </div>
      <div className="mt-[3em] w-full">
        <h5 className="text-center text-[0.9rem] font-medium text-[var(--color-ink)]">
          PAST SHOWS
        </h5>
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
                  compact
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
              <span className="mt-[0.6rem] block">
                <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
              </span>
              COMING SOON.
            </p>
          ) : (
            <p className="absolute top-1/2 left-1/2 mb-6 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
              <span className="mt-[0.6rem] block">
                <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
              </span>
              SOMETHING WENT WRONG.
            </p>
          )}
        </motion.ul>
        <div className="group mx-auto w-full max-w-[150px] cursor-pointer rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] p-[0.8rem] text-center text-[0.85rem] font-medium text-[var(--color-ink)] transition-colors duration-300 ease-in-out hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]">
          <MotionLink
            {...tapScale}
            to={'/shows/all-past-shows'}
            className="group-hover:text-[var(--color-cream)]"
          >
            SEE MORE
          </MotionLink>
        </div>
      </div>
    </motion.div>
  )
}
export default Shows
