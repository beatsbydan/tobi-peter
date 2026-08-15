import LinkButton from '../../UI/LinkButton'
import { motion } from 'framer-motion'
import { pageTransition, staggerContainer, staggerItem } from '../../../../lib/motion'
import { BiCalendarEvent, BiMusic, BiBookContent, BiImages, BiText } from 'react-icons/bi'

const SECTIONS = [
  {
    title: 'SHOWS',
    Icon: BiCalendarEvent,
    create: { to: '/admin/manage/shows/create-show', label: 'CREATE SHOW' },
    update: { to: '/admin/manage/shows/update-shows', label: 'UPDATE SHOWS' },
  },
  {
    title: 'MUSIC',
    Icon: BiMusic,
    create: { to: '/admin/manage/songs/create-song', label: 'CREATE SONG' },
    update: { to: '/admin/manage/songs/update-songs', label: 'UPDATE SONGS' },
  },
  {
    title: 'BLOGS',
    Icon: BiBookContent,
    create: { to: '/admin/manage/blogs/create-blog', label: 'CREATE BLOG' },
    update: { to: '/admin/manage/blogs/update-blogs', label: 'UPDATE BLOGS' },
  },
  {
    title: 'BIO-IMAGES',
    Icon: BiImages,
    create: { to: '/admin/manage/images/add-image', label: 'ADD IMAGE' },
    update: { to: '/admin/manage/images/update-images', label: 'UPDATE IMAGES' },
  },
  {
    title: 'SITE CONTENT',
    Icon: BiText,
    // Singleton entity (bio/EPK stats/homepage flag) — no create/delete lifecycle, so it gets
    // one edit link instead of the create+update pair every other (collection) entity uses.
    edit: { to: '/admin/manage/site-content', label: 'EDIT SITE CONTENT' },
  },
]

const Manage = () => {
  return (
    <motion.div
      className="mx-auto grid w-full max-w-[900px] grid-cols-2 gap-6 max-[700px]:grid-cols-1"
      {...pageTransition}
    >
      <motion.div className="col-span-full mb-2 text-center" {...staggerItem}>
        <h1 className="text-2xl font-semibold text-[var(--color-ink)]">MANAGE</h1>
      </motion.div>
      <motion.div
        className="col-span-full grid grid-cols-2 gap-6 max-[700px]:grid-cols-1"
        {...staggerContainer}
      >
        {SECTIONS.map(({ title, Icon, create, update, edit }) => (
          <motion.div
            key={title}
            className="flex flex-col gap-4 rounded-[0.6rem] bg-[rgba(217,217,217,0.21)] p-6"
            {...staggerItem}
          >
            <h2 className="flex items-center gap-2 text-lg font-medium text-[var(--color-ink)]">
              <Icon size={22} />
              {title}
            </h2>
            <div className="flex flex-col gap-3">
              {create && update ? (
                <>
                  <LinkButton to={create.to} variant="secondary">
                    {create.label}
                  </LinkButton>
                  <LinkButton to={update.to} variant="ghost">
                    {update.label}
                  </LinkButton>
                </>
              ) : (
                <LinkButton to={edit.to} variant="secondary">
                  {edit.label}
                </LinkButton>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
export default Manage
