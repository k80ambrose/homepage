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
  return 'home'
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <>
      <BlobCanvas />
      <main>
        {page === 'visualizations' ? (
          <Visualizations />
        ) : page === 'photography' ? (
          <Photography />
        ) : (
          <>
            <Hero />
            <Work />
            <Connect />
          </>
        )}
      </main>
    </>
  )
}
