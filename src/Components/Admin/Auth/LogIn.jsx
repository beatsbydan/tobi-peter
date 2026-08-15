import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Button from '../UI/Button'
import useAuth from '../../../Hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import useAlert from '../../../Hooks/useAlert'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useLoginMutation } from '../../../queries/useAuthMutations'
import { loginSchema } from '../../../validators/schemas/authSchema'
import { LOGO_URL } from '../../../lib/cloudinary'

const LogIn = () => {
  const { authDetails, setIsLoggedIn, setAccessToken } = useAuth()
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (credentials) => {
    try {
      const data = await loginMutation.mutateAsync(credentials)
      setIsLoggedIn(true)
      setAccessToken(data.token)
      setAlert('success', 'Login Successful!')
      navigate(authDetails.destinedLocation || '/admin/home', { replace: true })
    } catch (err) {
      setAlert('failure', 'Login Unsuccessful!')
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
      <Link
        to="/admin"
        aria-label="Back"
        className="mb-4 inline-flex p-1 text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <AiOutlineArrowLeft cursor="pointer" size={20} />
      </Link>
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <img className="h-14 w-14" src={LOGO_URL} alt="" />
        <h1 className="text-xl font-medium text-[var(--color-ink)]">LOGIN</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <InputComponent
          id="email"
          label="Email"
          type="text"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputComponent
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Link
          to="/admin/reset"
          className="self-end text-xs font-medium text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
        >
          Forgot Password?
        </Link>
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? 'LOGGING IN…' : 'LOGIN'}
        </Button>
        <p className="text-center text-xs text-[var(--color-muted)]">
          Don&apos;t have an account?{' '}
          <Link to="/admin/register" className="font-semibold text-[var(--color-ink)]">
            Register here
          </Link>
          .
        </p>
      </form>
    </motion.div>
  )
}
export default LogIn
