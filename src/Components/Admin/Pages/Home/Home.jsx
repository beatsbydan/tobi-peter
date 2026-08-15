import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputComponent from '../../../UI/InputComponent/InputComponent'
import Button from '../../UI/Button'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms'
import useAlert from '../../../../Hooks/useAlert'
import { BsTicketPerforated } from 'react-icons/bs'
import { BiRightArrowAlt } from 'react-icons/bi'
import Chart from './Chart/Chart'
import { motion } from 'framer-motion'
import {
  useChangePasswordMutation,
  useSubscribersQuery,
} from '../../../../queries/useAuthMutations'
import { useRecentSongQuery } from '../../../../queries/useSongs'
import { useShowsQuery } from '../../../../queries/useShows'
import Loading from '../../../UI/Loading/Loading'
import { changePasswordSchema } from '../../../../validators/schemas/authSchema'
import { fadeUp } from '../../../../lib/motion'
import { LOGO_URL } from '../../../../lib/cloudinary'

const card = 'rounded-[0.6rem] bg-[rgba(217,217,217,0.21)] p-6'

const Home = () => {
  const { data: subscribers } = useSubscribersQuery()
  const { data: music, isPending: isMusicPending, isSuccess: isMusicSuccess } = useRecentSongQuery()
  const { data: shows } = useShowsQuery()
  const { setAlert } = useAlert()
  const changePasswordMutation = useChangePasswordMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(changePasswordSchema) })

  const upcomingShows = shows?.upcomingShows ?? []
  const date = new Date(upcomingShows[0]?.date)
  const myDate = date.getDate()
  const myMonth = date.getMonth()

  const getMonth = (myMonth) => {
    date.setMonth(myMonth)
    return date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  }

  const txtMonth = getMonth(myMonth)

  const onSubmit = async ({ newPassword }) => {
    try {
      await changePasswordMutation.mutateAsync({ password: newPassword })
      setAlert('success', 'Password changed!')
      reset()
    } catch (err) {
      setAlert('failure', 'Something went wrong!')
      return err
    }
  }

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

  return (
    <motion.div
      className="mx-auto flex w-full max-w-[900px] flex-col gap-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Welcome back!</h1>
      </div>

      <motion.div className="flex flex-col gap-3 text-center" {...fadeUp}>
        <h3 className="text-lg font-medium text-[var(--color-ink)]">STATISTICS</h3>
        <p className="text-[var(--color-muted)]">
          Let&apos;s map out your progress of your shows and events!
        </p>
        <div className={`${card} my-4`}>
          <Chart />
        </div>
        <div>
          <h5 className="mb-2 text-sm font-semibold text-[var(--color-muted)]">SUBSCRIBERS</h5>
          <p className="text-[var(--color-muted)]">
            Yoo! You&apos;ve got{' '}
            <span className="text-lg font-semibold text-[var(--color-ink)]">
              {subscribers?.length ?? 0}
            </span>{' '}
            subscriber(s)!
          </p>
        </div>
      </motion.div>

      <motion.div className="flex flex-col gap-3 text-center" {...fadeUp}>
        <h3 className="mb-2 text-lg font-medium text-[var(--color-ink)]">EVENTS</h3>
        <h5 className="text-sm font-semibold text-[var(--color-muted)]">NEW SONG</h5>
        <div className="mb-8">
          <p className="text-[var(--color-muted)]">
            The world ain&apos;t ready for this new project!
          </p>
          <div className="mt-4 w-full">
            <div className="relative min-h-[170px] w-full">
              {isMusicPending ? (
                <Loading />
              ) : isMusicSuccess && music?.coverArt ? (
                <img
                  className="mx-auto my-8 aspect-square w-full max-w-[400px] rounded-[0.7rem] object-cover"
                  src={music?.coverArt}
                  alt=""
                />
              ) : isMusicSuccess && !music?.coverArt ? (
                <p className="flex flex-col items-center gap-2 py-6 pb-8 text-[var(--color-muted)]">
                  <img className="h-10 w-10" src={LOGO_URL} alt="" />
                  SONG UNAVAILABLE.
                </p>
              ) : (
                <p className="flex flex-col items-center gap-2 py-6 pb-8 text-[var(--color-muted)]">
                  <img className="h-10 w-10" src={LOGO_URL} alt="" />
                  SOMETHING WENT WRONG.
                </p>
              )}
            </div>
            {music?.title && (
              <p className="font-medium text-[var(--color-muted)]">
                Title: {music?.title?.toUpperCase()}
              </p>
            )}
            {music ? (
              <StreamingPlatforms song={music} isEmpty={false} />
            ) : (
              <StreamingPlatforms song={defaultSong} isEmpty={true} />
            )}
          </div>
        </div>
        <h5 className="text-sm font-semibold text-[var(--color-muted)]">NEXT SHOW</h5>
        <div className="relative min-h-[170px] w-full">
          {upcomingShows[0] ? (
            <div className="mx-auto w-full max-w-[700px]">
              <p className="text-[var(--color-muted)]">Here&apos;s your next show...</p>
              <div className={`${card} mt-4 flex flex-row items-center justify-between gap-4`}>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-col items-center">
                    <small className="text-xs font-semibold text-[var(--color-muted)]">
                      {txtMonth}
                    </small>
                    <h5 className="text-xl font-semibold text-[var(--color-ink)]">{myDate}</h5>
                  </div>
                  <h5 className="text-sm font-semibold text-[var(--color-ink)]">DJ</h5>
                  <div className="text-left">
                    <h5 className="text-sm font-semibold text-[var(--color-ink)]">
                      {upcomingShows[0].title}
                    </h5>
                    <small className="text-[var(--color-muted)]">{upcomingShows[0].venue}</small>
                  </div>
                </div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={upcomingShows[0].ticketLink}
                  className="flex flex-row items-center gap-1 text-[var(--color-ink)]"
                >
                  <BsTicketPerforated size={26} />
                  <BiRightArrowAlt />
                  <span className="text-xs font-semibold">GET TICKETS</span>
                </a>
              </div>
            </div>
          ) : (
            <p className="flex flex-col items-center gap-2 text-[var(--color-muted)]">
              <img className="h-10 w-10" src={LOGO_URL} alt="" />
              NO SHOW AVAILABLE.
            </p>
          )}
        </div>
      </motion.div>

      <motion.div className="mx-auto flex w-full max-w-[500px] flex-col text-center" {...fadeUp}>
        <h3 className="text-lg font-medium text-[var(--color-ink)]">CHANGE PASSWORD</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col items-center gap-4">
          <InputComponent
            id="newPassword"
            label="New password"
            type="password"
            placeholder="Enter your password"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <InputComponent
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" variant="secondary" disabled={isSubmitting}>
            {isSubmitting ? 'CHANGING…' : 'CHANGE'}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}
export default Home
