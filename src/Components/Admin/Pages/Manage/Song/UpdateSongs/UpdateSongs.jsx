import { GiLoveSong } from 'react-icons/gi'
import { BiPlus } from 'react-icons/bi'
import Loading from '../../../../../UI/Loading/Loading'
import Song from './Song/Song'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSongsQuery } from '../../../../../../queries/useSongs'
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

const UpdateSongs = () => {
  const { data: songs, isPending, isSuccess } = useSongsQuery()
  const navigate = useNavigate()

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-medium text-[var(--color-ink)]">
          HERE ARE YOUR SONGS
          <GiLoveSong size={24} />
        </h2>
        <LinkButton to="/admin/manage/songs/create-song" variant="secondary">
          <BiPlus size={18} />
          CREATE SONG
        </LinkButton>
      </div>
      <h4 className="text-sm text-[var(--color-muted)]">Click on a song to edit it...</h4>

      <motion.ul className="flex flex-col gap-4" {...staggerContainerOnMount}>
        {isPending ? (
          <Loading />
        ) : isSuccess && songs.length > 0 ? (
          songs.map((song) => (
            <Song
              key={song._id}
              id={song._id}
              title={song.title}
              releaseDate={song.releaseDate}
              coverArt={song.coverArt}
            />
          ))
        ) : isSuccess ? (
          <EmptyState>NO AVAILABLE SONGS.</EmptyState>
        ) : (
          <EmptyState>SOMETHING WENT WRONG.</EmptyState>
        )}
      </motion.ul>
    </motion.div>
  )
}
export default UpdateSongs
