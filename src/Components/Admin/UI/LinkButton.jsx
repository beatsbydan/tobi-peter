import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tapScale } from '../../../lib/motion'
import { buttonClasses } from './buttonClasses'

const MotionLink = motion.create(Link)

// A react-router Link styled identically to Button — for navigation actions ("CREATE SHOW" etc.)
// that shouldn't be real <button> elements.
const LinkButton = ({ variant = 'primary', className = '', children, ...rest }) => {
  return (
    <MotionLink {...tapScale} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </MotionLink>
  )
}

export default LinkButton
