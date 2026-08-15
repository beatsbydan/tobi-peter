import React from 'react'

const RadioButton = (props) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      props.onClick(e)
    }
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <div
        role="radio"
        aria-checked={!!props.isClicked}
        aria-label={props.radioInput}
        tabIndex={0}
        onClick={props.onClick}
        onKeyDown={handleKeyDown}
        className={`relative aspect-square w-5 cursor-pointer rounded-full border-[0.1rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] ${
          props.error ? 'border-[red]' : 'border-[var(--color-muted)]'
        }`}
      >
        <div
          className={`absolute top-1/2 left-1/2 aspect-square w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            props.isClicked ? 'bg-[var(--color-ink)]' : 'bg-transparent'
          }`}
        ></div>
      </div>
      <p className="text-[var(--color-muted)]">{props.radioInput}</p>
    </div>
  )
}

export default RadioButton
