import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
  return (
    <div
      onClick={props.cancel}
      className="fixed top-0 left-0 z-[1000] h-screen w-full cursor-pointer bg-[rgba(0,0,0,0.849)]"
    ></div>
  )
}
const actionButtonBase =
  'w-full max-w-[120px] cursor-pointer rounded-[0.3rem] bg-transparent p-[0.8rem] font-medium transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'
const cancelAcceptClasses = `${actionButtonBase} border-[0.1rem] border-[var(--color-ink)] text-[var(--color-ink)] active:bg-[var(--color-ink)] active:text-[var(--color-cream)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]`
const promptClasses = `${actionButtonBase} border-[0.1rem] border-[rgba(255,0,0,0.779)] text-[rgba(255,0,0,0.779)] active:bg-[rgba(255,0,0,0.779)] active:text-[var(--color-cream)] hover:bg-[rgba(255,0,0,0.779)] hover:text-[var(--color-cream)]`

const UpdateBlock = ({ type, event, cancel, completePrompt, deletePrompt }) => {
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        cancel()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [cancel])

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed top-1/2 left-1/2 z-[1000] flex w-[90%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-[0.6rem] bg-[var(--color-cream)] px-6 py-12"
    >
      <p className="text-center text-[1.1rem] text-[var(--color-muted)]">
        Are you sure you want to{' '}
        <span className="text-[1.1rem] font-semibold text-[var(--color-ink)]">{type}</span> this{' '}
        <span className="text-[1.1rem] font-semibold text-[var(--color-ink)]">{event}</span> ?
      </p>
      <div className="mx-auto flex w-full max-w-[300px] flex-row items-center justify-between gap-4">
        <button ref={cancelRef} onClick={cancel} className={cancelAcceptClasses}>
          NO
        </button>
        <button
          onClick={type === 'COMPLETE' ? completePrompt : deletePrompt}
          className={type === 'COMPLETE' ? cancelAcceptClasses : promptClasses}
        >
          YES
        </button>
      </div>
    </div>
  )
}
const UpdateEvent = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop cancel={props.cancel} />,
        document.getElementById('backdrop_root'),
      )}
      {ReactDOM.createPortal(
        <UpdateBlock
          type={props.type}
          event={props.event}
          cancel={props.cancel}
          completePrompt={props.completePrompt}
          deletePrompt={props.deletePrompt}
        />,
        document.getElementById('overlay_root'),
      )}
    </React.Fragment>
  )
}
export default UpdateEvent
