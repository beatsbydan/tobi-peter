import LinkButton from './UI/LinkButton'
import { motion } from 'framer-motion'
import { pageTransition } from '../../lib/motion'
import { LOGO_URL } from '../../lib/cloudinary'

const Admin = () => {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-4 text-center"
      {...pageTransition}
    >
      <img className="h-16 w-16" src={LOGO_URL} alt="" />
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">HI TOBI PETER</h1>
      <p className="text-[var(--color-muted)]">This is your Administrator Profile.</p>
      <p className="text-[var(--color-muted)]">
        Quickly create your account or log back in if you have.
      </p>
      <div className="mt-4 flex w-full flex-row gap-4">
        <LinkButton to="/admin/register" variant="secondary" className="flex-1">
          REGISTER
        </LinkButton>
        <LinkButton to="/admin/login" className="flex-1">
          LOGIN
        </LinkButton>
      </div>
    </motion.div>
  )
}
export default Admin
