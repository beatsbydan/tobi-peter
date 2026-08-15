import { MdOutlineDelete } from 'react-icons/md'
import { TiEdit } from 'react-icons/ti'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'
import useAlert from '../../../../../../../Hooks/useAlert'
import { useDeleteSongMutation } from '../../../../../../../queries/useSongs'
import { staggerItem } from '../../../../../../../lib/motion'

const iconButtonClasses =
  'cursor-pointer border-0 bg-transparent p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'

const Song = ({ id, title, releaseDate, coverArt }) => {
  const [confirming, setConfirming] = useState(false)
  const { setAlert } = useAlert()
  const deleteMutation = useDeleteSongMutation()

  const songDate = new Date(releaseDate)
  const txtMonth = songDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const myDate = songDate.getDate()

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id)
      setAlert('success', 'Song deleted!')
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
          to={`/admin/manage/songs/update-songs/update-song/${id}`}
          aria-label="Edit song"
          className={iconButtonClasses}
        >
          <TiEdit size={24} color="#1D3557" />
        </Link>
        <button
          type="button"
          aria-label="Delete song"
          onClick={() => setConfirming(true)}
          className={iconButtonClasses}
        >
          <MdOutlineDelete size={22} color="rgba(255, 0, 0, 0.936)" />
        </button>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col items-center">
          <small className="text-xs font-semibold text-[var(--color-muted)]">{txtMonth}</small>
          <h5 className="text-xl font-semibold text-[var(--color-ink)]">{myDate}</h5>
        </div>
        <h5 className="text-sm font-semibold text-[var(--color-ink)]">{title?.toUpperCase()}</h5>
        {coverArt && (
          <img src={coverArt} alt="" className="ml-auto h-12 w-12 rounded-[0.3rem] object-cover" />
        )}
      </div>
      {confirming && (
        <UpdateEvent
          type="DELETE"
          event="SONG"
          cancel={() => setConfirming(false)}
          deletePrompt={handleDelete}
        />
      )}
    </motion.li>
  )
}
export default Song
