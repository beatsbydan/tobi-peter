import { MdOutlineAdsClick } from 'react-icons/md'
import { BiImages } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import Button from '../../../../UI/Button'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition } from '../../../../../../lib/motion'
import { useUploadImagesMutation } from '../../../../../../queries/useImages'
import { imagesSchema } from '../../../../../../validators/schemas/imagesSchema'

const CreateImages = () => {
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const uploadImagesMutation = useUploadImagesMutation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(imagesSchema) })

  const fileCount = watch('files')?.length ?? 0

  const onSubmit = async (data) => {
    try {
      await uploadImagesMutation.mutateAsync(data.files)
      setAlert('success', 'Image(s) Uploaded!')
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
        ADD IMAGES
        <BiImages size={28} />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="files"
            className="flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-[var(--color-muted)]"
          >
            Images:
            <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
              {errors.files?.message}
            </small>
          </label>
          <input
            id="files"
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            className={`rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] bg-transparent p-[0.8rem] text-[0.85rem] text-[var(--color-muted)] file:mr-4 file:cursor-pointer file:rounded-[0.3rem] file:border-0 file:bg-[var(--color-ink)] file:px-4 file:py-2 file:text-[0.8rem] file:font-medium file:text-[var(--color-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] ${
              errors.files ? 'border-[red]' : ''
            }`}
            {...register('files')}
          />
          <small className="flex flex-row items-center gap-1 text-[0.75rem] text-[var(--color-muted)]">
            {fileCount > 0
              ? `${fileCount} image${fileCount > 1 ? 's' : ''} selected`
              : 'Click to add image(s)'}
            <MdOutlineAdsClick size={16} />
          </small>
        </div>
        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? 'UPLOADING…' : 'ADD'}
        </Button>
      </form>
    </motion.div>
  )
}

export default CreateImages
