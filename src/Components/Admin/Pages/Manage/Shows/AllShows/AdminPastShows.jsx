import Show from '../UpdateShows/Show/Show'
import { IoArrowBackOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import Loading from '../../../../../UI/Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { useShowsQuery } from '../../../../../../queries/useShows'
import { useCountryFilter } from '../../../../../../Hooks/useCountryFilter'
import { pageTransition, staggerContainerOnMount } from '../../../../../../lib/motion'
import { LOGO_URL } from '../../../../../../lib/cloudinary'
import CountryFilter from '../../../../UI/CountryFilter'

const AdminPastShows = () => {
  const navigate = useNavigate()
  const { data, isPending, isSuccess } = useShowsQuery()
  const pastShows = data?.pastShows ?? []
  const { country, setCountry, countries, missingCount, filteredShows } =
    useCountryFilter(pastShows)

  return (
    <motion.div className="mx-auto flex w-full max-w-[700px] flex-col gap-6" {...pageTransition}>
      <button
        type="button"
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer border-0 bg-transparent p-1 text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <IoArrowBackOutline size={20} />
      </button>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h5 className="text-sm font-semibold text-[var(--color-muted)]">PAST SHOWS</h5>
        <CountryFilter countries={countries} value={country} onChange={setCountry} />
      </div>
      {isSuccess && pastShows.length > 0 && (
        <p className="text-[11px] text-[var(--color-muted)]">
          {missingCount} of {pastShows.length} shows have no country set.
        </p>
      )}
      <motion.ul
        className="relative flex min-h-[150px] flex-col gap-4"
        {...staggerContainerOnMount}
      >
        {isPending ? (
          <Loading />
        ) : isSuccess && filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <Show
              key={show._id}
              id={show._id}
              isComplete={true}
              title={show.title}
              venue={show.venue}
              date={show.date}
              city={show.city}
              country={show.country}
            />
          ))
        ) : isSuccess && pastShows.length > 0 ? (
          <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
            <img className="h-10 w-10" src={LOGO_URL} alt="" />
            NO SHOWS MATCH THIS FILTER.
          </p>
        ) : isSuccess ? (
          <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
            <img className="h-10 w-10" src={LOGO_URL} alt="" />
            COMING SOON.
          </p>
        ) : (
          <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
            <img className="h-10 w-10" src={LOGO_URL} alt="" />
            SOMETHING WENT WRONG.
          </p>
        )}
      </motion.ul>
    </motion.div>
  )
}

export default AdminPastShows
