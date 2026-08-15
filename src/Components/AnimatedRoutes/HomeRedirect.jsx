import { Navigate } from 'react-router-dom'
import { useSiteContentQuery } from '../../queries/useSiteContent'
import Loading from '../UI/Loading/Loading'

// Replaces the old hardcoded `<Navigate to="/shows" />` root route — where "/" lands now depends
// on the admin-controlled `hasNewRelease` flag. Optional-chaining `siteContent?.hasNewRelease`
// means a still-pending, errored, or flag-less response all fall back to "/shows" (today's
// behavior) rather than hanging on a persistent loading screen.
const HomeRedirect = () => {
  const { data: siteContent, isPending } = useSiteContentQuery()
  if (isPending) {
    return (
      <div className="relative min-h-screen w-full">
        <Loading />
      </div>
    )
  }
  return <Navigate to={siteContent?.hasNewRelease ? '/whats-new' : '/shows'} replace />
}

export default HomeRedirect
