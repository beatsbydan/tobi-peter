import { useState } from 'react'
import { motion } from 'framer-motion'
import Socials from '../../../UI/Socials/Socials'
import Loading from '../../../UI/Loading/Loading'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms'
import useAlert from '../../../../Hooks/useAlert'
import useIsProcessing from '../../../../Hooks/useIsProcessing'
import ValidateWhatsNew from './ValidateWhatsNew'
import LazyImage from '../../../UI/LazyImage/LazyImage'
import { useRecentSongQuery } from '../../../../queries/useSongs'
import { useSendSubscriptionMutation } from '../../../../queries/useSubscribe'
import { pageTransition, tapScale } from '../../../../lib/motion'
import { LOGO_URL } from '../../../../lib/cloudinary'

const WhatsNew = () => {
  const { setAlert } = useAlert()
  const { setProcessing } = useIsProcessing()
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

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubscriptionError(null)
    const errors = ValidateWhatsNew(email)
    setError(errors)
    if (errors.none) {
      setProcessing(true)
      sendSubscriptionMutation.mutate(
        { email },
        {
          onSuccess: () => {
            setEmail('')
            setProcessing(false)
            setAlert('success', 'Subscription Successful!')
          },
          onError: (err) => {
            if (err?.response?.status === 403) {
              setSubscriptionError('You are registered')
            }
            setTimeout(() => {
              setEmail('')
              setProcessing(false)
            }, 1000)
            setAlert('failure', 'Something went wrong!')
          },
        },
      )
    }
  }

  return (
    <motion.div className="w-full font-sans" {...pageTransition}>
      <h1 className="sr-only">What's New</h1>
      <div className="relative w-full min-h-50 max-w-112.5 mx-auto">
        {isPending ? (
          <Loading />
        ) : isSuccess && music?.coverArt ? (
          <LazyImage src={music?.coverArt} type="image" alt="" />
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
            {...tapScale}
            className="cursor-pointer rounded-[0.3rem] border-[0.1rem] border-ink bg-transparent p-[0.8rem] text-[13.3333px] font-medium text-ink [transition:all_0.3s_ease] hover:bg-ink hover:text-cream active:bg-ink active:text-cream"
          >
            JOIN
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
