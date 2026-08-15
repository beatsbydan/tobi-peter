import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { VscChromeClose } from 'react-icons/vsc'
import { LOGO_URL } from '../../../lib/cloudinary'

const Navbar = () => {
  const activeClass =
    'font-bold max-[750px]:rounded-[0.3rem] max-[750px]:border-[0.1rem] max-[750px]:border-[var(--color-cream)]'
  const defaultClass = ''
  const [isOpen, setIsOpen] = useState(false)
  const handleNav = () => {
    setIsOpen(!isOpen)
  }
  const closeNav = () => {
    setIsOpen(false)
  }
  return (
    <div className="mx-auto flex w-full items-center justify-between border-b-[0.1rem] border-[var(--color-muted)] px-[5%] pt-6 pb-[0.1rem]">
      <nav className="flex w-full flex-row items-center justify-between gap-[7%]">
        <NavLink to={'/whats-new'}>
          <img className="h-[60px] w-[60px] cursor-pointer" src={LOGO_URL} alt="Tobi Peter" />
        </NavLink>
        <ul
          className={`flex w-full max-w-[730px] flex-row items-center justify-between max-[750px]:fixed max-[750px]:top-0 max-[750px]:right-0 max-[750px]:bottom-0 max-[750px]:z-[100] max-[750px]:flex-col max-[750px]:justify-center max-[750px]:gap-24 max-[750px]:bg-[var(--color-cream)] max-[750px]:transition-all max-[750px]:duration-500 max-[750px]:ease-[cubic-bezier(0.39,0.575,0.565,1)] ${
            isOpen ? 'max-[750px]:translate-x-0' : 'max-[750px]:translate-x-full'
          }`}
        >
          <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
            <NavLink
              onClick={closeNav}
              className={({ isActive }) => (isActive ? activeClass : defaultClass)}
              to={'whats-new'}
            >
              WHAT'S NEW
            </NavLink>
          </li>
          <li className="flex w-full max-w-[500px]">
            <ul className="flex w-full flex-row items-center justify-between max-[750px]:flex-col max-[750px]:gap-8">
              <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
                <NavLink
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? activeClass : defaultClass)}
                  to={'music'}
                >
                  MUSIC
                </NavLink>
              </li>
              <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
                <NavLink
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? activeClass : defaultClass)}
                  to={'shows'}
                >
                  SHOWS
                </NavLink>
              </li>
              <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
                <NavLink
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? activeClass : defaultClass)}
                  to={'animation'}
                >
                  ANIMATION
                </NavLink>
              </li>
              <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
                <NavLink
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? activeClass : defaultClass)}
                  to={'partner'}
                >
                  PARTNER
                </NavLink>
              </li>
              <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
                <NavLink
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? activeClass : defaultClass)}
                  to={'epk'}
                >
                  EPK
                </NavLink>
              </li>
              <li className="text-[0.8rem] max-[750px]:w-full max-[750px]:max-w-[150px] max-[750px]:p-2 max-[750px]:text-center max-[750px]:text-[var(--color-muted)]">
                <NavLink
                  onClick={closeNav}
                  className={({ isActive }) => (isActive ? activeClass : defaultClass)}
                  to={'shop'}
                >
                  SHOP
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        {isOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            onClick={handleNav}
            className="fixed right-[5%] z-[1000] hidden border-0 bg-transparent p-0 max-[750px]:block max-[750px]:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            <VscChromeClose size={30} color="#495464" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Open menu"
            onClick={handleNav}
            className="hidden border-0 bg-transparent p-0 max-[750px]:block max-[750px]:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            <RxHamburgerMenu size={30} />
          </button>
        )}
      </nav>
    </div>
  )
}
export default Navbar
