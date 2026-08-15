import { LOGO_URL } from '../../../lib/cloudinary'

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 m-auto flex aspect-square w-[90%] max-w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <img className="h-[45px] w-[45px]" src={LOGO_URL} alt={'logo'} />
        <h2 className="text-center text-[0.85rem] font-medium text-[var(--color-ink)]">
          Alright chill..
        </h2>
      </div>
      <svg className="w-[40%] animate-loader-rotate" viewBox="0 0 100 100">
        <circle
          className="animate-loader-circle fill-none [stroke:var(--color-ink)] [stroke-width:3] [stroke-linecap:round]"
          cx="50"
          cy="50"
          r="30"
        />
      </svg>
    </div>
  )
}
export default Loading
