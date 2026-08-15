import { AnimatePresence } from 'framer-motion'
import useAlert from '../../../Hooks/useAlert'
import Alert from './Alert/Alert'

const AlertPopUp = () => {
  const { type, message } = useAlert()
  return (
    <AnimatePresence>
      {type !== '' && <Alert key="alert" type={type} message={message} />}
    </AnimatePresence>
  )
}
export default AlertPopUp
