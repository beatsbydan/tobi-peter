import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputComponent from '../../UI/InputComponent/InputComponent'
import Button from '../UI/Button'
import { Link, useNavigate } from 'react-router-dom'
import useAlert from '../../../Hooks/useAlert'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useRegisterMutation } from '../../../queries/useAuthMutations'
import { registerSchema } from '../../../validators/schemas/authSchema'
import { LOGO_URL } from '../../../lib/cloudinary'

const Register = () => {
  const { setAlert } = useAlert()
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (credentials) => {
    try {
      await registerMutation.mutateAsync(credentials)
      setAlert('success', 'Registration Successful!')
      navigate('/admin/login')
    } catch (err) {
      setAlert('failure', 'Registration Unsuccessful!')
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
        <h1 className="text-xl font-medium text-[var(--color-ink)]">REGISTER</h1>
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
        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          {isSubmitting ? 'REGISTERING…' : 'REGISTER'}
        </Button>
        <p className="text-center text-xs text-[var(--color-muted)]">
          Already have an account?{' '}
          <Link to="/admin/login" className="font-semibold text-[var(--color-ink)]">
            Login here
          </Link>
          .
        </p>
      </form>
    </motion.div>
  )
}
export default Register
