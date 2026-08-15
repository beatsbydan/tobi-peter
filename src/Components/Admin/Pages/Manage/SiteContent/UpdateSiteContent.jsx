import InputComponent from '../../../../UI/InputComponent/InputComponent'
import VideoPlayer from '../../../../UI/Video/VideoPlayer'
import { BiText, BiChevronUp, BiChevronDown } from 'react-icons/bi'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import Button from '../../../UI/Button'
import Loading from '../../../../UI/Loading/Loading'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition } from '../../../../../lib/motion'
import {
  useSiteContentQuery,
  useUpdateSiteContentMutation,
} from '../../../../../queries/useSiteContent'
import { siteContentSchema } from '../../../../../validators/schemas/siteContentSchema'
import { toYoutubeEmbedUrl } from '../../../../../lib/youtube'
import { LOGO_URL } from '../../../../../lib/cloudinary'

const STAT_FIELDS = [
  { key: 'monthlyListeners', title: 'Monthly Listeners' },
  { key: 'allTimeRemixes', title: 'All-Time Remixes' },
  { key: 'singles', title: 'Singles' },
  { key: 'eps', title: 'EPs' },
  { key: 'mixtapes', title: 'Mixtapes' },
  { key: 'streams', title: 'Streams' },
]

const UpdateSiteContent = () => {
  const { data: siteContent, isPending, isSuccess } = useSiteContentQuery()
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const updateSiteContentMutation = useUpdateSiteContentMutation()
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(siteContentSchema),
    values: siteContent
      ? {
          bio: siteContent.bio ?? [''],
          bioFeaturedArtists: siteContent.bioFeaturedArtists ?? '',
          stats: STAT_FIELDS.reduce(
            (acc, { key }) => ({
              ...acc,
              [key]: {
                value: siteContent.stats?.[key]?.value ?? 0,
                label: siteContent.stats?.[key]?.label ?? '',
              },
            }),
            {},
          ),
          sets: siteContent.sets ?? [],
          hasNewRelease: siteContent.hasNewRelease ?? false,
        }
      : undefined,
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'bio' })
  const {
    fields: setFields,
    append: appendSet,
    remove: removeSet,
    move: moveSet,
  } = useFieldArray({ control, name: 'sets' })

  const onSubmit = async (updatedSiteContent) => {
    // Blank display-label inputs resolve to '' — normalize to null so the payload matches the
    // backend's documented `label: string | null` contract instead of sending empty strings.
    const payload = {
      ...updatedSiteContent,
      stats: Object.fromEntries(
        Object.entries(updatedSiteContent.stats).map(([key, stat]) => [
          key,
          { value: stat.value, label: stat.label ? stat.label : null },
        ]),
      ),
    }
    try {
      await updateSiteContentMutation.mutateAsync(payload)
      setAlert('success', 'Site Content Updated!')
      navigate('/admin/manage')
    } catch {
      setAlert('failure', 'Something went wrong!')
    }
  }

  return (
    <motion.div className="mx-auto flex w-full max-w-[600px] flex-col gap-6" {...pageTransition}>
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
      ) : !isSuccess || !siteContent ? (
        <p className="flex flex-col items-center gap-2 py-6 text-[var(--color-muted)]">
          <img className="h-10 w-10" src={LOGO_URL} alt="" />
          SOMETHING WENT WRONG.
        </p>
      ) : (
        <>
          <h2 className="flex items-center gap-2 text-xl font-medium text-[var(--color-ink)]">
            SITE CONTENT
            <BiText size={26} />
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <fieldset className="flex flex-col gap-4">
              <legend className="mb-2 text-[0.95rem] font-semibold text-[var(--color-ink)]">
                BIO (Music page)
              </legend>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-row items-start gap-2">
                  <InputComponent
                    id={`bio.${index}`}
                    label={`Paragraph ${index + 1}:`}
                    type="textarea"
                    placeholder="Enter bio paragraph"
                    error={errors.bio?.[index]?.message}
                    {...register(`bio.${index}`)}
                  />
                  <Button
                    type="button"
                    variant="danger"
                    className="mt-8"
                    disabled={fields.length <= 1}
                    onClick={() => remove(index)}
                  >
                    REMOVE
                  </Button>
                </div>
              ))}
              {errors.bio?.message && (
                <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
                  {errors.bio.message}
                </small>
              )}
              <Button type="button" variant="secondary" onClick={() => append('')}>
                ADD PARAGRAPH
              </Button>
              <InputComponent
                id="bioFeaturedArtists"
                label="Featured artists (bold, comma-separated):"
                type="text"
                placeholder="e.g. Diplo, Sarz, Walshy Fire"
                error={errors.bioFeaturedArtists?.message}
                {...register('bioFeaturedArtists')}
              />
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-2 text-[0.95rem] font-semibold text-[var(--color-ink)]">
                EPK STATS
              </legend>
              {STAT_FIELDS.map(({ key, title }) => (
                <div key={key} className="flex flex-row gap-2">
                  <InputComponent
                    id={`stats.${key}.value`}
                    label={`${title}:`}
                    type="number"
                    placeholder="0"
                    error={errors.stats?.[key]?.value?.message}
                    {...register(`stats.${key}.value`)}
                  />
                  <InputComponent
                    id={`stats.${key}.label`}
                    label="Display label (optional):"
                    type="text"
                    placeholder="e.g. 11.3k+"
                    error={errors.stats?.[key]?.label?.message}
                    {...register(`stats.${key}.label`)}
                  />
                </div>
              ))}
            </fieldset>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-2 text-[0.95rem] font-semibold text-[var(--color-ink)]">
                EPK SETS (YouTube Videos)
              </legend>
              {setFields.map((field, index) => {
                const url = watch(`sets.${index}.url`)
                const embedUrl = toYoutubeEmbedUrl(url)
                return (
                  <div
                    key={field.id}
                    className="flex flex-col gap-3 rounded-[0.4rem] border-[0.1rem] border-[var(--color-hairline)] p-4"
                  >
                    <div className="flex flex-row gap-2">
                      <InputComponent
                        id={`sets.${index}.url`}
                        label="YouTube URL:"
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        error={errors.sets?.[index]?.url?.message}
                        {...register(`sets.${index}.url`)}
                      />
                      <InputComponent
                        id={`sets.${index}.label`}
                        label="Label:"
                        type="text"
                        placeholder="e.g. GOSPEL HOUSE 004"
                        error={errors.sets?.[index]?.label?.message}
                        {...register(`sets.${index}.label`)}
                      />
                    </div>
                    {embedUrl ? (
                      <div className="h-[200px] w-full">
                        <VideoPlayer url={embedUrl} />
                      </div>
                    ) : url ? (
                      <p className="text-[0.8rem] text-[var(--color-muted)]">
                        Enter a valid YouTube link to preview.
                      </p>
                    ) : null}
                    <div className="flex flex-row justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        aria-label="Move up"
                        disabled={index === 0}
                        onClick={() => moveSet(index, index - 1)}
                      >
                        <BiChevronUp size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        aria-label="Move down"
                        disabled={index === setFields.length - 1}
                        onClick={() => moveSet(index, index + 1)}
                      >
                        <BiChevronDown size={18} />
                      </Button>
                      <Button type="button" variant="danger" onClick={() => removeSet(index)}>
                        REMOVE
                      </Button>
                    </div>
                  </div>
                )
              })}
              <Button
                type="button"
                variant="secondary"
                onClick={() => appendSet({ url: '', label: '' })}
              >
                ADD VIDEO
              </Button>
            </fieldset>

            <fieldset className="flex flex-row items-center gap-3">
              <input
                id="hasNewRelease"
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-ink)]"
                {...register('hasNewRelease')}
              />
              <label
                htmlFor="hasNewRelease"
                className="text-[0.85rem] font-medium text-[var(--color-muted)]"
              >
                There's a new release to promote (routes &quot;/&quot; to /whats-new instead of
                /shows)
              </label>
            </fieldset>

            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? 'UPDATING…' : 'UPDATE'}
            </Button>
          </form>
        </>
      )}
    </motion.div>
  )
}
export default UpdateSiteContent
