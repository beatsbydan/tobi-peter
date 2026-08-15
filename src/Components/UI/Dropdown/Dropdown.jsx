import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { duration, easing } from '../../../lib/motion'

// initialValue lets a caller pre-select an option once (e.g. an edit form populating the
// current value from fetched data) without turning this into a fully controlled component.
const Dropdown = (props) => {
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const searchInputRef = useRef(null)
  const [value, setValue] = useState(props.initialValue || 'Select an option')
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (props.initialValue) setValue(props.initialValue)
  }, [props.initialValue])

  // Every open starts from the full list, not a filter left over from last time — and moves focus
  // straight into the search box so typing works immediately, mouse or keyboard.
  useEffect(() => {
    if (open) {
      setSearchQuery('')
      searchInputRef.current?.focus()
    }
  }, [open])

  const filteredList = useMemo(
    () => props.list.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase())),
    [props.list, searchQuery],
  )

  const handleClick = (value) => {
    setValue(value)
    props.onClick(value)
    setOpen(false)
  }
  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(!open)
    }
  }
  const handleOptionKeyDown = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(option)
    }
  }
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false)
      triggerRef.current?.focus()
    } else if (e.key === 'Enter' && filteredList.length > 0) {
      e.preventDefault()
      handleClick(filteredList[0])
    }
  }

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', closeDropdownOnOutsideClick)

    return () => {
      document.removeEventListener('click', closeDropdownOnOutsideClick)
    }
  }, [])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={
          props.error
            ? 'flex w-full cursor-pointer flex-row items-center justify-between rounded-[0.3rem] border-[0.1rem] border-[red] px-[0.6rem] py-[0.45rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'
            : 'flex w-full cursor-pointer flex-row items-center justify-between rounded-[0.3rem] border-[0.1rem] border-[var(--color-muted)] px-[0.6rem] py-[0.45rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]'
        }
      >
        <span className="text-[0.8rem] tracking-[0.04rem] text-[var(--color-muted)]">{value}</span>
        {open ? (
          <BiChevronUp color={'#495464'} size={30} className="z-[-1]" />
        ) : (
          <BiChevronDown color="#495464" size={30} className="z-[-1]" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: easing.standard }}
            className="absolute top-[calc(100%+10px)] z-[1] flex w-full flex-col bg-[var(--color-cream)] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.296)]"
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search…"
              aria-label="Search options"
              className="w-full border-b-[0.1rem] border-[var(--color-muted)] bg-transparent px-[0.8rem] py-[0.6rem] text-[0.8rem] tracking-[0.04rem] text-[var(--color-muted)] outline-none placeholder:text-[var(--color-muted)]"
            />
            <ul
              role="listbox"
              className="flex max-h-[180px] w-full flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:absolute [&::-webkit-scrollbar]:w-[0.5em] [&::-webkit-scrollbar-thumb]:rounded-[100vw] [&::-webkit-scrollbar-thumb]:border-[0.2em] [&::-webkit-scrollbar-thumb]:border-[var(--color-cream)] [&::-webkit-scrollbar-thumb]:bg-[var(--color-muted)] [&::-webkit-scrollbar-track]:bg-[var(--color-cream)]"
            >
              {filteredList.length === 0 ? (
                <li className="p-[0.8rem] text-[0.8rem] tracking-[0.04rem] text-[var(--color-muted)]">
                  No matches
                </li>
              ) : (
                filteredList.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleClick(option)}
                    onKeyDown={(e) => handleOptionKeyDown(e, option)}
                    role="option"
                    aria-selected={option === value}
                    tabIndex={0}
                    className="m-auto w-full cursor-pointer border-b-[0.1rem] border-[var(--color-muted)] p-[0.8rem] text-[0.8rem] tracking-[0.04rem] text-[var(--color-muted)] transition-all duration-300 ease-in-out last:border-b-0 hover:pl-[2rem] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-ink)]"
                  >
                    {option}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
