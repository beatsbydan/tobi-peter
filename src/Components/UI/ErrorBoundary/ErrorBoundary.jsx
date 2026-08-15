import { Component } from 'react'
import { LOGO_URL } from '../../../lib/cloudinary'

// Wraps a route segment so a component crash shows a recoverable fallback instead of white-screening
// the whole app. Must be a class component — there is no hook equivalent for getDerivedStateFromError/
// componentDidCatch. No third-party error-tracking service per this project's "operability = internal
// hygiene only" scope — errors are logged to the console for now.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error in route tree:', error, info)
  }

  handleReload = () => {
    this.setState({ hasError: false })
    window.location.assign('/')
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 px-[5%] text-center">
          <img className="h-[45px] w-[45px]" src={LOGO_URL} alt="" />
          <p className="font-semibold text-[var(--color-muted)]">SOMETHING WENT WRONG.</p>
          <button
            type="button"
            onClick={this.handleReload}
            className="cursor-pointer rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] bg-transparent px-5 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors duration-300 ease-in-out hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            RELOAD
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
