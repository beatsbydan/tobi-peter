import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import { MdOutlineUpdate } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import Button from '../../../../../UI/Button'
import Loading from '../../../../../../UI/Loading/Loading'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition } from '../../../../../../../lib/motion'
import { useSongQuery, useUpdateSongMutation } from '../../../../../../../queries/useSongs'
import { updateSongSchema } from '../../../../../../../validators/schemas/songSchema'
import { LOGO_URL } from '../../../../../../../lib/cloudinary'

const formatDateInput = (date) => (date ? new Date(date).toISOString().slice(0, 10) : '')

const UpdateSong = () => {
  const { id } = useParams()
  const { data: song, isPending, isSuccess } = useSongQuery(id)
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const updateSongMutation = useUpdateSongMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateSongSchema),
    values: song
      ? {
          title: song.title ?? '',
          date: formatDateInput(song.releaseDate),
          appleMusic: song.streamingLink?.appleMusic ?? '',
          spotify: song.streamingLink?.spotify ?? '',
          audiomack: song.streamingLink?.audiomack ?? '',
          youtube: song.streamingLink?.youtube ?? '',
          tidal: song.streamingLink?.tidal ?? '',
          boomPlay: song.streamingLink?.boomPlay ?? '',
          youtubeMusic: song.streamingLink?.youtubeMusic ?? '',
        }
      : undefined,
  })

  const onSubmit = async (updatedSong) => {
    try {
      await updateSongMutation.mutateAsync({
        id,
        song: {
          title: updatedSong.title,
          releaseDate: updatedSong.date,
          streamingLinks: {
            appleMusic: updatedSong.appleMusic,
            spotify: updatedSong.spotify,
            audiomack: updatedSong.audiomack,
            youtube: updatedSong.youtube,
            tidal: updatedSong.tidal,
            boomPlay: updatedSong.boomPlay,
            youtubeMusic: updatedSong.youtubeMusic,
          },
        },
      })
      setAlert('success', 'Song Updated!')
      navigate('/admin/manage')
    } catch {
      setAlert('failure', 'Something went wrong!')
    }
  }

  return (
    <motion.div className="mx-auto flex w-full max-w-[500px] flex-col gap-6" {...pageTransition}>
      <button
        type="button"
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer border-0 bg-transparent p-1 text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <IoArrowBackOutline size={20} />
      </button>
      {isPending ? (
        <Loading />
      ) : !isSuccess || !song ? (
        <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
          <img className="h-10 w-10" src={LOGO_URL} alt="" />
          SOMETHING WENT WRONG.
        </p>
      ) : (
        <>
          <h2 className="flex items-center gap-2 text-xl font-medium text-[var(--color-ink)]">
            UPDATE SONG
            <MdOutlineUpdate size={28} />
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-[var(--color-muted)]">PROJECT</h3>
            <InputComponent
              id="title"
              label="Title:"
              type="text"
              placeholder="Enter Title"
              error={errors.title?.message}
              {...register('title')}
            />
            <InputComponent
              id="date"
              label="Release-Date:"
              type="date"
              placeholder="Enter Date"
              error={errors.date?.message}
              {...register('date')}
            />

            <h3 className="text-sm font-semibold text-[var(--color-muted)]">LINKS</h3>
            <InputComponent
              id="appleMusic"
              label="Apple Music:"
              type="text"
              placeholder="Enter new Link"
              error={errors.appleMusic?.message}
              {...register('appleMusic')}
            />
            <InputComponent
              id="spotify"
              label="Spotify:"
              type="text"
              placeholder="Enter new Link"
              error={errors.spotify?.message}
              {...register('spotify')}
            />
            <InputComponent
              id="audiomack"
              label="Audiomack:"
              type="text"
              placeholder="Enter new Link"
              error={errors.audiomack?.message}
              {...register('audiomack')}
            />
            <InputComponent
              id="youtube"
              label="Youtube:"
              type="text"
              placeholder="Enter new Link"
              error={errors.youtube?.message}
              {...register('youtube')}
            />
            <InputComponent
              id="tidal"
              label="Tidal:"
              type="text"
              placeholder="Enter new Link"
              error={errors.tidal?.message}
              {...register('tidal')}
            />
            <InputComponent
              id="boomPlay"
              label="Boomplay:"
              type="text"
              placeholder="Enter new Link"
              error={errors.boomPlay?.message}
              {...register('boomPlay')}
            />
            <InputComponent
              id="youtubeMusic"
              label="Youtube Music:"
              type="text"
              placeholder="Enter new Link"
              error={errors.youtubeMusic?.message}
              {...register('youtubeMusic')}
            />

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? 'UPDATING…' : 'UPDATE'}
            </Button>
          </form>
        </>
      )}
    </motion.div>
  )
}

export default UpdateSong
