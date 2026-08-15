import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { VscChromeClose } from 'react-icons/vsc'
import {
  BiHome,
  BiListCheck,
  BiCalendarEvent,
  BiMusic,
  BiBookContent,
  BiImages,
  BiText,
  BiLogOut,
} from 'react-icons/bi'
import useAuth from '../../../Hooks/useAuth'
import useAlert from '../../../Hooks/useAlert'
import { useLogoutMutation } from '../../../queries/useAuthMutations'
import { setAccessToken } from '../../../api/client'
import { LOGO_URL } from '../../../lib/cloudinary'
import Spinner from '../../UI/Spinner/Spinner'

const NAV_ITEMS = [
  { to: '/admin/home', label: 'Dashboard', Icon: BiHome },
  // `end` so this only reads as active on the exact hub route — every other item's `to` is a
  // descendant path of /admin/manage, and NavLink treats a link as active for descendant routes
  // too by default, which would otherwise highlight "Manage" alongside whichever entity tab is
  // actually active.
  { to: '/admin/manage', label: 'Manage', Icon: BiListCheck, end: true },
  { to: '/admin/manage/shows/update-shows', label: 'Shows', Icon: BiCalendarEvent },
  { to: '/admin/manage/songs/update-songs', label: 'Songs', Icon: BiMusic },
  { to: '/admin/manage/blogs/update-blogs', label: 'Blogs', Icon: BiBookContent },
  { to: '/admin/manage/images/update-images', label: 'Images', Icon: BiImages },
  { to: '/admin/manage/site-content', label: 'Site Content', Icon: BiText },
]

const linkClasses = ({ isActive }) =>
  `flex flex-row items-center gap-3 rounded-[0.4rem] px-4 py-3 text-sm font-medium transition-colors duration-200 ease-in-out ${
    isActive
      ? 'bg-[var(--color-ink)] text-[var(--color-cream)]'
      : 'text-[var(--color-muted)] hover:bg-[rgba(217,217,217,0.36)]'
  }`

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { authDetails, setIsLoggedIn } = useAuth()
  const { setAlert } = useAlert()
  const logoutMutation = useLogoutMutation()
  const navigate = useNavigate()

  const closeNav = () => setIsOpen(false)

  const handleLogout = async () => {
    closeNav()
    try {
      const { status } = await logoutMutation.mutateAsync()
      if (status === 204) {
        setIsLoggedIn(false)
        setAccessToken('')
        setAlert('success', 'Logout Successful!')
        navigate('/admin/login')
      }
    } catch {
      setAlert('failure', 'Something went wrong!')
    }
  }

  if (!authDetails.isLoggedIn) return null

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-[5%] z-[110] hidden border-0 bg-transparent p-0 max-[900px]:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        {isOpen ? (
          <VscChromeClose size={28} color="#495464" />
        ) : (
          <RxHamburgerMenu size={28} color="#495464" />
        )}
      </button>

      <nav
        className={`fixed top-0 left-0 z-[100] flex h-screen w-[240px] flex-col justify-between border-r-[0.1rem] border-[var(--color-hairline)] bg-[var(--color-cream)] px-4 py-8 transition-transform duration-300 ease-in-out max-[900px]:w-[260px] max-[900px]:shadow-[4px_0_16px_rgba(0,0,0,0.1)] ${
          isOpen ? 'max-[900px]:translate-x-0' : 'max-[900px]:-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-8">
          <NavLink to="/admin/home" onClick={closeNav} className="px-4">
            <img className="h-10 w-10 cursor-pointer" src={LOGO_URL} alt="" />
          </NavLink>
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ to, label, Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} onClick={closeNav} className={linkClasses}>
                  <Icon size={18} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-[0.4rem] border-0 bg-transparent px-4 py-3 text-sm font-medium text-[var(--color-muted)] transition-colors duration-200 ease-in-out hover:bg-[rgba(217,217,217,0.36)] hover:text-[var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {logoutMutation.isPending ? (
            <>
              <Spinner size={18} />
              Logging out…
            </>
          ) : (
            <>
              <BiLogOut size={18} />
              Logout
            </>
          )}
        </button>
      </nav>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeNav}
          className="fixed inset-0 z-[90] hidden cursor-default border-0 bg-black/30 max-[900px]:block"
        />
      )}
    </>
  )
}
export default AdminNavbar
