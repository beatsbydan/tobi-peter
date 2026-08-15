import { BsTicketPerforated } from 'react-icons/bs'
import { BiRightArrowAlt } from 'react-icons/bi'
import { motion } from 'framer-motion'
import {
  staggerItem,
  reducedStaggerItem,
  tapScale,
  usePrefersReducedMotion,
} from '../../../../../lib/motion'

// `compact` matches the original site's homepage-preview styling (Shows.jsx's `.showsList h5`/
// `.showsList a` CSS overrides — explicit sizes, distinct from the "all shows" list pages, which
// never had that override and rendered these elements at the browser's UA-default h5/small/a
// sizing). AllUpcomingShows.jsx/AllPastShows.jsx don't pass `compact` — don't add it there.
const Show = ({ compact, ...props }) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const date = new Date(props.date)
  const myDate = date.getDate().toString()
  const year = date.getFullYear()
  const myMonth = date.getMonth()
  const getMonth = (myMonth) => {
    date.setMonth(myMonth)
    return date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  }
  const txtMonth = getMonth(myMonth)
  const smallClasses = compact
    ? 'text-[0.75rem] text-[var(--color-muted)]'
    : 'text-[var(--color-muted)]'
  const h5Classes = compact
    ? 'text-[1rem] font-medium text-[var(--color-muted)]'
    : 'text-[var(--color-muted)]'
  const linkClasses = compact ? 'text-[0.88rem] font-semibold' : ''
  return (
    <motion.li
      variants={(prefersReducedMotion ? reducedStaggerItem : staggerItem).variants}
      className="flex w-full cursor-pointer flex-row items-center justify-between rounded-[0.6rem] bg-[#d9d9d936] p-[1.1rem] hover:shadow-[0px_1px_2px_4px_#4954640c] max-[750px]:mx-auto max-[750px]:max-w-[550px] max-[750px]:p-[1.2rem]"
    >
      <div className="flex flex-row items-center gap-[2.4rem] max-[750px]:gap-[1.3rem]">
        <div className="flex flex-col gap-[0.2rem] rounded-[0.5rem] bg-[#d9d9d9b5] p-[0.7rem] text-center max-[750px]:justify-between max-[750px]:gap-[0.1rem]">
          <small className={smallClasses}>{txtMonth}</small>
          <h5 className={h5Classes}>{myDate}</h5>
          <small className={smallClasses}>{year}</small>
        </div>
        <h5 className={`mt-[0.7rem] max-[750px]:hidden ${h5Classes}`}>DJ</h5>
        <div className="flex flex-col items-start gap-[0.2rem]">
          <h5 className={`max-[750px]:text-left ${h5Classes}`}>{props.title}</h5>
          <small className={smallClasses}>{props.venue}</small>
        </div>
      </div>
      {props.ticketLink && (
        <motion.a
          {...tapScale}
          target="_blank"
          rel="noreferrer"
          href={props.ticketLink}
          className={`flex w-[90%] max-w-[200px] flex-row items-center justify-end gap-2 rounded-[0.6rem] text-center transition-[gap] duration-300 ease-in-out hover:gap-[1.2rem] max-[750px]:w-[120px] max-[750px]:p-0 ${linkClasses}`}
        >
          <BsTicketPerforated className="rotate-45" size={30} />
          <BiRightArrowAlt className="hidden max-[750px]:block" />
          <span className="max-[750px]:hidden">GET TICKETS</span>
        </motion.a>
      )}
    </motion.li>
  )
}
export default Show
