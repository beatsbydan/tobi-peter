import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { forwardRef, useState } from 'react'

// forwardRef + ...rest (covers RHF's onBlur/name) were added so this component works with both
// the existing controlled value/onChange usage (e.g. Book.jsx) AND react-hook-form's
// `{...register('field')}` spread (admin forms) — same visual component, two calling conventions.
const InputComponent = forwardRef((props, ref) => {
  const { id, label, error, type, placeholder, value, onChange, ...rest } = props
  const [dateState, setDateState] = useState('text')
  const handleDateState = () => {
    setDateState('date')
  }
  const [isVisible, setIsVisible] = useState(false)
  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const inputClasses = (extra = '') =>
    `rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] bg-transparent p-[0.8rem] text-[var(--color-muted)] placeholder:text-[0.75rem] placeholder:font-normal placeholder:tracking-[0.04rem] placeholder:text-[var(--color-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] ${
      error ? 'border-[red]' : ''
    } ${extra}`

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-[var(--color-muted)]"
      >
        {label}
        <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">{error}</small>
      </label>
      {type === 'password' ? (
        <div className="relative flex w-full flex-row items-center">
          <input
            id={id}
            ref={ref}
            className={inputClasses('w-full')}
            type={!isVisible ? 'password' : 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
          <button
            type="button"
            onClick={handleVisibility}
            aria-label={!isVisible ? 'Show password' : 'Hide password'}
            className="absolute right-4 mb-0 flex cursor-pointer items-center bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            {!isVisible ? (
              <AiFillEye size={27} color={'#1D3557'} />
            ) : (
              <AiFillEyeInvisible size={27} color={'#1D3557'} />
            )}
          </button>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          ref={ref}
          className={inputClasses('h-[150px]')}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      ) : type === 'date' ? (
        <input
          id={id}
          ref={ref}
          className={inputClasses()}
          type={dateState}
          onFocus={handleDateState}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      ) : (
        <input
          id={id}
          ref={ref}
          className={inputClasses()}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </div>
  )
})

InputComponent.displayName = 'InputComponent'

export default InputComponent
