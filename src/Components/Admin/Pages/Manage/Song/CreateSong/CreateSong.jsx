import InputComponent from '../../../../../UI/InputComponent/InputComponent'
import { FaHandSpock } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import Button from '../../../../UI/Button'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition } from '../../../../../../lib/motion'
import { useCreateSongMutation } from '../../../../../../queries/useSongs'
import { createSongSchema } from '../../../../../../validators/schemas/songSchema'

const fileInputClasses =
  'rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] bg-transparent p-[0.8rem] text-[0.85rem] text-[var(--color-muted)] file:mr-3 file:cursor-pointer file:rounded-[0.2rem] file:border-0 file:bg-[var(--color-ink)] file:px-3 file:py-1.5 file:text-[0.8rem] file:font-medium file:text-[var(--color-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'

const CreateSong = () => {
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const createSongMutation = useCreateSongMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(createSongSchema) })

  const onSubmit = async (song) => {
    try {
      await createSongMutation.mutateAsync({
        title: song.title,
        releaseDate: song.date,
        streamingLinks: {
          appleMusic: song.appleMusic,
          spotify: song.spotify,
          audiomack: song.audiomack,
          youtube: song.youtube,
          tidal: song.tidal,
          boomPlay: song.boomPlay,
          youtubeMusic: song.youtubeMusic,
        },
        coverArt: song.coverArt[0],
      })
      setAlert('success', 'Song Created!')
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
      <h2 className="flex items-center gap-2 text-xl font-medium text-[var(--color-ink)]">
        NEW RELEASE?
        <FaHandSpock size={28} />
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

        <h3 className="text-sm font-semibold text-[var(--color-muted)]">COVER ART</h3>
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="coverArt"
            className="flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-[var(--color-muted)]"
          >
            Cover Art:
            <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
              {errors.coverArt?.message}
            </small>
          </label>
          <input
            id="coverArt"
            type="file"
            accept=".jpg,.jpeg,.png"
            className={fileInputClasses}
            {...register('coverArt')}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'CREATING…' : 'CREATE'}
        </Button>
      </form>
    </motion.div>
  )
}
export default CreateSong
