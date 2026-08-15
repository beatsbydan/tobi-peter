import { VscSortPrecedence } from 'react-icons/vsc'
import { BiPlus } from 'react-icons/bi'
import Loading from '../../../../../UI/Loading/Loading'
import Show from './Show/Show'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useShowsQuery } from '../../../../../../queries/useShows'
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

const UpdateShows = () => {
  const { data, isPending, isSuccess } = useShowsQuery()
  const navigate = useNavigate()
  const upcomingShows = data?.upcomingShows.slice(0, 3) ?? []
  const pastShows = data?.pastShows.slice(0, 3) ?? []

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
          LET&apos;S SORT SOME SHOWS OUT
          <VscSortPrecedence size={32} />
        </h2>
        <LinkButton to="/admin/manage/shows/create-show" variant="secondary">
          <BiPlus size={18} />
          CREATE SHOW
        </LinkButton>
      </div>

      <div className="flex flex-col gap-4">
        <h5 className="text-sm font-semibold text-[var(--color-muted)]">UPCOMING SHOWS</h5>
        <motion.ul
          className="relative flex min-h-[150px] flex-col gap-4"
          {...staggerContainerOnMount}
        >
          {isPending ? (
            <Loading />
          ) : isSuccess && upcomingShows.length > 0 ? (
            upcomingShows.map((show) => (
              <Show
                key={show._id}
                id={show._id}
                isComplete={false}
                title={show.title}
                venue={show.venue}
                date={show.date}
                ticketLink={show.ticketLink}
              />
            ))
          ) : isSuccess ? (
            <EmptyState>COMING SOON.</EmptyState>
          ) : (
            <EmptyState>SOMETHING WENT WRONG.</EmptyState>
          )}
        </motion.ul>
        <Link
          to="/admin/manage/shows/update-shows/all-upcoming-shows"
          className="self-end text-xs font-semibold text-[var(--color-ink)]"
        >
          SEE MORE
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <h5 className="text-sm font-semibold text-[var(--color-muted)]">PAST SHOWS</h5>
        <motion.ul
          className="relative flex min-h-[150px] flex-col gap-4"
          {...staggerContainerOnMount}
        >
          {isPending ? (
            <Loading />
          ) : isSuccess && pastShows.length > 0 ? (
            pastShows.map((show) => (
              <Show
                key={show._id}
                id={show._id}
                isComplete={true}
                title={show.title}
                venue={show.venue}
                date={show.date}
              />
            ))
          ) : isSuccess ? (
            <EmptyState>COMING SOON.</EmptyState>
          ) : (
            <EmptyState>SOMETHING WENT WRONG.</EmptyState>
          )}
        </motion.ul>
        <Link
          to="/admin/manage/shows/update-shows/all-past-shows"
          className="self-end text-xs font-semibold text-[var(--color-ink)]"
        >
          SEE MORE
        </Link>
      </div>
    </motion.div>
  )
}
export default UpdateShows
