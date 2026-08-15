import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Button from '../UI/Button'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import useAlert from '../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import { useForgotPasswordMutation } from '../../../queries/useAuthMutations'
import { resetSchema } from '../../../validators/schemas/authSchema'
import { LOGO_URL } from '../../../lib/cloudinary'

const ForgotPassword = () => {
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const forgotPasswordMutation = useForgotPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetSchema) })

  const onSubmit = async (credentials) => {
    try {
      await forgotPasswordMutation.mutateAsync(credentials)
      setAlert('success', 'Email Sent!')
      navigate('/admin/login')
    } catch (err) {
      setAlert('failure', 'Something went wrong!')
      return err
    }
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-[400px] rounded-[0.6rem] bg-[rgba(217,217,217,0.21)] p-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
    >
      <button
        type="button"
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex p-1 text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <AiOutlineArrowLeft cursor="pointer" size={20} />
      </button>
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <img className="h-14 w-14" src={LOGO_URL} alt="" />
        <h1 className="text-xl font-medium text-[var(--color-ink)]">RESET</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <InputComponent
          id="resetEmail"
          label="Email"
          type="text"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? 'SENDING…' : 'RESET'}
        </Button>
      </form>
      <div className="mt-6 rounded-[0.4rem] bg-[rgba(29,53,87,0.08)] p-4">
        <h2 className="mb-1 text-sm font-semibold text-[var(--color-ink)]">ALERT:</h2>
        <p className="text-xs text-[var(--color-muted)]">
          If successful, check your email for a password which would give you temporary access to
          your account after which you&apos;d be able to reset your password in your profile.
        </p>
      </div>
    </motion.div>
  )
}

export default ForgotPassword
