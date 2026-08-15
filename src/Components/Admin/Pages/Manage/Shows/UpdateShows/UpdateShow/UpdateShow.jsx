import InputComponent from '../../../../../../UI/InputComponent/InputComponent'
import { BsEmojiWink } from 'react-icons/bs'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import useAlert from '../../../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import Button from '../../../../../UI/Button'
import Loading from '../../../../../../UI/Loading/Loading'
import { IoArrowBackOutline } from 'react-icons/io5'
import countryNames from '../../../../../../../data/countryNames.json'
import Dropdown from '../../../../../../UI/Dropdown/Dropdown'
import { pageTransition } from '../../../../../../../lib/motion'
import { useShowQuery, useUpdateShowMutation } from '../../../../../../../queries/useShows'
import { showSchema } from '../../../../../../../validators/schemas/showSchema'
import { LOGO_URL } from '../../../../../../../lib/cloudinary'

const formatDateInput = (date) => (date ? new Date(date).toISOString().slice(0, 10) : '')

const UpdateShow = () => {
  const { id } = useParams()
  const { data: show, isPending, isSuccess } = useShowQuery(id)
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const updateShowMutation = useUpdateShowMutation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(showSchema),
    values: show
      ? {
          title: show.title ?? '',
          venue: show.venue ?? '',
          city: show.city ?? '',
          country: show.country ?? '',
          date: formatDateInput(show.date),
          ticketLink: show.ticketLink ?? '',
        }
      : undefined,
  })

  const onSubmit = async (updatedShow) => {
    try {
      await updateShowMutation.mutateAsync({ id, show: updatedShow })
      setAlert('success', 'Show Updated!')
      navigate('/admin/manage')
    } catch {
      setAlert('failure', 'Something went wrong!')
    }
  }

  return (
    <motion.div className="mx-auto flex w-full max-w-125 flex-col gap-6" {...pageTransition}>
      <button
        type="button"
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="w-fit cursor-pointer border-0 bg-transparent p-1 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <IoArrowBackOutline size={20} />
      </button>
      {isPending ? (
        <Loading />
      ) : !isSuccess || !show ? (
        <p className="flex flex-col items-center gap-2 py-6 text-muted">
          <img className="h-10 w-10" src={LOGO_URL} alt="" />
          SOMETHING WENT WRONG.
        </p>
      ) : (
        <>
          <h2 className="flex items-center gap-2 text-xl font-medium text-ink">
            UPDATE SHOW
            <BsEmojiWink size={28} />
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <InputComponent
              id="title"
              label="Title:"
              type="text"
              placeholder="Enter Title"
              error={errors.title?.message}
              {...register('title')}
            />
            <InputComponent
              id="venue"
              label="Venue:"
              type="text"
              placeholder="Enter Venue"
              error={errors.venue?.message}
              {...register('venue')}
            />
            <InputComponent
              id="city"
              label="City:"
              type="text"
              placeholder="Enter City"
              error={errors.city?.message}
              {...register('city')}
            />
            <div>
              <label
                htmlFor="country"
                className="mb-2 flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-muted"
              >
                Country:
                <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
                  {errors.country?.message}
                </small>
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    error={errors.country?.message}
                    list={countryNames}
                    initialValue={field.value}
                    onClick={field.onChange}
                  />
                )}
              />
            </div>
            <InputComponent
              id="date"
              label="Date:"
              type="date"
              placeholder="Enter Date"
              error={errors.date?.message}
              {...register('date')}
            />
            <InputComponent
              id="ticketLink"
              label="Ticket-Link:"
              type="text"
              placeholder="Enter Link"
              error={errors.ticketLink?.message}
              {...register('ticketLink')}
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
export default UpdateShow
