import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs'
import { useState, useEffect, useRef } from 'react'

const ChartFilter = ({ currYear, yearsData, filterChartData }) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOption = (value) => {
    setIsOpen(false)
    filterChartData(value)
  }

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen((open) => !open)
    }
  }

  const handleOptionKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOption(value)
    }
  }

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', closeDropdownOnOutsideClick)
    return () => document.removeEventListener('click', closeDropdownOnOutsideClick)
  }, [])

  return (
    <div className="relative ml-auto w-fit" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex cursor-pointer flex-row items-center gap-1 rounded-[0.3rem] border-[0.1rem] border-[var(--color-muted)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        {currYear}
        {isOpen ? <BsArrowUpShort size={20} /> : <BsArrowDownShort size={20} />}
      </div>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+8px)] right-0 z-10 flex max-h-[180px] w-[100px] flex-col overflow-y-auto rounded-[0.3rem] bg-[var(--color-cream)] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.15)]"
        >
          {yearsData.map((value) => (
            <li
              key={value}
              onClick={() => handleOption(value)}
              onKeyDown={(e) => handleOptionKeyDown(e, value)}
              role="option"
              aria-selected={value === currYear}
              tabIndex={0}
              className="cursor-pointer border-b-[0.1rem] border-[var(--color-hairline)] p-2 text-center text-sm text-[var(--color-muted)] last:border-b-0 hover:bg-[rgba(217,217,217,0.36)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ChartFilter
