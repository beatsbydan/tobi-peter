import Spinner from '../Spinner/Spinner'

const IsProcessing = () => (
  <div className="flex w-full max-w-[200px] flex-row items-center justify-between rounded-[0.3rem] bg-[var(--color-ink)] p-4">
    <small className="font-semibold text-white">Processing</small>
    <Spinner size={18} className="text-white" />
  </div>
)

export default IsProcessing
