import { useEffect, useState } from 'react'
import BlobCanvas from './components/BlobCanvas'
import Hero from './components/Hero'
import Work from './components/Work'
import Connect from './components/Connect'
import Visualizations from './components/Visualizations'
import Photography from './components/Photography'

function getPageFromHash() {
  if (window.location.hash === '#visualizations') return 'visualizations'
  if (window.location.hash === '#photography') return 'photography'
  if (window.location.hash === '#flora') return 'flora'
  return 'home'
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (page !== 'photography' && page !== 'flora') return

    window.requestAnimationFrame(() => {
      const id = window.location.hash.slice(1)
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ block: 'start' })
      }
    })
  }, [page])

  return (
    <>
      <BlobCanvas />
      <main>
        {page === 'visualizations' ? (
          <Visualizations />
        ) : (
          <>
            <Hero />
            <Work />
            {(page === 'photography' || page === 'flora') && <Photography showFlora={page === 'flora'} />}
            <Connect />
          </>
        )}
      </main>
    </>
  )
}
