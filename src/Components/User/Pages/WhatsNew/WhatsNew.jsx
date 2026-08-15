import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiMusic } from 'react-icons/bi'
import Socials from '../../../UI/Socials/Socials'
import Loading from '../../../UI/Loading/Loading'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms'
import useAlert from '../../../../Hooks/useAlert'
import useIsMobile from '../../../../Hooks/useIsMobile'
import ValidateWhatsNew from './ValidateWhatsNew'
import LazyImage from '../../../UI/LazyImage/LazyImage'
import { useRecentSongQuery } from '../../../../queries/useSongs'
import { useSendSubscriptionMutation } from '../../../../queries/useSubscribe'
import { pageTransition, tapScale, duration, easing } from '../../../../lib/motion'
import { LOGO_URL } from '../../../../lib/cloudinary'

const WhatsNew = () => {
  const { setAlert } = useAlert()
  const { data: music, isPending, isSuccess } = useRecentSongQuery()
  const sendSubscriptionMutation = useSendSubscriptionMutation()

  const defaultSong = {
    streamingLink: {
      appleMusic: '',
      spotify: '',
      audiomack: '',
      youtube: '',
      tidal: '',
      boomPlay: '',
      youtubeMusic: '',
    },
  }

  const [email, setEmail] = useState('')
  const [error, setError] = useState({})
  const [subscriptionError, setSubscriptionError] = useState(null)

  // Song-details card: hover-to-reveal on desktop, tap-to-toggle on mobile (no hover there). The
  // clear-on-leave delay is the same fix ShowsMap's country panel needed — the card sits outside the
  // image's own box, so a bare mouseleave would hide it before the cursor can reach it; delaying the
  // clear and cancelling it if the card itself is entered (not just the image) fixes that.
  const [cardOpen, setCardOpen] = useState(false)
  const isMobile = useIsMobile(700)
  const containerRef = useRef(null)
  const clearTimeoutRef = useRef(null)

  const cancelClear = () => {
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current)
      clearTimeoutRef.current = null
    }
  }
  const clearSoon = () => {
    cancelClear()
    clearTimeoutRef.current = setTimeout(() => setCardOpen(false), 150)
  }
  useEffect(() => cancelClear, [])

  const handleImageMouseEnter = () => {
    if (!isMobile) {
      cancelClear()
      setCardOpen(true)
    }
  }
  const handleImageMouseLeave = () => {
    if (!isMobile) clearSoon()
  }
  const handleCardMouseEnter = () => {
    if (!isMobile) cancelClear()
  }
  const handleCardMouseLeave = () => {
    if (!isMobile) clearSoon()
  }
  const handleImageClick = () => {
    if (isMobile) setCardOpen((open) => !open)
  }
  const handleImageKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setCardOpen((open) => !open)
    }
  }
  const handleCardClick = () => {
    // The card has nothing interactive in it — tapping it on mobile dismisses, same as tapping
    // anywhere else outside the image.
    if (isMobile) setCardOpen(false)
  }

  // Tapping/clicking anywhere outside the image+card dismisses it — the only way to close it on
  // mobile once open, since there's no hover to fall back on there.
  useEffect(() => {
    const handleOutsideClick = (evt) => {
      if (!containerRef.current?.contains(evt.target)) {
        setCardOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubscriptionError(null)
    const errors = ValidateWhatsNew(email)
    setError(errors)
    if (errors.none) {
      sendSubscriptionMutation.mutate(
        { email },
        {
          onSuccess: () => {
            setEmail('')
            setAlert('success', 'Subscription Successful!')
          },
          onError: (err) => {
            if (err?.response?.status === 403) {
              setSubscriptionError('You are registered')
            }
            setEmail('')
            setAlert('failure', 'Something went wrong!')
          },
        },
      )
    }
  }

  return (
    <motion.div className="w-full font-sans" {...pageTransition}>
      <h1 className="sr-only">What's New</h1>
      <div ref={containerRef} className="relative w-full min-h-50 max-w-112.5 mx-auto">
        {isPending ? (
          <Loading />
        ) : isSuccess && music?.coverArt ? (
          <>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={cardOpen}
              aria-controls="whats-new-song-card"
              aria-label={cardOpen ? 'Hide song details' : 'Show song details'}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              onClick={handleImageClick}
              onKeyDown={handleImageKeyDown}
              className="cursor-pointer rounded-[0.7rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <LazyImage src={music?.coverArt} type="image" alt="" />
            </div>
            <AnimatePresence>
              {cardOpen && (
                <motion.div
                  id="whats-new-song-card"
                  role="note"
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={handleCardClick}
                  initial={isMobile ? { opacity: 0, y: 10 } : { opacity: 0, x: -10 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                  exit={isMobile ? { opacity: 0, y: 10 } : { opacity: 0, x: -10 }}
                  transition={{ duration: duration.fast, ease: easing.standard }}
                  className={
                    isMobile
                      ? 'absolute inset-x-4 bottom-4 z-10 rounded-[0.6rem] border border-hairline bg-cream p-4 shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
                      : 'absolute top-1/2 left-full ml-4 w-56 -translate-y-1/2 rounded-[0.6rem] border border-hairline bg-cream p-4 shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
                  }
                >
                  <h6 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <BiMusic size={16} />
                    {music.title}
                  </h6>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : isSuccess && !music?.coverArt ? (
          <p className="defaultText">
            <span>
              <img src={LOGO_URL} alt="" />
            </span>
            SONG UNAVAILABLE.
          </p>
        ) : (
          <p className="defaultText">
            <span>
              <img src={LOGO_URL} alt="" />
            </span>
            SOMETHING WENT WRONG.
          </p>
        )}
      </div>
      <div className="mt-[2.7em] w-full">
        <h5 className="pb-[0.8rem] text-center text-[0.9rem] text-ink">
          CHOOSE YOUR PREFERRED STREAMING PLATFORM
        </h5>
        {music ? (
          <StreamingPlatforms song={music} isEmpty={false} />
        ) : (
          <StreamingPlatforms song={defaultSong} isEmpty={true} />
        )}
      </div>
      <div className="mt-[3.5em] w-full">
        <p className="text-center text-[0.87rem] font-medium text-ink">
          DON’T BE A DED GUY, JOIN THE VIP LIST
        </p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="mx-auto my-[1.2em] grid w-full max-w-175 grid-cols-[75%_20%] items-last-baseline gap-[5%] max-[450px]:grid-cols-none max-[450px]:items-center"
        >
          <div className="flex w-full flex-col justify-end gap-2">
            <small className="h-[0.8rem] font-semibold text-[red]">
              {error.email || subscriptionError}
            </small>
            <input
              className={`rounded-[0.3rem] border-[0.1rem] bg-transparent p-[0.8rem] text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                error.email || subscriptionError ? 'border-[red]' : 'border-ink'
              }`}
              type="text"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
            />
          </div>
          <motion.button
            type="submit"
            disabled={sendSubscriptionMutation.isPending}
            {...tapScale}
            className="cursor-pointer rounded-[0.3rem] border-[0.1rem] border-ink bg-transparent p-[0.8rem] text-[13.3333px] font-medium text-ink [transition:all_0.3s_ease] hover:bg-ink hover:text-cream active:bg-ink active:text-cream disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sendSubscriptionMutation.isPending ? 'JOINING…' : 'JOIN'}
          </motion.button>
        </form>
      </div>
      <div className="mx-auto mt-[1.7em] mb-0">
        <Socials />
      </div>
    </motion.div>
  )
}
export default WhatsNew
