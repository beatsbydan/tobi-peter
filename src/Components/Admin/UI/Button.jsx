import { motion } from 'framer-motion'
import { tapScale } from '../../../lib/motion'
import { buttonClasses } from './buttonClasses'

// Shared button styling for the admin redesign (src/Components/Admin/**). Not used by the
// public-facing tree, which keeps its own button styling per the "don't change user-facing
// design" constraint.
const Button = ({ variant = 'primary', className = '', children, ...rest }) => {
  return (
    <motion.button {...tapScale} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </motion.button>
  )
}

export default Button
