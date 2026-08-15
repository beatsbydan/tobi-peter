import { BsTicketPerforated } from 'react-icons/bs'
import { BiRightArrowAlt } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import { FaRegThumbsUp } from 'react-icons/fa'
import { TiEdit } from 'react-icons/ti'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'
import useAlert from '../../../../../../../Hooks/useAlert'
import {
  useCompleteShowMutation,
  useDeleteShowMutation,
} from '../../../../../../../queries/useShows'
import { staggerItem } from '../../../../../../../lib/motion'

const iconButtonClasses =
  'cursor-pointer border-0 bg-transparent p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'

const Show = ({ id, title, venue, date, ticketLink, isComplete, city, country }) => {
  const [confirming, setConfirming] = useState(null)
  const { setAlert } = useAlert()
  const completeMutation = useCompleteShowMutation()
  const deleteMutation = useDeleteShowMutation()

  const showDate = new Date(date)
  const txtMonth = showDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const myDate = showDate.getDate()
  const year = showDate.getFullYear()

  const handleComplete = async () => {
    try {
      await completeMutation.mutateAsync(id)
      setAlert('success', 'Show marked complete!')
    } catch {
      setAlert('failure', 'Something went wrong!')
    } finally {
      setConfirming(null)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id)
      setAlert('success', 'Show deleted!')
    } catch {
      setAlert('failure', 'Something went wrong!')
    } finally {
      setConfirming(null)
    }
  }

  return (
    <motion.li
      className="flex flex-col gap-4 rounded-[0.6rem] bg-[rgba(217,217,217,0.21)] p-5"
      {...staggerItem}
    >
      <div className="flex flex-row items-center justify-between">
        <Link
          to={`/admin/manage/shows/update-shows/update-show/${id}`}
          aria-label="Edit show"
          className={iconButtonClasses}
        >
          <TiEdit size={24} color="#1D3557" />
        </Link>
        <div className="flex flex-row items-center gap-3">
          {!isComplete && (
            <button
              type="button"
              aria-label="Mark show complete"
              onClick={() => setConfirming('complete')}
              className={iconButtonClasses}
            >
              <FaRegThumbsUp size={20} color="#1D3557" />
            </button>
          )}
          <button
            type="button"
            aria-label="Delete show"
            onClick={() => setConfirming('delete')}
            className={iconButtonClasses}
          >
            <MdOutlineDelete size={22} color="rgba(255, 0, 0, 0.936)" />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-4 max-[500px]:flex-col max-[500px]:items-start">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col items-center">
            <small className="text-xs font-semibold text-[var(--color-muted)]">{txtMonth}</small>
            <h5 className="text-xl font-semibold text-[var(--color-ink)]">{myDate}</h5>
            <small className="text-xs text-[var(--color-muted)]">{year}</small>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-[var(--color-ink)]">{title}</h5>
            <small className="text-[var(--color-muted)]">{venue}</small>
            {country ? (
              <small className="block text-[11px] text-[var(--color-muted)]">
                {city ? `${city}, ${country}` : country}
              </small>
            ) : (
              <small className="block text-[11px] font-semibold text-[rgba(255,0,0,0.936)]">
                ⚠ No location set
              </small>
            )}
          </div>
        </div>
        {ticketLink && (
          <a
            target="_blank"
            rel="noreferrer"
            href={ticketLink}
            className="flex flex-row items-center gap-1 text-[var(--color-ink)]"
          >
            <BsTicketPerforated size={26} />
            <BiRightArrowAlt />
            <span className="text-xs font-semibold">GET TICKETS</span>
          </a>
        )}
      </div>
      {confirming === 'complete' && (
        <UpdateEvent
          type="COMPLETE"
          event="SHOW"
          cancel={() => setConfirming(null)}
          completePrompt={handleComplete}
          deletePrompt={handleDelete}
        />
      )}
      {confirming === 'delete' && (
        <UpdateEvent
          type="DELETE"
          event="SHOW"
          cancel={() => setConfirming(null)}
          completePrompt={handleComplete}
          deletePrompt={handleDelete}
        />
      )}
    </motion.li>
  )
}
export default Show
