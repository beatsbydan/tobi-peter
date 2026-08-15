import { useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import './App.css'
import Navbar from './Components/User/Navbar/Navbar'
import AdminNavbar from './Components/Admin/AdminNavbar/AdminNavbar'
import Footer from './Components/Footer/Footer'
import ContextProvider from './Components/User/Context/ContextProvider'
import AuthContextProvider from './Components/Admin/Context/AuthContext/AuthContextProvider'
import AlertContextProvider from './Components/UI/AlertContext/AlertContextProvider'
import AlertPopUp from './Components/UI/AlertPopUp/AlertPopUp'
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes'
import useAuth from './Hooks/useAuth'
import ErrorBoundary from './Components/UI/ErrorBoundary/ErrorBoundary'
import SkipToContent from './Components/UI/SkipToContent/SkipToContent'
import ScrollToggle from './Components/UI/ScrollToggle/ScrollToggle'

// The admin section has its own page shell (a left sidebar, not the public site's fixed top
// header) — AdminShell renders AdminNavbar (the sidebar; it renders null when logged out) and
// gives <main> a left margin to clear it only once a sidebar is actually showing.
const AdminShell = () => {
  const { authDetails } = useAuth()
  return (
    <div className="min-h-screen">
      <SkipToContent />
      <AdminNavbar />
      <main
        id="main-content"
        className={
          authDetails.isLoggedIn
            ? 'relative ml-[240px] min-h-screen px-[5%] py-10 max-[900px]:ml-0'
            : 'relative flex min-h-screen items-center justify-center px-[5%] py-10'
        }
      >
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
      </main>
    </div>
  )
}

const PublicShell = () => (
  <div className="App">
    <SkipToContent />
    <header>
      <Navbar />
    </header>
    <main id="main-content">
      <ErrorBoundary>
        <AnimatedRoutes />
      </ErrorBoundary>
    </main>
    <Footer />
  </div>
)

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.includes('/admin')
  return (
    // reducedMotion="user" makes every framer-motion animation in the app respect the OS-level
    // prefers-reduced-motion setting automatically — most motion.div usages here (pageTransition,
    // fadeUp, staggerItem, tapScale) never branched on usePrefersReducedMotion() themselves, so
    // without this they'd animate unconditionally regardless of the user's preference. No effect
    // for users who haven't requested reduced motion.
    <MotionConfig reducedMotion="user">
      <AlertContextProvider>
        <ContextProvider>
          <AuthContextProvider>
            <AlertPopUp />
            <ScrollToggle />
            {isAdmin ? <AdminShell /> : <PublicShell />}
          </AuthContextProvider>
        </ContextProvider>
      </AlertContextProvider>
    </MotionConfig>
  )
}

export default App
