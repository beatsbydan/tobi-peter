import { MdOutlineDelete } from 'react-icons/md'
import { useState } from 'react'
import { motion } from 'framer-motion'
import UpdateEvent from '../../../../../../UI/UpdateEvent/UpdateEvent'
import useAlert from '../../../../../../../Hooks/useAlert'
import { useDeleteImageMutation } from '../../../../../../../queries/useImages'
import { staggerItem } from '../../../../../../../lib/motion'

const Image = ({ url }) => {
  const [confirming, setConfirming] = useState(false)
  const { setAlert } = useAlert()
  const deleteMutation = useDeleteImageMutation()

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(url)
      setAlert('success', 'Image deleted!')
    } catch {
      setAlert('failure', 'Something went wrong!')
    } finally {
      setConfirming(false)
    }
  }

  return (
    <motion.li
      className="group relative aspect-square overflow-hidden rounded-[0.6rem] bg-[rgba(217,217,217,0.21)]"
      {...staggerItem}
    >
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${url})` }}
      />
      <button
        type="button"
        aria-label="Delete image"
        onClick={() => setConfirming(true)}
        className="absolute top-2 right-2 cursor-pointer rounded-full border-0 bg-[rgba(0,0,0,0.55)] p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cream)]"
      >
        <MdOutlineDelete size={20} color="#fff" />
      </button>
      {confirming && (
        <UpdateEvent
          type="DELETE"
          event="IMAGE"
          cancel={() => setConfirming(false)}
          deletePrompt={handleDelete}
        />
      )}
    </motion.li>
  )
}

export default Image
